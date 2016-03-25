Template.getWxUser.onCreated(function () {
    var controller = Iron.controller();
    var wx_code = controller.state.get('wx_code');
<<<<<<< HEAD
    if (wx_code) {
        Template.getWxUser.getWxUserinfo(wx_code);
    }else{
=======
    var wx_scope = controller.state.get('wx_scope');

    if (wx_code) { //检查wx_ode参数是否存在，如果存在，用code去获取token
        Template.getWxUser.getWxUserinfo(wx_code);
    } else { //wx_code不存在，去获取基于snsapi_base的code，
>>>>>>> origin/master
        Template.getWxUser.getCode("snsapi_base");
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

Template.getWxUser.getWxUserinfo = function (code) {

    Meteor.call('getWxUserinfo', code, function (error, result) {
        if (result) {
            if (result.openidNotExists) {
                Template.getWxUser.getCode("snsapi_userinfo");
            }
            console.log(result);
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
