Template.wxApi.onCreated(function () {
});
Template.wxApi.helpers({
    checkItOut: function () {
        var access_touken;
        Meteor.call('getJsonContent', function (error, result) {
            // 显示错误信息并退出
            if (error) {
                console.log(error);
            } else {
                access_touken = result;
                console.log(access_touken);
            }
        });
        //alert(access_touken);
        return access_touken;
    },
    checkTest: function () {
        return "sb"
    }
});

Template.wxApi.checkSignature = function () {
    /*var TOKEN = "weixin";
    var controller = Iron.controller();
    var signature = controller.state.get('signature');
    var timestamp = controller.state.get('timestamp');
    var nonce = controller.state.get('nonce');
    var echoStr = controller.state.get('echostr');

    var token = TOKEN;
    var tmpArr = new Array(token, timestamp, nonce);
    sort(tmpArr);
    var tmpStr = tmpStr.join();
    tmpStr = sha1(tmpStr);

    if (tmpStr == signature) {
        return true;
    } else {
        return false;
    }*/
}

Template.wxApi.wechatCallbackapiTest = function () {}
