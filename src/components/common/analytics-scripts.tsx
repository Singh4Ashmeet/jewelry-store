import Script from "next/script";
import { analytics, anonymizedAnalyticsEnabled } from "@/lib/analytics";

export function AnalyticsScripts() {
  if (!anonymizedAnalyticsEnabled()) return null;

  return (
    <>
      {analytics.plausibleDomain && (
        <Script
          defer
          data-domain={analytics.plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
      {analytics.googleAnalyticsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`} strategy="afterInteractive" />
          <Script id="ga-anonymized-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analytics.googleAnalyticsId}', {
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
