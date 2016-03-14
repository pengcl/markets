var IMAGE_KEY = 'avatarAttachedImage';

Template.settings.onCreated(function () {
    /*Session.set(TWEETING_KEY, true);*/
    Session.set(IMAGE_KEY, null);
});

Template.settings.helpers({
    userName: function () {
        return Meteor.user().profile.name;
    },
    userMail: function () {
        return Meteor.user().emails[0];
    },
    userAvatar: function () {
        return Meteor.user().profile.avatar;
    },
    attachedImage: function () {
        return Session.get(IMAGE_KEY);
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
                alert(err);
                alert(fileObj);
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
