AccessToken = new Mongo.Collection('accessToken');
if (Meteor.isServer) {
    Meteor.methods({
        getJsonContent: function () {
            //check(Meteor.userId(), String);
            //check(url, String);
            var appId = "wxa3b22cc835b53e05";
            var appSecret = "89161de1080ad94fd65d1acceed5de10";
            var timestamp = new Date().getTime();
            var accessToken;
            var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

            if (AccessToken.find().expire_time > timestamp) {
                accessToken = AccessToken.find({tokenName: "weixin"},{});
                access_token = accessToken.access_token;
                return "access_token";
            } else {
                var result = HTTP.get(url);
                accessToken = {
                    access_token: result.data.access_token,
                    expire_time: timestamp + 7000
                };
                AccessToken.update({
                    tokenName: "weixin"
                }, {
                    $set: {
                        accessToken
                    }
                });
                access_token = result.data.access_token;
                return accessToken;
            }
        }
    });
}
