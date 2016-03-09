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
    createActivity: function (activity, tweet, loc) {
        check(Meteor.userId(), String);
        check(activity, {
            recipeName: String,
            text: String,
            image: String
        });
        check(loc, Match.OneOf(Object, null));

        activity.userId = Meteor.userId();
        //activity.userAvatar = Meteor.user().services.twitter.profile_image_url_https;
        activity.userName = Meteor.user().profile.name;
        activity.date = new Date;

        if (!this.isSimulation && loc) {
            activity.place = getLocationPlace(loc);
        }

        var id = Activities.insert(activity);


        return id;
    }
});

if (Meteor.isServer) {

    var getLocationPlace = function (loc) {
        var url = 'https://api.twitter.com/1.1/geo/reverse_geocode.json' + '?granularity=neighborhood' + '&max_results=1' + '&accuracy=' + loc.coords.accuracy + '&lat=' + loc.coords.latitude + '&long=' + loc.coords.longitude;

        var response = HTTP.get(url, {
            npmRequestOptions: {
                oauth: twitterOauth()
            }
        });

        if (response.statusCode === 200 && response.data) {
            var place = _.find(response.data.result.places, function (place) {
                return place.place_type === 'neighborhood';
            });

            return place && place.full_name;
        }
    }
}

// Initialize a seed activity
