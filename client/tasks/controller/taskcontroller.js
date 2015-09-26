'use strict';

angular.module('MeteorPortalApp').controller('TasksCtrl', ['$scope', '$meteor', '$rootScope',
    function ($scope, $meteor, $rootScope) {

        $scope.page = 1;
        $scope.perPage = 10;
        $scope.sort = [['done', 1], ['name', 1]];
        $scope.orderProperty = '1';

        $scope.tasks = $meteor.collection(function () {
            return Tasks.find({}, {sort: $scope.getReactively('sort')});
        });

        $meteor.autorun($scope, function () {
            $meteor.subscribe('tasks', {
                limit: parseInt($scope.getReactively('perPage')),
                skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
                sort: $scope.getReactively('sort')
            }, $scope.getReactively('search')).then(function () {
                $scope.matchingTasksCount = $meteor.object(Counts, 'matchingTasks', false);
            });
        });

        $scope.totalTasksCount = $meteor.object(Counts, 'totalTasks', false);
        $scope.completedTasksCount = $meteor.object(Counts, 'completedTasks', false);

        $scope.save = function () {
            if ($rootScope.currentUser) {
                $scope.newTask.owner = $rootScope.currentUser._id;
                $scope.newTask.done = false;
                $scope.newTask.createdAt = new Date();
                console.log("Adding task " + angular.toJson($scope.newTask));
                $scope.tasks.save($scope.newTask);
                $scope.newTask = {};
            }
        };

        $scope.remove = function (task) {
            $scope.tasks.remove(task);
        };

        $scope.pageChanged = function (newPage) {
            $scope.page = newPage;
        };

        $scope.clearCompleted = function () {
            console.log("Clear completed tasks");
            if ($rootScope.currentUser) {
                $meteor.call('clearCompleted', $rootScope.currentUser._id);
            }
        };

        $scope.$watch('orderProperty', function () {
            if ($scope.orderProperty) {
                $scope.sort = [['done', 1], ['name', parseInt($scope.orderProperty)]];
            }
        });
    }]);
