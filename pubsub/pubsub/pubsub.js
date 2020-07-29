const { ApiClient } = require('twitch');
const { AccessToken, RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth');
const { PubSubClient } = require('twitch-pubsub-client');
const { PubSubRedemptionMessage } = require('twitch-pubsub-client');

const fs = require('fs')
var another = require('./post.js');
var clientId = '';
var clientSecret = '';
var streamID = '';
var code = '';
var accessToken = '';
var refreshToken = '';
var filedata = new Array();
var tokenArray = new Array();
const axios = require('axios')


async function reader(){
    return new Promise(function (resolve, reject) {
        fs.readFile('config.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            //Set vars by read data
            filedata = data.split(/\n/)
            clientId = filedata[0]
            clientSecret = filedata[1]
            streamID = filedata[2]
            code = filedata[3]
            if (clientId != '') {
                //Remove line seperators & resolve reader promise
                clientId = clientId.replace(/(\r\n|\n|\r)/gm, '');
                clientSecret = clientSecret.replace(/(\r\n|\n|\r)/gm, '')
                code = code.replace(/(\r\n|\n|\r)/gm, '')
                streamID = streamID.replace(/(\r\n|\n|\r)/gm, '')
                resolve();
            }

        });
    })
}


async function main(){
    try {
        //Awaits post.js's posting method's promise resolution then sets access token and refresh from resolved array
        tokenArray = await another.data.posting(clientId,clientSecret,code,'http://localhost:8888/callback/')
        accessToken = tokenArray[0]
        refreshToken = tokenArray[1]
        var redemptionName = "";

        //Auth Loop provider to be passed to apiClient arg
        const authProvider = new RefreshableAuthProvider(
            new StaticAuthProvider(clientId, accessToken),
            {
                clientSecret,
                refreshToken,
            }
        );

        const apiClient = new ApiClient({authProvider});

        const pubSubClient = new PubSubClient();
        //Awaits onRedemption from streamID based on registerUserListener's args
        await pubSubClient.registerUserListener(apiClient);
        const listener = await pubSubClient.onRedemption(streamID, (message) => {
            //Set redemption name then POST as param to localhost webserver to be parsed
            console.log(message.rewardName + ' was redeemed');
            let redemptionName = message.rewardName;
            axios.post('http://localhost:8000/callback/', null, {
                params: {
                    redemptionName
                }
            })
                .then((res) => {
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(res)
                })
                .catch((error) => {
                    console.error(+error)
                })

        });
    }
    catch(e) {
        console.log(e)
    }
};

//Runs reader() then main by callback when reader's promise resolves
reader().then(main)

