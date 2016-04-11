Activities = new Mongo.Collection('activities');

Activities.allow({
    insert: function (userId, doc) {
        return doc.userId === userId;
    }
});

Activities.latest = function () {
    return Activities.find({}, {
        sort: {
            date: -1
        },
        limit: 1
    });
}

Meteor.methods({
    createActivity: function (activity) {
        check(Meteor.userId(), String);
        check(activity, {
            postId: String,
            text: String,
            image: String
        });

        activity.userId = Meteor.userId();
        activity.userAvatar = Meteor.user().profile.headimgurl;
        activity.userName = Meteor.user().profile.name;
        activity.date = new Date;

        var id = Activities.insert(activity);

        return id;
    }
});
// Initialize a seed activity
