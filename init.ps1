wt -w 0 nt -d . --title "proxy" powershell -NoExit -Command "node proxy.js"
http-server -o ./v2/index.html