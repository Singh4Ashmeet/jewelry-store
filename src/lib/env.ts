export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Aurelia Jewellery",
  betterAuthSecret: process.env.BETTER_AUTH_SECRET ?? "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL ?? "orders@aurelia.local",
  shiprocketApiUrl: process.env.SHIPROCKET_API_URL ?? "https://apiv2.shiprocket.in/v1/external",
  seedAdminEmail: process.env.SEED_ADMIN_EMAIL ?? "admin@aurelia.local",
  seedCustomerEmail: process.env.SEED_CUSTOMER_EMAIL ?? "customer@aurelia.local",
  seedCustomerPhone: process.env.SEED_CUSTOMER_PHONE ?? "9999999999",
};
