AccessToken = new Mongo.Collection('accessToken');

Meteor.methods({
    getAccessToken: function () {
        //check(Meteor.userId(), String);
        //check(postId, String);

        var appId = "wxa3b22cc835b53e05";
        var appSecret = "89161de1080ad94fd65d1acceed5de10";
        var access_token;
        var timestamp = new Date().getTime();
        var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

        if (AccessToken.find().expire_time > timestamp) {
            access_token = data.access_token;
        }else{
            HTTP.get(url, function(data){
                alert(data);
            })
        }

        /*var affected = Meteor.users.update({
            _id: this.userId,
            bookmarkedPostIds: {
                $ne: postId
            }
        }, {
            $addToSet: {
                bookmarkedPostIds: postId
            }
        });*/

        /*if (affected){
            BookmarkCounts.update({
                postId: postId
            }, {
                $inc: {
                    count: 1
                }
            });
        }*/
    }

    /*'unbookmarkPost': function (postId) {
        check(this.userId, String);
        check(postId, String);

        var affected = Meteor.users.update({
            _id: this.userId,
            bookmarkedPostIds: postId
        }, {
            $pull: {
                bookmarkedPostIds: postId
            }
        });

        if (affected) {
            BookmarkCounts.update({
                postId: postId
            }, {
                $inc: {
                    count: -1
                }
            });
        }
    }*/
});
