'use strict';

angular.module('MeteorPortalApp')
    .directive('toolbar', function () {
        return {
            restrict: 'AE',
            templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
            replace: true,
            controller: function ($rootScope, $mdDialog) {
                $rootScope.prettyuser = function () {
                    if ($rootScope.currentUser) {
                        return $rootScope.currentUser.emails[0].address;
                    } else {
                        return "";
                    }
                }
            }
        };
    });

angular.module('MeteorPortalApp')
    .directive('content', function () {
        return {
            restrict: 'AE',
            templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
            replace: true,
            controller: function ($rootScope, $mdDialog) {
                $rootScope.prettyuser = function () {
                    if ($rootScope.currentUser) {
                        return $rootScope.currentUser.emails[0].address;
                    } else {
                        return "";
                    }
                }
            }
        };
    });