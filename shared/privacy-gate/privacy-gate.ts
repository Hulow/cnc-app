// Name of the cookie the privacy page's Continue link sets (client-side,
// via document.cookie) once clicked. Both home pages check for it server
// -side to decide whether to redirect to the privacy page first — shared
// here so the writer and the readers can't drift out of sync.
export const PRIVACY_ACK_COOKIE = "privacy_ack";
