Template.postAdd.onCreated(function () {
    Meteor.subscribe('images');
    Session.set('postSubmitErrors', {});
});

Template.galleryItem.onRendered(function () {
    $(".owl-carousel").owlCarousel();
    Template.postAdd.owl = $(".owl-carousel").data('owlCarousel');

    Template.postAdd.owl.reinit({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        navigationText: ["<", ">"],
        singleItem: true
    });
});

Template.postAdd.arr = [];

Template.postAdd.helpers({
    errorMessage: function (field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    },
    galleryId: function () {
        return Session.get('fileObjIds');
    },
    postGallery: function () {
        var tmpl = Template.instance();
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
        FS.Utility.eachFile(e, function (file) {
            var fileObj = Images.insert(file, function (err, fileObj) {});
            Template.postAdd.arr.push(fileObj._id);
        });
        Session.set('fileObjIds', Template.postAdd.arr);
    },
    'click .js-cross-image': function (e) {
        var _index = $(".owl-pagination").find(".active").index();
        Template.postAdd.arr.splice(_index, 1);
        Session.set('fileObjIds', Template.postAdd.arr);

        Template.postAdd.owl.removeItem(_index);
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
