# Prompt user for channel name
$channel = Read-Host "Enter Twitch channel name"

# Set to aletluna if blank
if ([string]::IsNullOrEmpty($channel)) {
    $channel = "aletluna"
}

# Start proxy in new tab
wt -w 0 nt -d . --title "proxy" powershell -NoExit -Command "node proxy.js"

# Start http-server and open overlay
http-server -o ./v2/?channel=$channel