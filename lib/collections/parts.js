Parts = new Mongo.Collection('parts');

Parts.deny({
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

Parts.userCanInsert = function (/* userId, doc */) {
    return true;
};
Parts.userCanUpdate = function (/* userId, doc */) {
    return true;
};
Parts.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    Parts.allow({
        insert(userId, doc) {
            return Parts.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return Parts.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return Parts.userCanRemove(userId, doc);
        },
    });
    Parts.before.insert((userId, doc) => {});
    Parts.before.update((userId, doc, fieldNames, modifier, options) => {});
    Parts.before.remove((userId, doc) => { });
    Parts.after.insert((userId, doc) => { });
    Parts.after.update((userId, doc, fieldNames, modifier, options) => { });
    Parts.after.remove((userId, doc) => { });
    Parts.before.upsert(function (userId, selector, modifier, options) { });
}

// PartsSchema = new SimpleSchema({

// });

// Parts.attachSchema(PartsSchema);