Meteor.methods({
    getJsonData: function (url) {
        //check(Meteor.userId(), String);
        check(url, String);

        var result = HTTP.get(url);

        return (eval("(" + result.content + ")"));
    }
});
