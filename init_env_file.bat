@echo off
echo This will create (or overwrite) the file ".env". If this is your first time setup, proceed, if it is not, be aware that this will delete your Twitch Client ID and Client Secret from the file.
echo.
set /p confirm=Are you sure you want to initialize the file? (y/n): 

if /i "%confirm%"=="y" (
    echo TWITCH_CLIENT_ID=0 > .\.env
    echo TWITCH_CLIENT_SECRET=0 >> .\.env
    echo PORT=3000 >> .\.env
) else (
    echo.
    echo Operation canceled.
)