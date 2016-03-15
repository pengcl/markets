var createThumb = function (fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
};

var imageStore = new FS.Store.GridFS("images", {
    //mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
    //mongoOptions: {...},  // optional, see note below
    //transformWrite: myTransformWriteFunction, //optional
    //transformRead: myTransformReadFunction, //optional
    maxTries: 1, // optional, default 5
    chunkSize: 1024 * 1024 // optional, default GridFS chunk size in bytes (can be overridden per file).
        // Default: 2MB. Reasonable range: 512KB - 4MB
});



Images = new FS.Collection("images", {
    stores: [
    new FS.Store.GridFS("original")
  ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
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
    setAvatar: function (avatarId) {
        check(Meteor.userId(), String);
        check(avatarId, String);

        Meteor.users.update({
            _id: this.userId
        }, {
            $set: {
                avatarId: avatarId
            }
        });
    }
});
