Template.wxApi.onCreated(function () {
    Meteor.call('getAccessToken', function (error, result) {
        // 显示错误信息并退出
        if (error) {
            return throwError(error.reason);
        }

        if (result.postExists) {
            throwError('This link has already been posted（该链接已经存在）');
        }
    });
});
Template.wxApi.helpers({

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

Template.wxApi.wechatCallbackapiTest = function () {
    /*if(Template.wxApi.checkSignature()){
        alert(echoStr);
        return;
    }*/
}
