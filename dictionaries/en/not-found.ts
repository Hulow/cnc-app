// 404 page copy (app/global-not-found.tsx, app/[lang]/not-found.tsx). No
// <title>/<meta description> pair here — unlike ./pages/*, a 404 has no
// search intent of its own so it isn't part of `pages`.
export const notFoundPage = {
  heading: "Page not found",
  body: "The page you are looking for does not exist.",
  homeLinkLabel: "Continue",
};
