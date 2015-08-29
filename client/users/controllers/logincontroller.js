angular.module("MeteorPortalApp").controller("LoginCtrl", ['$meteor', '$state', '$scope', '$stateParams',
    function ($meteor, $state, $scope, $stateParams) {

        console.log("PARAMS : " + angular.toJson($stateParams));
        $scope.credentials = {
            email: $stateParams.email || '',
            password: $stateParams.password || ''
        };

        $scope.error = '';

        $scope.login = function () {
            $meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password).then(
                function () {
                    $state.go('main');
                },
                function (err) {
                    $scope.error = 'Login error - ' + err;
                }
            );
        };

        $scope.register = function () {
            $meteor.createUser($scope.credentials).then(
                function () {
                    $state.go('main');
                },
                function (err) {
                    $scope.error = 'Registration error - ' + err;
                }
            );
        };
    }
]);