BookmarkCounts = new Mongo.Collection('bookmarkCounts');

Meteor.methods({
    bookmarkPost: function (postId) {
        check(Meteor.userId(), String);
        check(postId, String);

        var affected = Meteor.users.update({
            _id: this.userId,
            bookmarkedPostIds: {
                $ne: postId
            }
        }, {
            $addToSet: {
                bookmarkedPostIds: postId
            }
        });

        if (affected)
            BookmarkCounts.update({
                postId: postId
            }, {
                $inc: {
                    count: 1
                }
            });
    },

    'unbookmarkPost': function (postId) {
        check(this.userId, String);
        check(postId, String);

        var affected = Meteor.users.update({
            _id: this.userId,
            bookmarkedPostIds: postId
        }, {
            $pull: {
                bookmarkedPostIds: postId
            }
        });

        if (affected)
            BookmarkCounts.update({
                postId: postId
            }, {
                $inc: {
                    count: -1
                }
            });
    }
});

// Initialize bookmark counts. We could use upsert instead.
/*if (Meteor.isServer && BookmarkCounts.find().count() === 0) {
    Meteor.startup(function () {
        _.each(PostsData, function (post, postId) {
            BookmarkCounts.insert({
                postId: postId,
                count: 0
            });
        });
    });
}*/
