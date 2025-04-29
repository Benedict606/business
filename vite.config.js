import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin/index.html"),
        login: resolve(__dirname, "login.html"),
        details: resolve(__dirname, "details.html"),
        about : resolve(__dirname, "about.html"),
        notfound: resolve(__dirname, "not-found.html"),
      },
    },
  },
});
