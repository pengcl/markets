Template.postsList.helpers({
    posts: function () {
        return Posts.find({}, {
            sort: {
                submitted: -1
            }
        });
    }
});


Template.postsList.events({
    'click .js-add-post': function (event) {
        event.preventDefault();

        if (!Meteor.userId()) {
            return Overlay.open('authOverlay');
        } else {
            Router.go('postAdd');
        }
    }
});
