Accounts.onCreateUser(function (options, user) {
    if (options.profile)
        user.profile = options.profile;

    // If this is the first user going into the database, make them an admin
    if (Meteor.users.find().count() === 1)
        user.admin = true;

    return user;
});

Meteor.methods({
    updateUserinfo: function (openId) {
        check(openId, String);

        Meteor.users.update({
            openId: openId
        }, {
            $set: {
                avatarId: avatarId
            }
        });
    }
});

Meteor.methods({
    checkUser: function (userinfo) {
        check(userinfo, {
            nickname: String,
            city: String,
            country: String,
            headimgurl: String,
            language: String,
            openid: String,
            province: String,
            sex: Number
        });

        var _user = Meteor.users.findOne({
            'profile.openid': userinfo.openid
        });
        if (_user) {
            return {
                openidExists: true,
                _id: _user._id
            };
        } else {
            return {
                openidExists: false
            };
        }
    }
});

Meteor.methods({
    getBookmarkUsers: function (postId) {
        check(postId, String);

        var users = Meteor.users.find({
            bookmarkedPostIds: postId
        }).fetch();
        return users;
    }
});
