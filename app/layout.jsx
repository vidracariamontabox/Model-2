import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import "./globals.css";
import "./Testimonials.css";
import "./testimonials-ui.css";

export const metadata = {
  title: "Montabox — Vidraçaria e Serralheria de Alto Padrão",
  description: "Especializada em projetos residenciais e comerciais de luxo, unindo estética refinada e engenharia de alta performance.",
};

const familjen = localFont({
  src: "../public/fonts/FamiljenGroteskVariable_Regular.woff2",
  variable: "--font-familjen",
  display: "swap",
  fallback: ["sans-serif"],
});

const neueHaas = localFont({
  src: "../public/fonts/NeueHaasDisplay_Roman.woff2",
  variable: "--font-neuehaas",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const ivyPrestoDisplay = localFont({
  src: "../public/fonts/ivy-presto-display-thin.woff2",
  variable: "--font-ivy-presto",
  display: "swap",
  fallback: ["serif"],
});

export default function RootLayout({children}) {
  return (
    <html lang="pt-BR" className={`${familjen.variable} ${neueHaas.variable} ${ivyPrestoDisplay.variable}`}>
      <body className="bg-[#121212] text-[#eaeaea] antialiased font-neuehaas">
        <SmoothScroll>{children}</SmoothScroll>
        <Preloader />
      </body>
    </html>
  );
}
