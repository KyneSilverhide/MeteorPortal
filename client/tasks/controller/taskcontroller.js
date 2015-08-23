'use strict';

angular.module('MeteorPortalApp').controller('TasksCtrl', ['$scope', '$meteor', '$rootScope',
    function ($scope, $meteor, $rootScope) {

        $scope.page = 1;
        $scope.perPage = 5;
        $scope.sort = {name: 1};
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
                $scope.tasksCount = $meteor.object(Counts, 'numberOfTasks', false);
            });
        });

        $scope.save = function () {
            if ($rootScope.currentUser) {
                $scope.newTask.owner = $rootScope.currentUser._id;
                $scope.newTask.done = false;
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
                $meteor.call('clearCompleted', $rootScope.currentUser._id)
            }
        };

        $scope.$watch('orderProperty', function () {
            if ($scope.orderProperty) {
                $scope.sort = {name: parseInt($scope.orderProperty)};
            }
        });
    }]);
