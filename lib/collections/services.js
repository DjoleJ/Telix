Services = new Mongo.Collection('services');

Services.deny({
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

Services.userCanInsert = function (/* userId, doc */) {
    return true;
};
Services.userCanUpdate = function (/* userId, doc */) {
    return true;
};
Services.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    Services.allow({
        insert(userId, doc) {
            return Services.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return Services.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return Services.userCanRemove(userId, doc);
        },
    });
    Services.before.insert((userId, doc) => {});
    Services.before.update((userId, doc, fieldNames, modifier, options) => {});
    Services.before.remove((userId, doc) => { });
    Services.after.insert((userId, doc) => { });
    Services.after.update((userId, doc, fieldNames, modifier, options) => { });
    Services.after.remove((userId, doc) => { });
    Services.before.upsert(function (userId, selector, modifier, options) { });
}

// ServicesSchema = new SimpleSchema({

// });

// Services.attachSchema(ServicesSchema);