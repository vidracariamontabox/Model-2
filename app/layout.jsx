import {Archivo} from "next/font/google";
import "./globals.css";
import "./Testimonials.css";
import "./testimonials-ui.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-archivo",
});

export const metadata = {
  title: "Montabox — Preview",
  description: "Preview do site Montabox.",
};

export default function RootLayout({children}) {
  return (
    <html lang="pt-BR" className={archivo.variable} style={{backgroundColor: "#121212"}}>
      <body className="bg-[#121212] text-[#eaeaea] antialiased" style={{backgroundColor: "#121212"}}>
        {children}
      </body>
    </html>
  );
}
