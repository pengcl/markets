var TAB_KEY = 'detailsShowTab';

Template.postDetails.onCreated(function () {
    if (Router.current().params.postId)
        Template.postDetails.setTab('feed');
    else
        Template.postDetails.setTab('recipe');
});

Template.postDetails.onRendered(function () {
    this.$('.recipe').touchwipe({
        wipeDown: function () {
            if (Session.equals(TAB_KEY, 'recipe'))
                Template.postDetails.setTab('make')
        },
        preventDefaultEvents: false
    });
    this.$('.attribution-recipe').touchwipe({
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
    var lastTab = Session.get(TAB_KEY);
    Session.set(TAB_KEY, tab);

    var fromRecipe = (lastTab === 'recipe') && (tab !== 'recipe');
    $('.feed-scrollable').toggleClass('instant', fromRecipe);

    var toRecipe = (lastTab !== 'recipe') && (tab === 'recipe');
    $('.feed-scrollable').toggleClass('delayed', toRecipe);
}

Template.postDetails.helpers({
    isOwen:function(){
        return this.userId === Meteor.userId();
    },
    isActiveTab: function (name) {
        return Session.equals(TAB_KEY, name);
    },
    activeTabClass: function () {
        return Session.get(TAB_KEY);
    },
    bookmarked: function () {
        return Meteor.user() && _.include(Meteor.user().bookmarkedRecipeNames, this.name);
    },
    activities: function () {
        return Activities.find({
            recipeName: this.name
        }, {
            sort: {
                date: -1
            }
        });
    }
});

Template.postDetails.events({
    'click .js-add-bookmark': function (event) {
        event.preventDefault();

        if (!Meteor.userId())
            return Overlay.open('authOverlay');

        Meteor.call('bookmarkRecipe', this.name);
    },

    'click .js-remove-bookmark': function (event) {
        event.preventDefault();

        Meteor.call('unbookmarkRecipe', this.name);
    },

    'click .js-edit': function () {
        event.preventDefault();
        if (!Meteor.userId()) {
            return Overlay.open('authOverlay');
        }
        Meteor.call('eidtPost', this._id);
    },

    'click .js-show-recipe': function (event) {
        event.stopPropagation();
        Template.postDetails.setTab('make')
    },

    'click .js-show-feed': function (event) {
        event.stopPropagation();
        Template.postDetails.setTab('feed')
    },

    'click .js-uncollapse': function () {
        Template.postDetails.setTab('recipe')
    },

    'click .js-share': function () {
        Overlay.open('shareOverlay', this);
    }
});
