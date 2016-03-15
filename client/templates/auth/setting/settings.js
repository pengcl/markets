Template.settings.onCreated(function () {
    Meteor.subscribe('images');
});

Template.settings.helpers({
    userName: function () {
        return Meteor.user().profile.name;
    },
    userMail: function () {
        return Meteor.user().emails[0].address;
    },
    userAvatar: function () {
        return Images.find({
            _id:Meteor.user().avatarId
        });
    }
});

Template.settings.events({
    'click .icon-logout': function (e) {
        e.preventDefault();
        Meteor.logout();
    },
    'change .js-attach-image': function (e) {
        e.preventDefault();

        FS.Utility.eachFile(e, function (file) {
            Images.insert(file, function (err, fileObj) {
                var avatarId = fileObj._id;
                Meteor.call('setAvatar', avatarId, function (error, result) {
                    // 显示错误信息并退出
                    if (error) {
                        return throwError(error.reason);
                    } else {}
                });
            });
        });
    },
    'submit form': function (e) {
        e.preventDefault();

        var credentials = {
            profile: {
                name: $(e.target).find('#name').val()
            },
            email: $(e.target).find('#email').val(),
            password: $(e.target).find('#password').val()
        };

        Accounts.createUser(credentials, function (err) {
            if (err) {
                return alert(err);
                //return throwError(err);
            } else {
                Router.go('postsList');
            }
        });
    }
});
