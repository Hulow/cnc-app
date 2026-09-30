// 404 page copy (app/[lang]/not-found.tsx). No <title>/<meta description>
// pair here — unlike ./pages/*, a 404 has no search intent of its own so
// it isn't part of `pages`.
export const notFoundPage = {
  heading: "Seite nicht gefunden",
  body: "Die gesuchte Seite existiert nicht.",
  homeLinkLabel: "Weiter",
};
