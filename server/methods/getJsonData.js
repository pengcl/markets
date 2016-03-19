Meteor.methods({
    getJsonData: function (url) {
        //check(Meteor.userId(), String);
        check(url, String);

        result = HTTP.post(url);

        return result.access_token;
    }
});
