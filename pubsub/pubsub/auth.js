const { ApiClient } = require('twitch');
const { AccessToken, RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth');
const { PubSubClient } = require('twitch-pubsub-client');
const { PubSubRedemptionMessage } = require('twitch-pubsub-client');


        (async () => {
        const axios = require('axios')
        const clientId = '';
        const accessToken = '';
        const clientSecret = '';
        const refreshToken = '';
        const streamID = '';
        var redemptionName = "";
        //creates a passable authProvider with listed information that automaitcally refreshes when access token duration ends.
        const authProvider = new RefreshableAuthProvider(
            new StaticAuthProvider(clientId, accessToken),
            {
                clientSecret,
                refreshToken,
            }
        );
        //Twitch API client carrying authProvider args
        const apiClient = new ApiClient({authProvider});

        const pubSubClient = new PubSubClient();

        //Listener for userID pulled from apiClient
        await pubSubClient.registerUserListener(apiClient);


        const listener = await pubSubClient.onRedemption(streamID, (message) => {
            console.log(message.rewardName + ' was redeemed');
                    //On redemption, pull rewardName of message and send a post request to localhost
                    //with param redemptionName:message.rewardName
                    let redemptionName = message.rewardName;
                        axios.post('http://localhost:8000/callback/', null, { params: {
                                redemptionName
                                }
                        })
                            .then((res) => {
                                    console.log(`statusCode: ${res.statusCode}`)
                                    console.log(res)
                            })
                            .catch((error) => {
                                    console.error(+ error)
                            })

        });

       })();


