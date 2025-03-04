import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "什么嘉的博客",
  description: "编码，设计，摄影，思考",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
