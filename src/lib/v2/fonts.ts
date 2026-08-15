import { Anybody, Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";

const anybody = Anybody({
  weight: "variable",
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
  variable: "--font-v2-display",
  display: "swap",
  preload: false,
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-v2-body",
  display: "swap",
  preload: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-v2-mono",
  display: "swap",
  preload: false,
});

export const v2FontVariables = `${anybody.variable} ${beVietnamPro.variable} ${ibmPlexMono.variable}`;
