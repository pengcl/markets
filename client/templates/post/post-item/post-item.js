Template.postItem.onRendered(function () {
    var i = 0;
    for (i; i < 5; i++) {
        $(".item-post").eq(i*5).addClass("highlighted");
    };
});

Template.postItem.helpers({
    highlightedClass: function () {
        if (this.size === 'large')
            return 'highlighted';
    },

    bookmarkCount: function () {
        var count = BookmarkCounts.findOne({
            postId: this._id
        });
        return count && count.count;
    },
    postGallery: function () {
        return Images.find({
            _id: String(this.galleryId.split(",")[0])
        });
    }
});
