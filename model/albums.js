Albums = new Mongo.Collection('albums');

Albums.allow({
    insert: function (userId) {
        return userId != null;
    },
    update: function (userId, album) {
        return userId != null && album.owner == userId;
    },
    remove: function (userId, album) {
        return userId != null && album.owner == userId;
    }
});