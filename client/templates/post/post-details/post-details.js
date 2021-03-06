var TAB_KEY = 'detailsShowTab';

Template.postDetails.onCreated(function () {
    Meteor.subscribe('images');
    Template.postDetails.setTab('recipe');
    Meteor.call('getBookmarkUsers', Session.get("postId"), function (error, result) {
        if(result){
            console.log(result);
            Session.set("userList",result);
        }
    });
});

Template.postDetails.onRendered(function () {
    this.$('.post-details').touchwipe({
        wipeDown: function () {
            if (Session.equals(TAB_KEY, 'recipe')) {
                Template.postDetails.setTab('make');
            }
        },
        preventDefaultEvents: false
    });
    this.$('.attribution-title').touchwipe({
        wipeUp: function () {
            if (!Session.equals(TAB_KEY, 'recipe'))
                Template.postDetails.setTab('recipe')
        },
        preventDefaultEvents: false
    });
});

// CSS transitions can't tell the difference between e.g. reaching
//   the "make" tab from the expanded state or the "feed" tab
//   so we need to help the transition out by attaching another
//   class that indicates if the feed tab should slide out of the
//   way smoothly, right away, or after the transition is over
Template.postDetails.setTab = function (tab) {
    Session.set(TAB_KEY, tab);
}

Template.postDetails.helpers({
    isOwen: function () {
        return this.userId === Meteor.userId();
    },
    isActiveTab: function (name) {
        return Session.equals(TAB_KEY, name);
    },
    activeTabClass: function () {
        return Session.get(TAB_KEY);
    },
    bookmarked: function () {
        return Meteor.user() && _.include(Meteor.user().bookmarkedPostIds, this._id);
    },
    activities: function () {
        return Activities.find({
            postId: this._id
        }, {
            sort: {
                date: -1
            }
        });
    },
    comments: function () {
        return Comments.find({
            postId: this._id
        }, {
            sort: {
                date: -1
            }
        });
    },
    postGalleryId: function () {
        return this.galleryId;
    },
    postGallery: function () {
        return Images.find({
            _id: {
                $in: this.galleryId.split(",")
            }
        });
    },
    userList: function () {
        return Session.get("userList");
    }
});

Template.postDetails.events({
    'click .js-add-bookmark': function (event) {
        event.preventDefault();

        if (!Meteor.userId()) {
            return Overlay.open('authOverlay');
        } else {
            Meteor.call('bookmarkPost', this._id, function (error, result) {});
        }
    },

    'click .js-remove-bookmark': function (event) {
        event.preventDefault();

        Meteor.call('unbookmarkPost', this._id);
    },

    'click .js-show-order': function (event) {
        event.stopPropagation();
        Template.postDetails.setTab('order')
    },

    'click .js-show-comment': function (event) {
        event.stopPropagation();
        Template.postDetails.setTab('comment')
    },

    'click .js-uncollapse': function () {
        Template.postDetails.setTab('recipe')
    },

    'click .js-share': function () {
        Overlay.open('shareOverlay', this);
    }
});
