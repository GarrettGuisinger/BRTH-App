// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const fs = require("fs");

const config = getDefaultConfig(__dirname);

// Allow Metro to handle `.wasm` files
config.resolver.assetExts.push("wasm");

// Serve `canvaskit.wasm` manually
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url.startsWith("/canvaskit.wasm")) {
        const filePath = path.join(__dirname, "public", "canvaskit.wasm");
        const stream = fs.createReadStream(filePath);
        res.setHeader("Content-Type", "application/wasm");
        stream.pipe(res);
        return;
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
