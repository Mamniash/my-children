import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AntdProvider from "./AntdRegistry";
import { VKMetrika, VKMetrikaNoScript } from "./VKMetrika";
import { YandexMetrika, YandexMetrikaNoScript } from "./YandexMetrika";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "25‑минутные окна",
  description:
    "Цифровой помощник для семейных ритуалов: готовые 25‑минутные офлайн‑сценарии, напоминания и простая оплата.",
  icons: {
    icon: "image.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <VKMetrika />
        <YandexMetrika />
      </head>
      <body className={poppins.className}>
        <VKMetrikaNoScript />
        <YandexMetrikaNoScript />
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  )
}
