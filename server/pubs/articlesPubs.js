Meteor.publish('articles', function(channel) {
    return Articles.find({}, {});
});

Meteor.publish('articlesTwo', function(channel) {
    return ArticlesTwo.find({}, {});
});