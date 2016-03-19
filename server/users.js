Accounts.onCreateUser(function (options, user) {
    if (options.profile)
        user.profile = options.profile;

    // If this is the first user going into the database, make them an admin
    if (Meteor.users.find().count() === 1)
        user.admin = true;

    return user;
});

Meteor.methods({
    getWxUserinfo: function () {
        var appId = "wxa3b22cc835b53e05";
        var appSecret = "89161de1080ad94fd65d1acceed5de10";
        var timestamp = new Date().getTime();
        var redirect_uri = "http%3A%2F%2F192.168.1.87%3A3000%2FwxApi";
        var accessToken;
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        var result = HTTP.get(url);
        return result;
    }
});
