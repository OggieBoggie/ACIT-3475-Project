require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/proxy', createProxyMiddleware({
    target: 'https://oaidalleapiprodscus.blob.core.windows.net',
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '',
    },
    logLevel: 'debug', // Add debug logs
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${proxyReq.href}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`Received response from: ${req.url}`);
    },
    onError: (err, req, res) => {
        console.error(`Proxy error: ${err.message}`);
    },
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT} 🚀`));