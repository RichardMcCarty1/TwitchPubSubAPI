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

        const authProvider = new RefreshableAuthProvider(
            new StaticAuthProvider(clientId, accessToken),
            {
                clientSecret,
                refreshToken,
            }
        );


        authProvider.refresh();

        const apiClient = new ApiClient({authProvider});

        const pubSubClient = new PubSubClient();

        await pubSubClient.registerUserListener(apiClient);

        const listener = await pubSubClient.onRedemption(streamID, (message) => {
            console.log(message.rewardName + ' was redeemed');
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


