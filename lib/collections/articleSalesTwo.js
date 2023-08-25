ArticleSalesTwo = new Mongo.Collection('articleSalesTwo');

ArticleSalesTwo.deny({
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

ArticleSalesTwo.userCanInsert = function (/* userId, doc */) {
    return true;
};
ArticleSalesTwo.userCanUpdate = function (/* userId, doc */) {
    return true;
};
ArticleSalesTwo.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    ArticleSalesTwo.allow({
        insert(userId, doc) {
            return ArticleSalesTwo.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return ArticleSalesTwo.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return ArticleSalesTwo.userCanRemove(userId, doc);
        },
    });
    ArticleSalesTwo.before.insert((userId, doc) => {});
    ArticleSalesTwo.before.update((userId, doc, fieldNames, modifier, options) => {});
    ArticleSalesTwo.before.remove((userId, doc) => { });
    ArticleSalesTwo.after.insert((userId, doc) => { });
    ArticleSalesTwo.after.update((userId, doc, fieldNames, modifier, options) => { });
    ArticleSalesTwo.after.remove((userId, doc) => { });
    ArticleSalesTwo.before.upsert(function (userId, selector, modifier, options) { });
}

// ArticleSalesTwoSchema = new SimpleSchema({

// });

// ArticleSalesTwo.attachSchema(ArticleSalesTwoSchema);