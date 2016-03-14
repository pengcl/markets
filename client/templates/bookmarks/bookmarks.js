Template.bookmarks.helpers({
    postCount: function () {
        return pluralize(this.length, 'post');
    },
    posts: function () {
        return Posts.find({_id: {$in: Meteor.user().bookmarkedPostIds}}, {
            sort: {
                submitted: -1
            }
        });
    }
});
