# Start proxy in new tab
wt -w 0 nt -d . --title "proxy" powershell -NoExit -Command "node proxy.js"

# Start http-server
# Port 8081 used to avoid conflict with Streamer.bot WebSocket Server
http-server -p 8081