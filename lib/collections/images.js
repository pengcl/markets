var createThumb = function (fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
};

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {
        path: "~/uploads"
    })]
});

if (Meteor.isServer) {
    Images.allow({
        insert: function (userId) {
            return (userId ? true : false);
        },
        remove: function (userId) {
            return (userId ? true : false);
        },
        download: function () {
            return true;
        },
        update: function (userId) {
            return (userId ? true : false);
        }
    });
}

Meteor.methods({
    setAvatar: function (img) {
        check(Meteor.userId(), String);
        check(img, String);

        var affected = Meteor.users.update({
            _id: this.userId
        }, {
            $addToSet: {
                avatar: img
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
    }
});
