Meteor.publish('posts', function () {
    return Posts.find();
});

Meteor.publish('feed', function() {
  return Activities.find({}, {sort: {date: -1}, limit: 10});
});

Meteor.publish('activities', function() {
  return Activities.find({}, {sort: {date: -1}, limit: 10});
});

Meteor.publish('post', function (id) {
    check(id, String);
    return [
    BookmarkCounts.find({
            postId: id
        }),
    Activities.find({
            postId: id
        })
  ];
});

Meteor.publish('bookmarkCounts', function () {
    return BookmarkCounts.find();
});

// autopublish the user's bookmarks and admin status
Meteor.publish(null, function () {
    return Meteor.users.find(this.userId, {
        fields: {
            admin: 1,
            bookmarkedPostIds: 1,
            'services.twitter.profile_image_url_https': 1
        }
    });
});
