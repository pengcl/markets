var createPassword = function () {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var result = "";
    for (var i = 0; i < 20; i++) {
        var r = Math.floor(Math.random() * 62); //取得0-62间的随机数，目的是以此当下标取数组data里的值！
        result += data[r]; //输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。
    }
    return result
}

Meteor.methods({
    getWxUserinfo: function (code) {
        check(code, String);

        var url, userinfo;

        url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret=" + appSecret + "&code=" + code + "&grant_type=authorization_code";
        accessToken = (eval("(" + (HTTP.get(url)).content + ")"));

        if (accessToken.scope === "snsapi_base") {
            //查询微信用户是否存在；
            var wx_user = Meteor.users.findOne({
                'profile.openid': accessToken.openid
            });


            if (wx_user) {
                url = "https://api.weixin.qq.com/sns/auth?access_token=" + wx_user.profile.access_token + "&openid=" + wx_user.profile.openid;
                checkAccessToken = (eval("(" + (HTTP.get(url)).content + ")"));

                return checkAccessToken;

                url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + appId + "&grant_type=refresh_token&refresh_token=" + wx_user.profile.refresh_token; //刷新access_token的URL
                refreshToken = (eval("(" + (HTTP.get(url)).content + ")"));
                return refreshToken;
                var affected = Meteor.users.update({
                    _id: wx_user._id
                }, {
                    $set: {
                        profile: {
                            openid: accessToken.openid,
                            refresh_token: refreshToken.refresh_token
                        }
                    }
                });
                return refreshToken;
                url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + refreshToken.access_token + "&openid=" + refreshToken.openid + "&lang=zh_CN"; //获取微信用户信息的URL
                userinfo = (eval("(" + (HTTP.get(url)).content + ")"));
                return userinfo;
            } else {
                return {
                    openidNotExists: true
                };
            }
        } else {
            url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + accessToken.access_token + "&openid=" + accessToken.openid + "&lang=zh_CN"; //获取微信用户信息的URL
            userinfo = (eval("(" + (HTTP.get(url)).content + ")"));
            //return userinfo;
            var wx_user = {
                username: userinfo.openid,
                password: createPassword(),
                profile: {
                    openid: userinfo.openid,
                    access_token: accessToken.access_token,
                    refresh_token: accessToken.refresh_token
                }
            };
            //Meteor.logout();
            Accounts.createUser(wx_user);
            return userinfo;
        }
    }
});
