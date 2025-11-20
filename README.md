# [![](https://chatis.is2511.com/img/Peepo-64x64.png)](https://chatis.is2511.com) ChatIS

**ChatIS** is an overlay that allows you to show your Twitch chat on screen with OBS, XSplit,
and any other streaming software that supports browser sources.
It supports your [**BetterTTV**](https://betterttv.com/),
[**FrankerFaceZ**](https://www.frankerfacez.com/) and
[**7TV**](https://7tv.app/) emotes, always at the best available quality.
You can choose to activate a smooth animation, show bots messages and fade old ones after some time.
It comes with many fonts and styling options that can be combined as desired.

## Features
- 7TV, BTTV and FFZ emotes support
- Lots of fonts and styling options, custom fonts
- Twitter emojis
- 7TV, BTTV and FFZ user badges (on/off)
- Smooth animation (on/off)
- Fade old messages (on/off)
- Hide bots messages and user commands (on/off)
- !refreshoverlay to make newly added emotes appear (mods only)

# ChatIS Local:

## What is different about this version?
I wanted to be able to fully customize the ChatIS Overlay and run it locally on my PC.  
My motivation for this was to implement support for [Twitch Chat Pronouns](https://pr.alejo.io/).  
This modified version calls the Twitch API directly through a proxy instead of relying on the ChatIS server to handle that.  
I have added pride themed styles for these pronoun badges which are shown next to the name on the overlay.  
Styles available right now: trans - enby - lesbian - transbian - gay - bi - pan - aro - ace - aroace - pride - default

## Setup for local use
This is really experimental and a bit convoluted to set up.  
[NodeJS](https://nodejs.org/en/download) npm is needed.  
Run ./npm_init_dependencies.bat, ./init_env_file.bat and ./init_badge_file.bat before use.  
Register a new application [here](dev.twitch.tv/console/apps) and set Twitch Client ID and Twitch Client Secret in the .env file. This file will be ignored by git in case you want to push to your own repo. Do not share this information.  
Go to the [ChatIS website](https://chatis.is2511.com/) to set your desired overlay settings, copy the link and replace https://chatis.is2511.com/v2/... with http://127.0.0.1:8081/v2/... (the local http server).  
Add this to you OBS as a browser source. Note that some fonts might work better with the pronoun badges than others, shadows look a bit weird imo.  
Run ./run_server.bat (only opens the local server and proxy) or ./run_server_debug.bat (additionally opens a browser window with the option to set a channel).  
These two terminal tabs have to stay open for as long as you want to use the overlay.  

## Updating pronoun badge styles
The information about what badge style will apply to a user is set by Twitch user ID in ./v2/user_pride_flags.json. The default style (user name color with semi-transparent background) is used when user ID is not defined in the JSON. One way to quickly get someones Twitch user ID for manually editing the file would be https://pronouns.alejo.io/api/users/{username}.  
The JSON file can be updated while the overlay is running, without having to reset the cache. A websocket defined in ./proxy.js watches the file and notifies clients when it changes.  
I use the commands tool from [Streamer.bot](https://streamer.bot/) which runs a C# script to update the JSON file. (I will add a little guide here soon)  
  
## Yap
This is my first time doing anything in Java Script and with CSS and while I tried my best to understand what I'm doing, I really wasn't half the time, so I can't guarantee this will work flawlessly on your end.  
I still wanted to give my best effort to make it possible for you to set it up for yourself and add your own ideas, even if the setup and code is a litle chopped.  
I think that running this locally opens up some fun ways to make your chat overlay interactive with tools like, for example, Streamer.bot.  
Good luck with the setup and have fun customizing your chat overlay :3
