export const analytics = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
};

export function anonymizedAnalyticsEnabled() {
  return analytics.enabled && (analytics.googleAnalyticsId || analytics.plausibleDomain);
}
