Posts = new Mongo.Collection("posts");

Posts.allow({
    update: function (userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function (userId, post) {
        return ownsDocument(userId, post);
    }
});

Posts.deny({
    update: function (userId, post, fieldNames) {
        // 只能更改如下两个字段：
        return (_.without(fieldNames, 'title', 'galleryId', 'number').length > 0);
    }
});

validatePost = function (post) {
    var errors = {};

    if (!post.title) {
        errors.title = "请填写标题";
    }

    if (!post.galleryId) {
        errors.url = "请上传商品图片";
    }

    if (!post.number) {
        errors.number = "请填写最低发起人数";
    }

    if (!post.price) {
        errors.price = "请填写商品单价";
    }

    if (!post.discription) {
        errors.discription = "请填写商品介绍";
    }

    return errors;
};

Meteor.methods({
    postInsert: function (postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            galleryId: String,
            number:String,
            price:String,
            discription:String
        });

        var errors = validatePost(postAttributes);
        if (errors.title || errors.galleryId || errors.galleryId || errors.price || errors.discription) {
            throw new Meteor.Error('invalid-post', "你必须为你的商品录入完整的信息");
        }

        /*var postWithSameLink = Posts.findOne({
            url: postAttributes.url
        });
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }*/

        var user = Meteor.user();

        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.profile.name,
            submitted: new Date()
        });

        var postId = Posts.insert(post);

        BookmarkCounts.insert({
            postId: postId,
            count: 0
        });

        return {
            _id: postId
        }
    }
});
