PartSales = new Mongo.Collection('partSales');

PartSales.deny({
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

PartSales.userCanInsert = function (/* userId, doc */) {
    return true;
};
PartSales.userCanUpdate = function (/* userId, doc */) {
    return true;
};
PartSales.userCanRemove = function (/* userId, doc */) {
    return true;
};

if (Meteor.isServer) {
    PartSales.allow({
        insert(userId, doc) {
            return PartSales.userCanInsert(userId, doc);
        },
        update(userId, doc, fields, modifier) {
            return PartSales.userCanUpdate(userId, doc);
        },
        remove(userId, doc) {
            return PartSales.userCanRemove(userId, doc);
        },
    });
    PartSales.before.insert((userId, doc) => {});
    PartSales.before.update((userId, doc, fieldNames, modifier, options) => {});
    PartSales.before.remove((userId, doc) => { });
    PartSales.after.insert((userId, doc) => { });
    PartSales.after.update((userId, doc, fieldNames, modifier, options) => { });
    PartSales.after.remove((userId, doc) => { });
    PartSales.before.upsert(function (userId, selector, modifier, options) { });
}

// PartSalesSchema = new SimpleSchema({

// });

// PartSales.attachSchema(PartSalesSchema);