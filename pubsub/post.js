const axios = require('axios')

const client_i = '
const client_secre = '';
const cod = '';
const grant_typ = 'authorization_code';
const redirect_ur = 'http://localhost:8888/callback/';


axios.post('https://id.twitch.tv/oauth2/token'
    + '?client_id=' + client_i
    + '&client_secret=' + client_secre
    + '&code=' + cod
    + '&grant_type=authorization_code'
    + '&redirect_uri=' + redirect_ur,
     {
})
    .then(function (response) {

        var resp = JSON.stringify(response.data)
        resp = resp.replace(/\"/g, "");
        resp = resp.replace(/:/g, "\n");
        const resparr = resp.split(',');
        console.log(resparr)
        const access = resparr[0];
        const acc = access.split('\n');
        const refresh = resparr[2];
        const ref = refresh.split('\n');
        const finacc = acc[1];
        const finref = ref[1];
        console.log(finacc);
        console.log(finref);
    })
    .catch(error => {
        console.log(error.response)
    });

