# Prompt user for channel name
$channel = Read-Host "Enter Twitch channel name"

# Set to aletluna if blank
if ([string]::IsNullOrEmpty($channel)) {
    $channel = "aletluna"
}

# Start proxy in new tab
wt -w 0 nt -d . --title "proxy" powershell -NoExit -Command "node proxy.js"

# Start http-server and open overlay
# Port 8081 used to avoid conflict with Streamer.bot WebSocket Server
http-server -p 8081 -o "./v2/?channel=$channel&animate=true&size=1&font=2&fade=60"