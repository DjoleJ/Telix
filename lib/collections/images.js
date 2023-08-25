// FS.debug = true;

Images = new FS.Collection('images', {
    filter: {
        maxSize: 30000000, // in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png', 'jpg', 'jpeg', 'webp', 'PNG', 'JPG', 'JPEG', 'WEBP']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                Bert.alert(message, 'danger', 'growl-top-right');
            } else {
                console.log(message);
            }
        }
    },
    stores: [
        new FS.Store.GridFS('images', {}),
        // new FS.Store.GridFS('images', { beforeWrite: convert, transformWrite: resizeOriginal }),
        // new FS.Store.GridFS("thumbs", { beforeWrite: convert, transformWrite: createThumb }),
        // new FS.Store.GridFS("thumbsBig", { beforeWrite: convert, transformWrite: createThumbBig })
    ],
});

// Images.on('stored', function(fileObj, storeName) {
//     console.log('stored fileObj:', fileObj)
//     console.log('stored storeName:', storeName)
// })

// Images.on('uploaded', function(fileObj) {
//     console.log('uploaded fileObj:', fileObj)
// })

// Images.on('error', function(error, fileObj) {
//     console.log('error error:', error)
//     console.log('error fileObj:', fileObj)
// })

Images.allow({
    insert: () => true,
    // remove: () => true,
    update: () => true,
    download: () => true,
});

