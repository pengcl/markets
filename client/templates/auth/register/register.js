Template.register.helpers({
});

Template.register.events({
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
