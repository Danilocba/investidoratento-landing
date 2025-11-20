import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investidor Atento — Beta",
  description: "Painel premium para investidores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-C2V3EH3JSC`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C2V3EH3JSC', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(c,s,q,u,a,r,e){
                c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
                c._hjSettings={hjid:6580925};
                r=s.getElementsByTagName('head')[0];
                e=s.createElement('script');e.async=1;
                e.src=q+c._hjSettings.hjid+u;
                r.appendChild(e);
            })(window,document,'https://static.hj.contentsquare.net/c/csq-','.js');
          `}
        </Script>        
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}