'use strict';

Meteor.publish('images', function (albumId, options) {

    return Images.find({
        'metadata.albumId': albumId
    }, options);
});

Meteor.methods({
    removeAllImages: function (albumId) {
        check(albumId, String);
        Images.remove({'metadata.albumId': albumId});
    }
});