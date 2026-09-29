// Link-preview/crawler bots (WhatsApp, Facebook, Twitter/X, Slack,
// Telegram, Discord, LinkedIn, search engines, …) never carry the
// privacy_ack cookie and never click "Continue" — they just fetch the
// URL once. Without this check they'd follow the privacy-page redirect
// (see PRIVACY_ACK_COOKIE) and pick up its title/description for link
// previews and search results instead of the home page's own.
const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|facebookexternalhit|whatsapp|telegrambot|slackbot|discordbot|linkedinbot|twitterbot|pinterest|embedly|quora link preview|outbrain|vkshare|redditbot|applebot|skypeuripreview|w3c_validator/i;

export function isBotUserAgent(userAgent: string | null): boolean {
  return userAgent !== null && BOT_USER_AGENT_PATTERN.test(userAgent);
}
