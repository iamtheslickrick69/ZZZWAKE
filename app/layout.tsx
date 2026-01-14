import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MAW Marketing — Turn Marketing Spend Into Predictable Revenue",
  description:
    "MAW Marketing helps established companies optimize their existing marketing investments. We eliminate waste, amplify what works, and build systematic growth your team can maintain and scale.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "MAW Marketing — Growth Agency",
    description: "We turn marketing spend into predictable revenue. Optimize what works, eliminate waste, and build systematic growth.",
    url: "https://wake.haestus.dev",
    siteName: "MAW Marketing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MAW Marketing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAW Marketing — Growth Agency",
    description: "We turn marketing spend into predictable revenue.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
