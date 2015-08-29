Images = new FS.Collection("images", {
    stores: [
        new FS.Store.GridFS("thumbnail", {
            transformWrite: function(fileObj, readStream, writeStream) {
                gm(readStream, fileObj.name()).resize('400', '400', '!').stream().pipe(writeStream);
                gm(readStream, fileObj.name()).autoOrient().resize(400, 400 + '^').gravity('Center').extent(400, 400).stream().pipe(writeStream);

            }
        }),
        new FS.Store.GridFS("original")
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

if (Meteor.isServer) {
    Images.allow({
        insert: function (userId) {
            return (userId ? true : false);
        },
        remove: function (userId) {
            return (userId ? true : false);
        },
        download: function () {
            return true;
        },
        update: function (userId) {
            return (userId ? true : false);
        }
    });

    Meteor.methods({
        removeAllImages: function (albumId) {
            console.log("DELETING " + albumId);
            check(albumId, String);
            Images.remove({'metadata.albumId': albumId});
        }
    });

}