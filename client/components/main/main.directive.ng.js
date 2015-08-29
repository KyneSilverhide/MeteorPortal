'use strict';

angular.module('MeteorPortalApp')
    .directive('mainContent', function () {
        return {
            restrict: 'AE',
            templateUrl: 'client/components/main/main.view.ng.html',
            replace: true,
            controller: function ($scope, $mdMedia) {
                $scope.$mdMedia = $mdMedia;
            }
        };
    });