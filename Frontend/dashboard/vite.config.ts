import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isDev = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: isDev
          ? "http://localhost:8000"
          : "https://admin-dashboard-0hge.onrender.com",
        changeOrigin: isDev,
        secure: !isDev,
        ws: true,
      },
    },
  },
});
