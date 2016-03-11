Template.activity.onRendered(function() {
  var self = this;

  // If the activity is in a list, scroll it into view. Note, we can't just use
  // element.scrollIntoView() because it attempts to scroll in the X direction
  // messing up our animations
  if (Router.current().params.activityId === self.data._id) {
    var $activity = $(self.firstNode);
    var top = $activity.offset().top;
    var $parent = $(self.firstNode).closest('.content-scrollable');
    var parentTop = $parent.offset().top;
    $parent.scrollTop(top - parentTop);
  }
});

Template.activity.helpers({
  userName: function() {
    return this.userName;
  },
  postTitle: function() {
    return Posts.find().title;
  },
  path: function() {
    return Router.path('post', { id: this.postId },
      { query: { activityId: this._id } })
  }
})
