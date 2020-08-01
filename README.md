# TwitchPubSubAPI
TwitchPubSubAPI Interaction in Node and Python listening for channel point redemptions

## Support
If you're having issues, you can always check out my [stream discord](https://discord.gg/wEC8DFa) and DM me and I can give you some assistance

## Dependencies
The listener portion in node requires the [twitch-pubsub-client](https://www.npmjs.com/package/twitch-pubsub-client), as well as [twitch](https://www.npmjs.com/package/twitch) and [twitch-auth](https://www.npmjs.com/package/twitch-auth). For cross-language communication / separation between the script and the webserver as well as an automated token retrieval, we use [axios](https://github.com/axios/axios) as shown in the [packages.json](https://github.com/RichardMcCarty1/TwitchPubSubAPI/blob/master/package.json). (It should all auto-install on run but I honestly don't know if thats true (lol), if thats not the case you can open cmd and use "npm install twitch@next", replacing twitch with the name of all the dependencies, except for axios where you can drop the @next like "npm install axios")

For the webserver side and script execution, I personally use [playsound](https://pypi.org/project/playsound/) for running audio, [pyautogui](https://pypi.org/project/PyAutoGUI/) for movement and keyboard inputs, and [Psutil](https://pypi.org/project/psutil/) for scanning process ID's. Logging, OS, and BytesIO are default libs used primarily for the POST response and http.server is pretty self explanatory.

## How to use?

Firstly, install [node.js](https://nodejs.org/en/), when it comes time to run the script, youll want to open it with your node.js application.
The node script reads out of config.txt as a part of a soon-coming all-in-one and retrieves the data necessary for setting up a channel point listener without you personally having to get an IDE or appropriate text editor. 

The ClientID and ClientSecret are retrived by setting up a twitch dev application [here](https://dev.twitch.tv/console/apps/create), ensure you set a Redirect URI above your ClientID before you leave. You'll want to use http://localhost:8888/callback/ unless you plan on editing the code yourself.

Your StreamID is a string for digits linked to your twitch name. You can technically get this with an endpoint; however, I've found just using a chrome extension such as [this](https://chrome.google.com/webstore/detail/twitch-username-and-user/laonpoebfalkjijglbjbnkfndibbcoon?hl=en-US) is significantly easier. 

Your auth code is retrieved by authorizing your application to connect to your account as defined in your twitch dev console. The easiest way to go about this is to use this url:
"https://id.twitch.tv/oauth2/authorize?client_id=CLIENTIDHERE&redirect_uri=http://localhost:8888/callback/&response_type=code&scope=chat:read chat:edit user:read:email channel:read:redemptions" and paste it in your browser. Replace the "CLIENTIDHERE" with your clientID found on your twitch dev app, and if you plan to change your redirect URI I'd reccomend keeping it the same across the board and edit the one in the provided URL to whatever you plan to use.

If all goes well you should be redirected to a page to authorize your account with the given scopes, and after authorizing, you'll be redirected to a page like [this](https://imgur.com/a/2MMKi9I). The auth code you want to retrieve is everything between the "=" after the word 'code' and the "&" before 'scope'. So, for an example of code=qw5Wtnjaskn6jmnY&scope, you'd want the qw5Wtnjaskn6jmnY&. Another way to ensure your code is correct is that it is always a length of 30, if it is not, you accidentally copied an additional character

Once you've retrieved all your information, you'll want to put it all in the config.txt, with each item being in its own line as defined by the labels. Then, run the pubsub.js.

For the web server, install Python 3.8 (thats what it was written in, it might run on anything post 3.0, I haven't tested it) and check the PATH Directory box, and it should simply run when you doubleclick the script. 

If it's attempting to open .py with something random, you can "open with" and navigate to your python's directory or, alternatively, you can open it in cmd using [this format](https://www.pythoncentral.io/execute-python-script-file-shell/#:~:text=Run%20a%20Python%20script%20under%20Windows%20with%20the%20Command%20Prompt&text=If%20you%20want%20to%20simply,to%20your%20PATH%20environmental%20variable.).

Within the webserver, there's a selection structure to run python scripts depending on the name of the redeemed channel point. The names carry their capitalization over from the listener and any spaces are replaced with a "+", so if a channel point redemption was named MUTE ME, you'd use "MUITE+ME". This can be simplified by taking the finnname and applying .lower() prior to selecting a script, like finnname = finnname.lower(), and just accounting for the fact everything is lowercase.

You'll have to write your own python scripts or find an alternative method of doing what you want from within the webserver, but some simple ones are playing audio or executing keybinds / moving mouse. Samples are [here](https://pastebin.com/KL7CXmy5).

