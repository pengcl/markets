Template.settings.helpers({
    userName: function(){
        return Meteor.user().profile.name;
    },
    userMail: function(){
        return Meteor.user().email[0];
    },
    userAvatar: function(){
        return Meteor.user().profile.avatar;
    }
});

Template.settings.events({
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
