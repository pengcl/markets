Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/login', {
    name: 'login'
});

Router.route('/register', {
    name: 'register'
});

Router.route('/', {
    name: 'postsList'
});

Router.route('/posts/:_id', {
    name: 'postDetails',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.onBeforeAction('dataNotFound', {only: 'postDetails'});
