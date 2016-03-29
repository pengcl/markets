Template.postAdd.onCreated(function () {
    Meteor.subscribe('images');
    Session.set('postSubmitErrors', {});
});

Template.postAdd.helpers({
    errorMessage: function (field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    },
    galleryId: function () {
        return Session.get('fileObjId');
    },
    postGallery: function () {
        return Images.find({
            _id: {
                $in: Session.get('fileObjIds') || []
            }
        });
    }
});

Template.postAdd.events({
    'change .js-attach-image': function (e) {
        e.preventDefault();

        var arr = [];
        FS.Utility.eachFile(e, function (file) {
            var fileObj = Images.insert(file, function (err, fileObj) {});
            arr.push(fileObj._id);
        });
        Session.set('fileObjIds', arr);
        Meteor.setTimeout(function () {
            $(".owl-carousel").owlCarousel({
                navigation: true, // Show next and prev buttons
                slideSpeed: 300,
                paginationSpeed: 400,
                navigationText : ["<",">"],
                singleItem: true
            })
        }, 1000);
    },
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            galleryId: $(e.target).find('#galleryId').val(),
            number: $(e.target).find('#number').val(),
            title: $(e.target).find('#title').val()
        };

        var errors = validatePost(post);
        if (errors.title || errors.number || errors.galleryId) {
            return Session.set('postSubmitErrors', errors);
        }

        Meteor.call('postInsert', post, function (error, result) {
            // 显示错误信息并退出
            if (error) {
                return throwError(error.reason);
            }

            Router.go('postDetails', {
                _id: result._id
            });
        });
    },
    'click .js-add': function (e) {
        e.preventDefault();
        $("#postAdd").submit();
    }
});


/*Template.postAdd.onCreated(function () {
    Session.set('postSubmitErrors', {});
});

Template.postAdd.helpers({
    errorMessage: function (field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    },
    userAvatar: function () {
        return Images.find({
            _id:Meteor.user().avatarId
        });
    }
});

Template.postAdd.events({
    'change .js-attach-image': function (e) {
        e.preventDefault();

        FS.Utility.eachFile(e, function (file) {
            Images.insert(file, function (err, fileObj) {
                var avatarId = fileObj._id;
                Meteor.call('setAvatar', avatarId, function (error, result) {
                    // 显示错误信息并退出
                    if (error) {
                        return throwError(error.reason);
                    } else {}
                });
            });
        });
    },
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            galleryId: $(e.target).find('#galleryId').val(),
            number: $(e.target).find('#number').val(),
            title: $(e.target).find('#title').val()
        };

        Meteor.call('postInsert', post, function (error, result) {
            // 显示错误信息并退出
            if (error) {
                return throwError(error.reason);
            }

            Router.go('postDetails', {
                _id: result._id
            });
        });
    },
    'click .js-add': function (e) {
        e.preventDefault();
        $("#postAdd").submit();
    }
});*/
