Articles = new Mongo.Collection('articles');

Articles.deny({
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

Articles.userCanInsert = function (/* userId, doc */) {
    return true;
};
Articles.userCanUpdate = function (/* userId, doc */) {
    return true;
};
Articles.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    Articles.allow({
        insert(userId, doc) {
            return Articles.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return Articles.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return Articles.userCanRemove(userId, doc);
        },
    });
    Articles.before.insert((userId, doc) => {});
    Articles.before.update((userId, doc, fieldNames, modifier, options) => {});
    Articles.before.remove((userId, doc) => { });
    Articles.after.insert((userId, doc) => { });
    Articles.after.update((userId, doc, fieldNames, modifier, options) => { });
    Articles.after.remove((userId, doc) => { });
    Articles.before.upsert(function (userId, selector, modifier, options) { });
}

// ArticlesSchema = new SimpleSchema({

// });

// Articles.attachSchema(ArticlesSchema);