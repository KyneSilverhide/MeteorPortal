Tasks = new Mongo.Collection('tasks');

Tasks.allow({
    insert: function (userId, task) {
        return userId != null;
    },
    update: function (userId, task, fields, modifier) {
        return userId != null;
    },
    remove: function (userId, task) {
        return userId != null;
    }
});

if (Meteor.isServer) {
    Meteor.methods({
        clearCompleted: function (userId) {
            check(userId, String);
            Tasks.remove({owner: userId, done: true});
        }
    });
}
