import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  base: "/k-desk/", 
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "k-desk",
        short_name: "k-desk",
        description: "Krux Desk Management System App",
        theme_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: "/android-chrome-36x36.png",
            sizes: "36x36",
            type: "image/png",
          },
          {
            src: "/android-chrome-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/android-chrome-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/android-chrome-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/android-chrome-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        background_color: "#ffffff",
        display: "standalone",
        share_target: {
          action: "/share/handle/",
          enctype: "application/x-www-form-urlencoded",
          method: "GET",
          params: {
            title: "title",
            text: "text",
            url: "url",
          },
        },
      },
    }),
  ],
});
