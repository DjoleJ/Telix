Meteor.publish('clients', function(channel) {
    return Clients.find({ visible: true }, { sort: { imeiPrezime: 1 } });
});