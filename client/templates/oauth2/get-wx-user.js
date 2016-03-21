Template.getWxUser.onCreated(function () {});

Template.getWxUser.helpers({
    getJsonData: function () {
        Meteor.call('getJsonData', url, function (error, result) {
            var controller = Iron.controller();
            var wx_code = controller.state.get('wx_code');
            var url = Template.getWxUser.getAccessTokenUrl(wx_code);
            // 显示错误信息并退出
            alert(url);
            if (error) {
                console.log("error");
            } else {
                var wx_usr_json = result;
                console.log("result");
            }
        });
        //alert(access_touken);
        return access_touken;
    }
});

Template.getWxUser.getAccessTokenUrl = function (wx_code) {
    var wx_apiUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret=" + appSecret + "&code=" + wx_code + "&grant_type=authorization_code";
    return wx_apiUrl;
};
