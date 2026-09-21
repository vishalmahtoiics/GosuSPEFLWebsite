// Shared outbound links. Discord/WhatsApp come from env so the placeholder
// invites go live the moment the real URLs are set in the deploy environment.
export const DISCORD_URL = import.meta.env.VITE_DISCORD_INVITE_URL as string;
export const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_GROUP_URL as string;
