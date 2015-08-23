'use strict';

angular.module('MeteorPortalApp')

    .config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    }]).run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log("Route error : " + error);
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
        });
    }]);

angular.module('MeteorPortalApp')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'client/main/views/main.ng.html',
                resolve: {
                    "currentUser": ["$meteor", function ($meteor) {
                        return $meteor.requireUser();
                    }]
                }
            })
            .state('tasks', {
                url: '/tasks',
                templateUrl: 'client/tasks/views/tasks.ng.html',
                controller: 'TasksCtrl',
                resolve: {
                    "currentUser": ["$meteor", function ($meteor) {
                        return $meteor.requireUser();
                    }]
                }
            })
            .state('gallery', {
                url: '/gallery',
                templateUrl: 'client/gallery/views/gallery.ng.html',
                controller: 'GalleryController',
                resolve: {
                    "currentUser": ["$meteor", function ($meteor) {
                        return $meteor.requireUser();
                    }]
                }
            })
            .state('album', {
                url: '/album/:id',
                templateUrl: 'client/gallery/views/album.ng.html',
                controller: 'AlbumController',
                resolve: {
                    "currentUser": ["$meteor", function ($meteor) {
                        return $meteor.requireUser();
                    }]
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'client/users/views/login.ng.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'client/users/views/register.ng.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rc'
            })
            .state('logout', {
                url: '/logout',
                resolve: {
                    "logout": ['$meteor', '$state', function ($meteor, $state) {
                        return $meteor.logout().then(function () {
                            $state.go('login');
                        }, function (err) {
                            console.log('logout error - ', err);
                        });
                    }]
                }
            });
    }]);
