AccessToken = new Mongo.Collection('accessToken');
if (Meteor.isServer) {
    Meteor.methods({
        getAccessToken: function () {
            //check(Meteor.userId(), String);
            //check(result, String);

            var appId = "wxa3b22cc835b53e05";
            var appSecret = "89161de1080ad94fd65d1acceed5de10";
            var access_token;
            var timestamp = new Date().getTime();
            var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

            if (AccessToken.find().expire_time > timestamp) {
                access_token = data.access_token;
            } else {
                //HTTP.get(url,data, function(data){
                //  alert(data);
                //})
                //var request = require('request');
                var result = HTTP.get(url, function () {

                });
                return result;
            }
        }
    });
}
