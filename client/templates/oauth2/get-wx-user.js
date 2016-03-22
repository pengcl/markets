Template.getWxUser.onCreated(function () {
    var controller = Iron.controller();
    var wx_code = controller.state.get('wx_code');
    //var wx_apiUrl = Template.getWxUser.getAccessTokenUrl(wx_code);
    var wx_accessToken = Template.getWxUser.getAccessToken(wx_code);
    //alert(wx_accessToken);
    //var wx_userinfo = Template.getWxUser.getWxUserinfo(wx_accessToken.access_token, wx_accessToken.openid);
});

Template.getWxUser.helpers({});

Template.getWxUser.getAccessTokenUrl = function (code) {
    var wx_apiUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret=" + appSecret + "&code=" + code + "&grant_type=authorization_code";
    return wx_apiUrl;
};

Template.getWxUser.checkAccessTokenUrl = function (_access_token, _openId) {
    var wx_apiUrl = "https://api.weixin.qq.com/sns/auth?access_token=" + ACCESS_TOKEN + "&openid=" + wx_openId;
    return wx_apiUrl;
};

Template.getWxUser.getWxUserinfoUrl = function (_access_token, _openId) {
    var wx_apiUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=" + ACCESS_TOKEN + "&openid=" + OPENID + "&lang=zh_CN";
    return wx_apiUrl;
};

Template.getWxUser.getAccessToken = function (code) {
    var url = Template.getWxUser.getAccessTokenUrl(code);
    var _accessToken_json = Meteor.apply('getJsonData', [url], {
        wait: true
    }, function (error, result) {
        if (result) {
            //console.log(eval("(" + result.content + ")"));
            _accessToken_json = eval("(" + result.content + ")");
            console.log(_accessToken_json);
        } else {
            return (error);
        }
    });
    //return _accessToken_json;
    console.log("outsideApply:" + _accessToken_json);
};

Template.getWxUser.getWxUserinfo = function (token, id) {
    var url = Template.getWxUser.getWxUserinfoUrl(token, id);

    var _userInfo_json = Meteor.call('getJsonData', url, function (error, result) {
        // 显示错误信息并退出
        if (result) {
            return eval("(" + result.content + ")");
        } else {
            return (error);
        }
    });
    return _userInfo_json;
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
