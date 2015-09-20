'use strict';

Meteor.publish('tasks', function (options, searchString) {
    searchString = searchString || '';

    Counts.publish(this, 'matchingTasks', Tasks.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: [
            {owner: this.userId},
            {owner: {$exists: true}}
        ]
    }), {noReady: true});

    Counts.publish(this, 'totalTasks', Tasks.find({
        $and: [
            {owner: this.userId},
            {owner: {$exists: true}}
        ]
    }), {noReady: true});

    Counts.publish(this, 'completedTasks', Tasks.find({
        $and: [
            {owner: this.userId},
            {owner: {$exists: true}},
            {done: true}
        ]
    }), {noReady: true});

    return Tasks.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: [
            {owner: this.userId},
            {owner: {$exists: true}}
        ]
    }, options);
});

Meteor.methods({
    clearCompleted: function (userId) {
        check(userId, String);
        Tasks.remove({owner: userId, done: true});
    }
});