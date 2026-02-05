const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3003;

app.use(cors());

const CONFIG_PATH = path.join(__dirname, 'config.json');

const getConfig = () => {
    try {
        const data = fs.readFileSync(CONFIG_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading config:', err);
        return {};
    }
};

app.get('/:scope/:file', (req, res) => {
    const { scope, file } = req.params;
    const config = getConfig();
    const targetUrl = config[scope];

    if (!targetUrl) {
        return res.status(404).send(`Scope ${scope} not found in registry`);
    }

    // In a real scenario, you might construct the full URL if targetUrl is just a base,
    // but here we assume config maps scope -> full remoteEntry URL
    // So if the request is for remoteEntry.js, we redirect.
    // Ideally, the config should be base URL, and we append `file`.
    // But per our plan, we kept it simple. Let's support both simple full-url mapping or base-url mapping.

    // CASE 1: Config is full URL to remoteEntry.js
    if (file === 'remoteEntry.js' && targetUrl.endsWith('remoteEntry.js')) {
        console.log(`[Registry] Redirecting ${scope}/${file} -> ${targetUrl}`);
        return res.redirect(targetUrl);
    }

    // CASE 2: Config is base URL (e.g. http://localhost:3001)
    // Then we append the file.
    // This is more flexible.

    // For now, adhering to the plan which had full URLs in config.json.
    console.log(`[Registry] Redirecting ${scope} -> ${targetUrl}`);
    res.redirect(targetUrl);
});

app.listen(PORT, () => {
    console.log(`Registry Gateway running at http://localhost:${PORT}`);
});
