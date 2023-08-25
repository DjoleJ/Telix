Phones = new Mongo.Collection('phones');

Phones.deny({
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

Phones.userCanInsert = function (/* userId, doc */) {
    return true;
};
Phones.userCanUpdate = function (/* userId, doc */) {
    return true;
};
Phones.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    Phones.allow({
        insert(userId, doc) {
            return Phones.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return Phones.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return Phones.userCanRemove(userId, doc);
        },
    });
    Phones.before.insert((userId, doc) => {});
    Phones.before.update((userId, doc, fieldNames, modifier, options) => {});
    Phones.before.remove((userId, doc) => { });
    Phones.after.insert((userId, doc) => { });
    Phones.after.update((userId, doc, fieldNames, modifier, options) => { });
    Phones.after.remove((userId, doc) => { });
    Phones.before.upsert(function (userId, selector, modifier, options) { });
}

// PhonesSchema = new SimpleSchema({

// });

// Phones.attachSchema(PhonesSchema);