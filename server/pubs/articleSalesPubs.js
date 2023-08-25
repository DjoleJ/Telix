Meteor.publish('articleSales', function(channel) {
    return ArticleSales.find({}, {});
});

Meteor.publish('articleSalesTwo', function(channel) {
    return ArticleSalesTwo.find({}, {});
});