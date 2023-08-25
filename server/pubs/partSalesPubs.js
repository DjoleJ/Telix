Meteor.publish('partSales', function(channel) {
    return PartSales.find({}, {});
});