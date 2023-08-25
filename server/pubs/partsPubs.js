Meteor.publish('parts', function(channel) {
    return Parts.find({}, { sort: { komada: -1 } });
});