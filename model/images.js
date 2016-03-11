var createThumb = function (fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
};

Images = new FS.Collection("images", {
    stores: [
    new FS.Store.FileSystem("thumbs", {
            transformWrite: createThumb
        }),
    new FS.Store.FileSystem("images"),
  ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
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
    Meteor.publish('images', function () {
        return Images.find({});
    });
}
