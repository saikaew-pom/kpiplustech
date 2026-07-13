export {};

declare global {
  interface CloudflareEnv {
    AI: Ai;
    CMS_DB: D1Database;
    MEDIA_BUCKET: R2Bucket;
    CMS_ADMIN_EMAIL: string;
    CMS_ACCESS_READY: string;
    CF_ACCESS_TEAM_DOMAIN?: string;
    CF_ACCESS_AUD?: string;
    MINIMAX_MODEL?: string;
    MINIMAX_API_KEY?: string;
    FAL_KEY?: string;
  }
}
