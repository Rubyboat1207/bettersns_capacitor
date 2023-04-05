import { defineConfig } from 'vite';
import fs from 'fs';
import { resolve } from 'path'
import csp from 'vite-plugin-csp';

function getconfig() {
  const config = {
    root: './src',
    build: {
      outDir: '../dist',
      minify: false,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, './src/index.html'),
          prematch: resolve(__dirname, './src/prematch.html'),
          auton: resolve(__dirname, './src/auton.html'),
          teleop: resolve(__dirname, './src/teleop.html'),
          robot_attributes: resolve(__dirname, './src/robot.html'),
          postmatch: resolve(__dirname, './src/postmatch.html'),
          scoring: resolve(__dirname, './src/scoring.html'),
          feedback: resolve(__dirname, './src/feedback.html'),
          credits: resolve(__dirname, './src/credits.html'),
          dev: resolve(__dirname, './src/devutil.html'),
        },
      },
    },
    plugins: [
      csp({
        policy: {
          "default-src": ["self", "unsafe-eval"],
          "script-src": ["self", "unsafe-eval", "unsafe-inline", "blob:"],
          "style-src": ["self", "unsafe-inline"],
          "img-src": ["self"],
          "font-src": ["self", "data:"],
        },
      }),
    ],
  };
  return config;
}

export default defineConfig(getconfig());
