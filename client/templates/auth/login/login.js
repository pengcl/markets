Template.login.helpers({
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.login.events({
    'submit form': function (e) {
        e.preventDefault();
        var credentials = {
            email: $(e.target).find('#email').val(),
            password: $(e.target).find('#password').val()
        };

        Meteor.loginWithPassword(credentials.email, credentials.password, function (err) {
            if (err) {
                this.error = err.error;
                //alert(err.reason);
                if (err.reason === 'Incorrect password') {
                    throwError('密码不正确，请重新输入');
                }
                if (err.reason === 'User not found') {
                    throwError('您登陆的用户并不存在，请重新输入');
                }
            } else {
                Router.go('postsList');
            }
        });
    }
});
