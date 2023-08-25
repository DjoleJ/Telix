ArticlesTwo = new Mongo.Collection('articlesTwo');

ArticlesTwo.deny({
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

ArticlesTwo.userCanInsert = function (/* userId, doc */) {
    return true;
};
ArticlesTwo.userCanUpdate = function (/* userId, doc */) {
    return true;
};
ArticlesTwo.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    ArticlesTwo.allow({
        insert(userId, doc) {
            return ArticlesTwo.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return ArticlesTwo.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return ArticlesTwo.userCanRemove(userId, doc);
        },
    });
    ArticlesTwo.before.insert((userId, doc) => {});
    ArticlesTwo.before.update((userId, doc, fieldNames, modifier, options) => {});
    ArticlesTwo.before.remove((userId, doc) => { });
    ArticlesTwo.after.insert((userId, doc) => { });
    ArticlesTwo.after.update((userId, doc, fieldNames, modifier, options) => { });
    ArticlesTwo.after.remove((userId, doc) => { });
    ArticlesTwo.before.upsert(function (userId, selector, modifier, options) { });
}

// ArticlesTwoSchema = new SimpleSchema({

// });

// ArticlesTwo.attachSchema(ArticlesTwoSchema);