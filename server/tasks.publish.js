'use strict';

Meteor.publish('tasks', function (options, searchString) {
    searchString = searchString || '';

    Counts.publish(this, 'numberOfTasks', Tasks.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: [
            {owner: this.userId},
            {owner: {$exists: true}}
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
