Template.postAdd.arr = [];

//判断上传图片张数，显示隐藏删除照片按钮
Template.postAdd.arrLen = function (e) {
    var arrLen = Template.postAdd.arr.length;
    var crossIcon = $("#crossIcon");
    console.log(arrLen);
    if (arrLen < 1) {
        crossIcon.hide();
    } else {
        crossIcon.show();
    }
}

Template.postAdd.onCreated(function () {
    Meteor.subscribe('images');
    Session.set('postSubmitErrors', {});
    Session.set('fileObjIds',[]);
    //$("#crossIcon").hide();
});

/*Template.galleryItem.onRendered(function () {
    Template.postAdd.arrLen();
    $(".owl-carousel").owlCarousel();
    Template.postAdd.owl = $(".owl-carousel").data('owlCarousel');

    Template.postAdd.owl.reinit({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        navigationText: ["<", ">"],
        singleItem: true
    });
});*/

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
        Template.postAdd.arrLen();
    },
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            galleryId: $(e.target).find('#galleryId').val(),
            number: $(e.target).find('#number').val(),
            title: $(e.target).find('#title').val(),
            price: $(e.target).find('#price').val(),
            discription:$(e.target).find('#discription').val()
        };

        var errors = validatePost(post);
        if (errors.title || errors.number || errors.galleryId || errors.price || errors.discription) {
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
