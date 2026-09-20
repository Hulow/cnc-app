"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

// Full-screen background video, decorative only. Content elsewhere on the
// page must remain fully usable if this never loads or plays.
//
// The visual "look" (grayscale/darker/higher-contrast) is produced by a
// WebGL fragment shader applied to the live video frames, not a CSS
// filter or a re-encoded asset — see the shader source below and
// `siteConfig.video.shader` for the tunable parameters. If WebGL isn't
// available, this falls back to a plain <video> with a CSS grayscale
// filter so the page still degrades gracefully.

const VERTEX_SHADER_SOURCE = `
  attribute vec2 aPosition;
  varying vec2 vTexCoord;

  void main() {
    vTexCoord = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Structured in two sections so a future selective-color "highlight the
// chips" pass (see FutureChipHighlightParams below) has an obvious place
// to go: tone adjustment first, chip detection/re-coloring second — in
// that order because detection needs the original hue/saturation data,
// which the final grayscale mix at the end of this section destroys.
const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  varying vec2 vTexCoord;
  uniform sampler2D uVideo;
  uniform float uGrayscale;
  uniform float uBrightness;
  uniform float uContrast;
  uniform float uGamma;
  uniform float uExposure;
  uniform float uSaturation;

  void main() {
    vec3 color = texture2D(uVideo, vTexCoord).rgb;

    // --- Tone adjustment (this spec) -----------------------------------

    // Exposure: stops-based multiplier (0.0 = unchanged).
    color *= pow(2.0, uExposure);

    // Brightness: simple additive offset.
    color += uBrightness;

    // Contrast: scale around mid-gray.
    color = (color - 0.5) * uContrast + 0.5;

    // Gamma: applied after the linear-ish adjustments above.
    color = pow(clamp(color, 0.0, 1.0), vec3(1.0 / uGamma));

    // Saturation: blend towards luminance, independent of the full
    // grayscale toggle below so it stays useful once selective color
    // is reintroduced for detected regions.
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, uSaturation);

    // --- Future chip detection / re-coloring (not implemented) ---------
    // color here still carries its original hue — this is the only
    // point in the pipeline where that's true. A future pass would
    // classify chip pixels from this value (uChipThreshold/uHueRange/
    // uSaturationThreshold/uBrightnessThreshold) and lerp color towards
    // uAccentColor by uAccentStrength for pixels that match, before the
    // unconditional grayscale mix below discards hue for everything
    // else. See FutureChipHighlightParams in site-config.ts.

    // --- Grayscale (this spec): final blend towards luminance ----------
    float grayLuminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(grayLuminance), uGrayscale);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    FRAGMENT_SHADER_SOURCE,
  );
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [webglUnsupported, setWebglUnsupported] = useState(false);

  // Playback lifecycle: autoplay, pause/resume with prefers-reduced-motion,
  // fall back to a plain background if the video errors out. Shared by
  // both the WebGL and CSS-fallback render paths below.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      if (reducedMotion.matches) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay can be blocked by the browser; the poster/background
          // stays visible and the page remains fully usable either way.
        });
      }
    };

    syncPlayback();
    reducedMotion.addEventListener("change", syncPlayback);

    // iOS Safari pauses autoplaying video when the tab is backgrounded
    // (app switch, screen lock, incoming call banner) and, unlike desktop
    // browsers, does not resume it automatically when the page becomes
    // visible again — nor after a bfcache restore (e.g. swipe-back
    // navigation), which fires "pageshow" without remounting this
    // component. Without re-triggering play() here, the video is left
    // frozen on whatever frame it was paused at.
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("pageshow", syncPlayback);

    // iOS blocks autoplay outright (even muted) while Low Power Mode is
    // on, with no event or API to detect it beforehand — the play()
    // promise above just rejects silently. A user-initiated play() isn't
    // subject to that restriction, so retry once on the first tap
    // anywhere on the page as a best-effort recovery. Harmless no-op if
    // autoplay already succeeded.
    const retryOnFirstInteraction = () => {
      syncPlayback();
      window.removeEventListener("touchend", retryOnFirstInteraction);
      window.removeEventListener("pointerdown", retryOnFirstInteraction);
    };
    window.addEventListener("touchend", retryOnFirstInteraction, { once: true });
    window.addEventListener("pointerdown", retryOnFirstInteraction, { once: true });

    return () => {
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("pageshow", syncPlayback);
      window.removeEventListener("touchend", retryOnFirstInteraction);
      window.removeEventListener("pointerdown", retryOnFirstInteraction);
    };
  }, [failed]);

  // WebGL render loop: uploads each video frame as a texture and draws it
  // through the tone-adjustment shader. No-ops (and falls back to plain
  // CSS-filtered video) if a WebGL context can't be created.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || failed) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      setWebglUnsupported(true);
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      setWebglUnsupported(true);
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const uniforms = {
      video: gl.getUniformLocation(program, "uVideo"),
      grayscale: gl.getUniformLocation(program, "uGrayscale"),
      brightness: gl.getUniformLocation(program, "uBrightness"),
      contrast: gl.getUniformLocation(program, "uContrast"),
      gamma: gl.getUniformLocation(program, "uGamma"),
      exposure: gl.getUniformLocation(program, "uExposure"),
      saturation: gl.getUniformLocation(program, "uSaturation"),
    };

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    let sizeInitialized = false;
    const initSizeIfReady = () => {
      if (sizeInitialized || !video.videoWidth || !video.videoHeight) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      sizeInitialized = true;
    };
    video.addEventListener("loadedmetadata", initSizeIfReady);
    initSizeIfReady();

    let rafId: number;
    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!sizeInitialized || video.readyState < video.HAVE_CURRENT_DATA) {
        return;
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const shader = siteConfig.video.shader;
      gl.uniform1i(uniforms.video, 0);
      gl.uniform1f(uniforms.grayscale, shader.grayscale);
      gl.uniform1f(uniforms.brightness, shader.brightness);
      gl.uniform1f(uniforms.contrast, shader.contrast);
      gl.uniform1f(uniforms.gamma, shader.gamma);
      gl.uniform1f(uniforms.exposure, shader.exposure);
      gl.uniform1f(uniforms.saturation, shader.saturation);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", initSizeIfReady);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, [failed]);

  if (failed) {
    // Fall back to the plain page background rather than a broken player.
    return null;
  }

  return (
    <>
      <video
        ref={videoRef}
        className={
          webglUnsupported
            ? "full-bleed object-cover background-video background-video--fallback"
            : "full-bleed"
        }
        style={webglUnsupported ? undefined : { opacity: 0 }}
        src={siteConfig.video.src}
        poster={siteConfig.video.poster}
        // Required so the WebGL path can read the video's pixel data via
        // texImage2D — without it, cross-origin (Cloudinary-hosted) frames
        // taint the canvas and every texImage2D call throws a
        // SecurityError. Cloudinary's delivery URLs send permissive CORS
        // headers, so "anonymous" (no credentials) is sufficient.
        crossOrigin="anonymous"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onError={() => setFailed(true)}
      />
      {!webglUnsupported && (
        <canvas
          ref={canvasRef}
          className="full-bleed object-cover background-video"
          aria-hidden="true"
        />
      )}
    </>
  );
}
