dataReadyHold = null;

Router.configure({
    layoutTemplate: 'appBody',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return [Meteor.subscribe('posts'), Meteor.subscribe('activities')];
    }
});

if (Meteor.isClient) {
    // Keep showing the launch screen on mobile devices until we have loaded
    // the app's data
    //Meteor.subscribe('activities');
    dataReadyHold = LaunchScreen.hold();
}

HomeController = RouteController.extend({
    onBeforeAction: function () {
        Meteor.subscribe('latestActivity', function () {
            dataReadyHold.release();
        });
    }
});

Router.route('/icons', {
    name: 'icons'
});

Router.route('/login', {
    name: 'login'
});

Router.route('/register', {
    name: 'register'
});

Router.route('/settings', {
    name: 'settings'
});

Router.route('/', {
    name: 'postsList'
});

Router.route('/posts/:_id', {
    name: 'postDetails',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/postAdd', {
    name: 'postAdd'
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('post', {
    path: '/posts/:id'
});

var requireLogin = function () {
    if (!Meteor.user()) { //检测用户是否存在
        if (Meteor.loggingIn()) { //登陆中...(true)
            this.render(this.loadingTemplate);
        } else {
            Overlay.open('authOverlay');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {
    only: 'postDetails'
});

Router.onBeforeAction(requireLogin, {
    only: 'postAdd'
});
