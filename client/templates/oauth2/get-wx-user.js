Template.getWxUser.onCreated(function () {
    var controller = Iron.controller();
    var wx_code = controller.state.get('wx_code');
    if (!Meteor.user()) {
        if (wx_code) {
            Template.getWxUser.getWxUserinfoService(wx_code);
        } else {
            Template.getWxUser.getCode("snsapi_base");
        }
    } else {
        console.log("have a user");
        Router.go('postsList');
    }
});

Template.getWxUser.helpers({
    userinfo: function () {
        return Session.get("userinfo");
    }
});

Template.getWxUser.getCode = function (scope) {
    if (scope === "snsapi_base") {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=http%3A%2F%2Flefans.com%2FgetWxUser&response_type=code&scope=snsapi_base&state=snsapi_base#wechat_redirect";
    } else {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=http%3A%2F%2Flefans.com%2FgetWxUser&response_type=code&scope=snsapi_userinfo&state=snsapi_userinfo#wechat_redirect";
    }
};

Template.getWxUser.getWxUserinfoService = function (code) {

    Meteor.call('getWxUserinfoService', code, function (error, result) {
        if (result) {
            if (result.errcode) {
                Template.getWxUser.getCode("snsapi_base");
            } else {
                if (result.userExists) {
                    Meteor.connection.setUserId(result.userId);
                    console.log(result);
                    Router.go('postsList');
                } else {
                    Session.set("userinfo", result.userinfo);
                    var wx_user = {
                        username: result.userinfo.openid,
                        password: Template.getWxUser.createPassword(),
                        profile: {
                            openid: result.userinfo.openid,
                            name: result.userinfo.nickname,
                            headimgurl: result.userinfo.headimgurl
                        }
                    };
                    Accounts.createUser(wx_user, function (err) {
                        if (err) {
                            return alert(err);
                            //return throwError(err);
                        } else {
                            Router.go('postsList');
                        }
                    });
                }
            }
        } else {
            console.log(error);
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
