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
    Meteor.subscribe('bookmarkCounts');
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

Router.route('/bookmarks', {
    name: 'bookmarks'
});

Router.route('/wxApi', {
    name: 'wxApi',
    data: function () {
        return AccessToken.find();
    }
});

WxApiController = RouteController.extend({
    action: function () {
        this.state.set('signature', this.params.query.signature);
        this.state.set('timestamp', this.params.query.timestamp);
        this.state.set('nonce', this.params.query.nonce);
        this.state.set('echostr', this.params.query.echostr);

        this.render();
    }
});

Router.route('/posts/:_id', {
    name: 'postDetails',
    data: function () {
        Session.set("postId",this.params._id);
        return Posts.findOne(this.params._id);
    }
});

Router.route('/postAdd', {
    name: 'postAdd'
});

Router.route('/getWxUser', {
    name: 'getWxUser'
});

Router.route('/wxLogin', {
    name: 'wxLogin'
});

GetWxUserController = RouteController.extend({
    action: function () {
        this.state.set('wx_code', this.params.query.code);
        this.state.set('wx_scope', this.params.query.state);

        this.render();
    }
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
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            //this.render('authOverlay');
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
    only: ['postAdd', 'bookmarks']
});
