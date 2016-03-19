Template.getWxUser.onCreated(function () {
    var controller = Iron.controller();
    var wx_code = controller.state.get('wx_code');
    var url = Template.getWxUser.getAccessTokenUrl(wx_code);
    var _access_token = Meteor.call('getJsonData', url, function (error, result) {
        // 显示错误信息并退出
        if (error) {
            alert(error);
        } else {
            alert(result);
        }
    });
});

Template.getWxUser.getAccessTokenUrl = function (wx_code) {
    var wx_apiUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret=" + appSecret + "&code=" + wx_code + "&grant_type=authorization_code";
    return wx_apiUrl;
};
