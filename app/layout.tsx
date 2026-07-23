import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://axis-global-observatory.ghtjd10855.chatgpt.site"),
  title: "AXIS — Global AX Observatory",
  description: "세계 정부와 조직이 AI로 일하는 방식을 비교하는 원문 기반 AX 관측소.",
  openGraph: {
    title: "AXIS — Global AX Observatory",
    description: "정부의 AI 전환을 기술 뉴스가 아니라 일하는 방식의 기록으로 읽습니다.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "정부는 AI로 어떻게 일하는가 — AXIS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXIS — Global AX Observatory",
    description: "세계 정부와 조직이 AI로 일하는 방식을 비교하는 원문 기반 AX 관측소.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
