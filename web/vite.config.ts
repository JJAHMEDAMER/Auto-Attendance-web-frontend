import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      //   '/api': {
      //     target: 'https://localhost:8000',
      //     changeOrigin: true,
      //     secure: false,
      //     ws: true,
      // }
    },
    // port: 5000
    // host: true  // run on local Network
  },
  plugins: [react()],
});
