Template.getWxUser.onCreated(function () {
    var controller = Iron.controller();
    var wx_code = controller.state.get('wx_code');

    if (wx_code) { //检查wx_ode参数是否存在，如果存在，用code去获取token
        Template.getWxUser.getAccessToken(wx_code);
        //Template.getWxUser.getWxUserinfo (Session.get("access_token"), Session.get("openid"));
    } else { //wx_code不存在，去获取wx_code，
        Template.getWxUser.getCode();
        //Template.getWxUser.getCodeBase();
    }
});

Template.getWxUser.helpers({
    /*userinfo: function () {
        Template.getWxUser.getWxUserinfo(Session.get("access_token"), Session.get("openid"));
        var userinfo = {
            nickname: Session.get("nickname"),
            openid: Session.get("openid"),
            sex: Session.get("sex"),
            province: Session.get("province"),
            city: Session.get("city"),
            country: Session.get("country"),
            headimgurl: Session.get("headimgurl")
        }
        Template.getWxUser.checkUser(userinfo);
        return userinfo;
    }*/
});

Template.getWxUser.getAccessToken = function (code) {
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret=" + appSecret + "&code=" + code + "&grant_type=authorization_code";

    Meteor.call('getAccessToken', url, function (err, result) {
        if (result) {
            //Template.getWxUser.getWxUserinfo(result.access_token, result.openid);
            console.log(result);
        } else {
            return err;
        }
    });
};

Template.getWxUser.getCode = function () {
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=http%3A%2F%2Flefans.com%2FgetWxUser&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
};

Template.getWxUser.getCodeBase = function () {
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=http%3A%2F%2Flefans.com%2FgetWxUser&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
};

Template.getWxUser.refreshAccessToken = function (appId, refreshToken) {
    url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + appId + "&grant_type=refresh_token&refresh_token=" + refreshToken;

    Meteor.call('getJsonData', url, function (error, result) {
        if (result) {
            Template.getWxUser.getWxUserinfo(result.access_token, result.openid);
        } else {
            return error;
        }
    });
};

Template.getWxUser.checkAccessToken = function (token, openid) {
    var url = "https://api.weixin.qq.com/sns/auth?access_token=" + token + "&openid=" + openid;

    Meteor.call('getJsonData', url, function (error, result) {
        if (result) {
            var checkAccessToken = (eval("(" + result.content + ")"));
            if (checkAccessToken.errmsg === "ok") {
                Session.set("checkAccessToken", "1");
            } else {
                Session.set("checkAccessToken", "0");
            }
        } else {
            return (error);
        }
    });
}

Template.getWxUser.getWxUserinfo = function (token, openid) {
    var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + token + "&openid=" + openid + "&lang=zh_CN";

    Meteor.call('getAccessToken', url, function (error, result) {
        // 显示错误信息并退出
        if (result) {
            console.log(result);
            Session.set(result);
            var userinfo = {
                nickname: result.nickname,
                city: result.city,
                country: result.country,
                headimgurl: result.headimgurl,
                language: result.language,
                openid: result.openid,
                province: result.province,
                sex: result.sex
            }
            //Template.getWxUser.checkUser(userinfo);
        } else {
            return (error);
        }
    });
};

Template.getWxUser.checkUser = function (userinfo) {
    Meteor.call('checkUser', userinfo, function (error, result) {
        // 显示错误信息并退出
        if (result) {
            if (result.openidExists) {
                Meteor.connection.setUserId(result._id);
            } else {
                var wx_user = {
                    username: userinfo.openid,
                    password: Template.getWxUser.createPassword(),
                    profile: {
                        nickname: userinfo.nickname,
                        city: userinfo.city,
                        country: userinfo.country,
                        headimgurl: userinfo.headimgurl,
                        language: userinfo.language,
                        openid: userinfo.openid,
                        province: userinfo.province,
                        sex: userinfo.sex
                    }
                };
                Accounts.createUser(wx_user, function (err) {
                    if (err) {
                        alert(err);
                        //return throwError(err);
                    } else {
                        alert("ok");
                    }
                });
            }
        } else {
            return error;
        }
    });
};

Template.getWxUser.createPassword = function () {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var result = "";
    for (var i = 0; i < 20; i++) {
        var r = Math.floor(Math.random() * 62); //取得0-62间的随机数，目的是以此当下标取数组data里的值！
        result += data[r]; //输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。
    }
    return result
}
