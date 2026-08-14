import { Anybody, Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";

const anybody = Anybody({
  weight: "variable",
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
  variable: "--font-v2-display",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-v2-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-v2-mono",
  display: "swap",
});

export const v2FontVariables = `${anybody.variable} ${beVietnamPro.variable} ${ibmPlexMono.variable}`;
