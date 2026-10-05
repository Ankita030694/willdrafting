import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WillDrafting.in — Legally Valid Online Will in Minutes",
    short_name: "WillDrafting",
    description:
      "Draft your legally valid Will online in minutes under the Indian Succession Act, 1925. Download court-ready printout & register hassle-free.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F0",
    theme_color: "#172228",
    icons: [
      {
        src: "/Logofinal.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
