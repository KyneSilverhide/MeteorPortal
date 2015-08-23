Meteor.publish('albums', function (options) {
    return Albums.find({
        $or: [
            {'owner': this.userId},
            {'private': false}
        ]
    }, options);
});