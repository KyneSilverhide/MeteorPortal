Images = new FS.Collection("images", {
    stores: [
        //default path is "/cfs/files" within app container
        new FS.Store.FileSystem("original"),
        new FS.Store.FileSystem("thumbnail", {
            transformWrite: function(fileObj, readStream, writeStream) {
                gm(readStream, fileObj.name()).autoOrient().resize(400, 300 + '^').gravity('Center').extent(400, 300).stream().pipe(writeStream);

            }
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

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