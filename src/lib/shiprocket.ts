import { env } from "@/lib/env";

export async function createShipment(orderId: string) {
  if (!process.env.SHIPROCKET_EMAIL || !process.env.SHIPROCKET_PASSWORD) {
    return { mode: "mock", trackingNumber: `MOCK-SHIP-${orderId}` };
  }
  return { mode: "configured", apiUrl: env.shiprocketApiUrl, trackingNumber: `PENDING-${orderId}` };
}

export async function getTracking(trackingNumber: string) {
  if (!process.env.SHIPROCKET_EMAIL || !process.env.SHIPROCKET_PASSWORD) {
    return { mode: "mock", status: "Shipment will be created after fulfilment", trackingNumber };
  }
  return { mode: "configured", status: "Integration ready", trackingNumber };
}
