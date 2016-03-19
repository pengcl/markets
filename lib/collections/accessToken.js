AccessToken = new Mongo.Collection('accessToken');
if (Meteor.isServer) {
    Meteor.methods({
        getJsonContent: function () {
            //check(Meteor.userId(), String);
            //check(url, String);
            var timestamp = new Date().getTime();
            var accessToken;
            var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

            accessToken = AccessToken.findOne();
            //return "expire_time:" + accessToken.accessToken.expire_time + "now:" + timestamp;
            if (accessToken.accessToken.expire_time > timestamp) {
                //var access_token = accessToken.accessToken.access_token;
                return accessToken.accessToken.access_token;
            } else {
                var result = HTTP.get(url);
                accessToken = {
                    access_token: result.data.access_token,
                    expire_time: timestamp + 7000000
                };
                AccessToken.update({
                    tokenName: "weixin"
                }, {
                    $set: {
                        accessToken
                    }
                });
                //accessToken = AccessToken.findOne();
                return result.data.access_token;
            }
        }
    });
}
