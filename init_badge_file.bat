@echo off
cd .\v2
echo This will create (or overwrite) the file "user_pride_flags.json". If this is your first time setup, proceed, if not, be aware that this will wipe all users badge info from this file.
echo.
set /p confirm=Are you sure you want to initialize the file? (y/n): 

if /i "%confirm%"=="y" (
    echo {> user_pride_flags.json
    echo   "1345363953": {>> user_pride_flags.json
    echo     "user_name": "aletluna",>> user_pride_flags.json
    echo     "pride_flag": "transbian">> user_pride_flags.json
    echo   }>> user_pride_flags.json
    echo }>> user_pride_flags.json
) else (
    echo.
    echo Operation canceled.
)