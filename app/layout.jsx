import {Archivo} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./Testimonials.css";
import "./testimonials-ui.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const metadata = {
  title: "Montabox — Preview",
  description: "Preview do site Montabox.",
};

const familjen = localFont({
  src: "../public/fonts/FamiljenGroteskVariable_Regular.woff2",
  variable: "--font-familjen",
});

const neueHaas = localFont({
  src: "../public/fonts/NeueHaasDisplay_Roman.woff2",
  variable: "--font-neuehaas",
});

export default function RootLayout({children}) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${familjen.variable} ${neueHaas.variable}`}>
      <body className="bg-[#121212] text-[#eaeaea] antialiased font-neuehaas">{children}</body>
    </html>
  );
}
