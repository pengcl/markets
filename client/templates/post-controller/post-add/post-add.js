Template.postAdd.onCreated(function () {
    Session.set('postSubmitErrors', {});
});

Template.postAdd.helpers({
    errorMessage: function (field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.postAdd.events({
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('#url').val(),
            title: $(e.target).find('#title').val()
        };

        var errors = validatePost(post);
        if (errors.title || errors.url) {
            return Session.set('postSubmitErrors', errors);
        }

        Meteor.call('postInsert', post, function (error, result) {
            // 显示错误信息并退出
            if (error) {
                return throwError(error.reason);
            }

            if (result.postExists) {
                throwError('This link has already been posted（该链接已经存在）');
            }

            Router.go('postDetails', {
                _id: result._id
            });
        });
    }
});
