// Before running this proxy, make sure to install dependencies:
// run npm_init_dependencies.bat and init_env_file.bat
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

const fs = require("fs");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8082 });

// Load pride flags from JSON file
let UserPrideFlags = {};
async function loadPrideFlags() {
    return fs.promises.readFile("v2/user_pride_flags.json", "utf8")
        .then(JSON.parse)
        .then(data => {
            UserPrideFlags = data;
            console.log("[ChatIS][Pronouns] Reloaded flags:", Object.keys(UserPrideFlags).length);
        });
}

// Watch for changes in the pride flags file and notify clients
fs.watchFile("v2/user_pride_flags.json", async () => {
    console.log("[ChatIS][Pronouns] Flags file changed, reloading...");
    await loadPrideFlags();
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN)
            client.send(JSON.stringify({ type: "flagsUpdated" }));
    });
});

// Initial load of pride flags
loadPrideFlags();

// Endpoint to get pride flags
app.get("/v2/user_pride_flags.json", (req, res) => {
    res.json(UserPrideFlags);
});

// Gets Twitch Token, caching it until it expires
let ACCESS_TOKEN = "";
let EXPIRES_AT = 0;

async function getToken() {
    const now = Date.now();
    if (!ACCESS_TOKEN || now >= EXPIRES_AT) {
        const res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`, {
            method: 'POST'
        });
        const data = await res.json();
        ACCESS_TOKEN = data.access_token;
        EXPIRES_AT = now + data.expires_in * 1000;
        console.log("New token acquired");
    }
    return ACCESS_TOKEN;
}

// Allow all CORS requests for local testing
app.use(cors());

// Proxy all requests from /twitch-api to Twitch API
app.use("/twitch-api", async (req, res) => {
    // Strip /twitch-api prefix to get actual path
    const path = req.originalUrl.replace("/twitch-api", "");
    const targetURL = `https://api.twitch.tv${path}`;

    console.log(`Proxying request: ${targetURL}`);

    try {
        const token = await getToken();
        const response = await fetch(targetURL, {
            method: req.method,
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${token}`,
                "Content-Type": req.get("Content-Type") || "application/json",
            },
            body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
        });

        // Forward response back to client
        const body = await response.text();
        res.status(response.status).send(body);
    } catch (err) {
        console.error("Twitch Proxy error:", err);
        res.status(500).send("Twitch Proxy error");
    }
});


// Proxy all request from /chatis to Chatis server
app.use("/chatis", async (req, res) => {
    // Strip /chatis prefix to get actual path
    const path = req.originalUrl.replace("/chatis", "");
    const targetURL = `https://chatis.is2511.com${path}`;

    console.log(`Proxying Request ${targetURL}`);

    try {
        const response = await fetch(targetURL, {
            method: req.method,
            headers: {
                "Content-Type": req.get("Content-Type") || "application/json",
            },
            body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
        });

        // Forward response back to client
        const body = await response.text();
        res.status(response.status).send(body);
    } catch (err) {
        console.error("Chatis Proxy Error", err);
        res.status(500).send("Chatis Proxy Error");
    }
});

// Start local proxy server
app.listen(PORT, () => {
    console.log(`Proxy running at http://localhost:${PORT}`);
});
