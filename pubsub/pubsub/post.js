var Methods = {
        posting: function(a, b, c, d) {
            const axios = require('axios');
            return new Promise(function (resolve, reject) {
                var tokenArray = new Array();
                //Axios module's POST with params
                axios.post('https://id.twitch.tv/oauth2/token'
                    + '?client_id=' + a
                    + '&client_secret=' + b
                    + '&code=' + c
                    + '&grant_type=authorization_code'
                    + '&redirect_uri=' + d,
                    {})
                    .then(function (response) {
                        //push POST response to var resp, parse out access/refresh tokens with split and replace flow
                            var resp = JSON.stringify(response.data)
                            resp = resp.replace(/\"/g, "");
                            resp = resp.replace(/:/g, "\n");
                            const resparr = resp.split(',');
                            const access = resparr[0];
                            const acc = access.split('\n');
                            const finacc = acc[1];
                            const refresh = resparr[2];
                            const ref = refresh.split('\n');
                            const finref = ref[1];
                            let tokenArray = [finacc, finref]
                            if(undefined != tokenArray) {
                                resolve(tokenArray)
                            }
                    })
                    .catch(error => {
                            console.log(error.response)
                    });
        })
        }
}
exports.data = Methods;