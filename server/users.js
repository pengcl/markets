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
    checkUser: function (openId) {
        check(openId, String);

        var _user = Meteor.users.find({
            openId: openId
        });
        return _user._id;
    }
});
