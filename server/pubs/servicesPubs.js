Meteor.publish('services', function(channel) {
    return Services.find({ visible: true }, { sort: { datum: -1 } });
});