Template.getWxUser.onCreated(function () {
    var controller = Iron.controller();
    var wx_code = controller.state.get('wx_code');
<<<<<<< HEAD
    if (!Meteor.user()) {
        if (wx_code) {
            Template.getWxUser.getWxUserinfoService(wx_code);
        } else {
            Template.getWxUser.getCode("snsapi_base");
        }
    } else {
        console.log("have a user");
=======
    if (wx_code) {
        Template.getWxUser.getWxUserinfoService(wx_code);
    }else{
        Template.getWxUser.getCode("snsapi_base");
>>>>>>> origin/master
    }
});

Template.getWxUser.helpers({
    userinfo: function () {
        return Meteor.user();
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
<<<<<<< HEAD
            if (result.errcode) {
                if (result.errcode === 40029) {
                    Template.getWxUser.getCode("snsapi_base");
                }else{
                    console.log("else");
                }
            } else {
                if (result.openidExists) {
                    Meteor.connection.setUserId(result.userId);
                    console.log(result);
                } else {
                    console.log(result);
                    var wx_user = {
                        username: result.userinfo.openid,
                        password: Template.getWxUser.createPassword(),
                        profile: {
                            openid: result.userinfo.openid,
                            nickname: result.userinfo.nickname,
                            country: result.userinfo.country,
                            province: result.userinfo.province,
                            city: result.userinfo.city,
                            sex: result.userinfo.sex,
                            headimgurl: result.userinfo.headimgurl,
                            language: result.userinfo.language
                        }
                    }
                    Accounts.createUser(wx_user);
                    console.log(result);
                }
            }
=======
            console.log(result);
>>>>>>> origin/master
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
