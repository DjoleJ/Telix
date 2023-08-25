ArticleSales = new Mongo.Collection('articleSales');

ArticleSales.deny({
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

ArticleSales.userCanInsert = function (/* userId, doc */) {
    return true;
};
ArticleSales.userCanUpdate = function (/* userId, doc */) {
    return true;
};
ArticleSales.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    ArticleSales.allow({
        insert(userId, doc) {
            return ArticleSales.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return ArticleSales.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return ArticleSales.userCanRemove(userId, doc);
        },
    });
    ArticleSales.before.insert((userId, doc) => {});
    ArticleSales.before.update((userId, doc, fieldNames, modifier, options) => {});
    ArticleSales.before.remove((userId, doc) => { });
    ArticleSales.after.insert((userId, doc) => { });
    ArticleSales.after.update((userId, doc, fieldNames, modifier, options) => { });
    ArticleSales.after.remove((userId, doc) => { });
    ArticleSales.before.upsert(function (userId, selector, modifier, options) { });
}

// ArticleSalesSchema = new SimpleSchema({

// });

// ArticleSales.attachSchema(ArticleSalesSchema);