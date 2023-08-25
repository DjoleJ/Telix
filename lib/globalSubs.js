if (Meteor.isClient) {
    Meteor.subscribe("images", () => { });
    // Meteor.subscribe("pdfs", () => { });
}