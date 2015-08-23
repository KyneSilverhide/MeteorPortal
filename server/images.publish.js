Meteor.publish('images', function (albumId, options) {

    return Images.find({
        'metadata.albumId': albumId
    }, options);
});
