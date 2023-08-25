Clients = new Mongo.Collection('clients');

Clients.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

Clients.userCanInsert = function (/* userId, doc */) {
    return true;
};
Clients.userCanUpdate = function (/* userId, doc */) {
    return true;
};
Clients.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    Clients.allow({
        insert(userId, doc) {
            return Clients.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return Clients.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return Clients.userCanRemove(userId, doc);
        },
    });
    Clients.before.insert((userId, doc) => {});
    Clients.before.update((userId, doc, fieldNames, modifier, options) => {});
    Clients.before.remove((userId, doc) => { });
    Clients.after.insert((userId, doc) => { });
    Clients.after.update((userId, doc, fieldNames, modifier, options) => { });
    Clients.after.remove((userId, doc) => { });
    Clients.before.upsert(function (userId, selector, modifier, options) { });
}

// ClientsSchema = new SimpleSchema({

// });

// Clients.attachSchema(ClientsSchema);