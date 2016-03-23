Template.getWxUser.onCreated(function () {
    var controller = Iron.controller();
    var wx_code = controller.state.get('wx_code');

    if (wx_code) { //检查wx_ode参数是否存在，如果存在，用code去获取token
        Template.getWxUser.getAccessToken(wx_code);
        //Template.getWxUser.getWxUserinfo (Session.get("access_token"), Session.get("openid"));
    } else { //wx_code不存在，去获取wx_code，
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=http%3A%2F%2Flefans.com%2FgetWxUser&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }
});

Template.getWxUser.helpers({
    userinfo: function () {
        Template.getWxUser.getWxUserinfo (Session.get("access_token"), Session.get("openid"));
        return Session.get("nickname");
    }
});

Template.getWxUser.getAccessToken = function (code) {
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret=" + appSecret + "&code=" + code + "&grant_type=authorization_code";

    Meteor.call('getJsonData', url, function (err, result) {
        if (result) {
            console.log(result);
            Session.set("access_token", result.access_token);
            Session.set("refresh_token", result.refresh_token);
            Session.set("openid", result.openid);
        } else {
            return (error);
        }
    });
};

Template.getWxUser.refreshAccessToken = function (appId, refreshToken) {
    url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + appId + "&grant_type=refresh_token&refresh_token=" + refreshToken;

    Meteor.call('getJsonData', url, function (error, result) {
        if (result) {
            Session.set("access_token", result.access_token);
            Session.set("refresh_token", result.refresh_token);
            Session.set("openid", result.openid);
        } else {
            return (error);
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

    Meteor.call('getJsonData', url, function (error, result) {
        // 显示错误信息并退出
        if (result) {
            Session.set(result);
        } else {
            return (error);
        }
    });
};

template.getWxUser.checkUser = function (openid) {
    this.userId = Meteor.call('checkUser', openid, function (error, result) {
        // 显示错误信息并退出
        if (result) {
            return result;
        } else {
            return error;
        }
    });
};

template.getWxUser.createWxUser = function () {
    var credentials = {
        profile: {
            name: wx_nickname
        },
        username: wx_nickname,
        openId: wx_openId
    };

    Accounts.createUser(credentials, function (err) {
        if (err) {
            return alert(err);
            //return throwError(err);
        } else {
            Router.go('postsList');
        }
    });
};

Template.getWxUser.setTokenSession = function (json) {
    Session.set({
        access_token: json.access_token,
        refresh_token: json.refresh_token,
        openid: json.openid
    });
};
