Template.wxApi.helpers({
    TOKEN:'weixin',
    /*posts: function () {
        return Posts.find({}, {
            sort: {
                submitted: -1
            }
        });
    }*/
});

var TOKEN = "weixin";

function checkSignature()
{
        var signature = $_GET["signature"];
        var timestamp = $_GET["timestamp"];
        var nonce = $_GET["nonce"];

	var token = TOKEN;
	var tmpArr = array($token, $timestamp, $nonce);
	sort($tmpArr, SORT_STRING);
	var tmpStr = implode( $tmpArr );
	tmpStr = sha1( $tmpStr );

	if( tmpStr == signature ){
		return true;
	}else{
		return false;
	}
}

function wechatCallbackapiTest {

}
