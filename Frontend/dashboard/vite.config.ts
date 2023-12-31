import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isDev = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://admin-dashboard-0hge.onrender.com",
        // target: "http://127.0.0.1:8000",
        changeOrigin: false,
        secure: true,
        // ws: true,
      },
    },
  },
});
