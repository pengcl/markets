var TOKEN: 'weixin';

Template.wxApi.checkSignature = function () {
    var signature = $_GET["signature"];
    var timestamp = $_GET["timestamp"];
    var nonce = $_GET["nonce"];

    var token = TOKEN;
    var tmpArr = array($token, $timestamp, $nonce);
    sort($tmpArr, SORT_STRING);
    var tmpStr = implode($tmpArr);
    tmpStr = sha1($tmpStr);

    if (tmpStr == signature) {
        return true;
    } else {
        return false;
    }
};

Template.wxApi.wechatCallbackapiTest = function () {

}
