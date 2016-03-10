Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            url: $(e.target).find("#url").val(),
            title: $(e.target).find("#title").val()
        }

        Posts.update(currentPostId, {
                $set: postProperties
            },
            function (error) {
                if (error) {
                    throwError(error.reason);
                } else {
                    Router.go('postDetails', {
                        _id: currentPostId
                    });
                }
            }
        );
    },

    'click .js-save':function(e){
        $("#postEdit").submit();
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});
