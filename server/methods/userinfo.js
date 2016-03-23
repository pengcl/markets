OauthToken = new Mongo.Collection('oauthToken');

Meteor.methods({
    getAccessToken: function (url) {
        check(url, String);

        var timestamp = new Date().getTime();
        var accessToken;
        var result = HTTP.get(url);

        var data = (eval("(" + result.content + ")"));
        accessToken = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expire_time: timestamp + 7000000
        };

        var _openid = OauthToken.findOne({
            'openid': accessToken.openid
        });
        if (_openid) {
            OauthToken.update({
                openid: data.openid
            }, {
                $set: {
                    accessToken
                }
            });
        } else {
            return {
                openidExists: false
            };
        }

    },
    /*getAccessToken: function (url) {
        check(url, String);

        var result = HTTP.get(url);

        return (eval("(" + result.content + ")"));
    }*/
});
