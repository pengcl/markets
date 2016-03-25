Template.getWxUser.onCreated(function () {
    var controller = Iron.controller();
    var wx_code = controller.state.get('wx_code');
    if (wx_code) {
        Template.getWxUser.getWxUserinfo(wx_code);
    }else{
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
