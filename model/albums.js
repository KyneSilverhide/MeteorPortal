Albums = new Mongo.Collection('albums');

if (Meteor.isServer) {
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
}