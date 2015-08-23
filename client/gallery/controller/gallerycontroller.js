'use strict';

angular.module('MeteorPortalApp').controller('GalleryController', ['$scope', '$meteor', '$rootScope', '$mdDialog', '$state',
    function ($scope, $meteor, $rootScope, $mdDialog, $state) {

        $scope.$meteorSubscribe('albums');

        $scope.albums = $meteor.collection(function () {
            return Albums.find({});
        });

        $scope.newAlbum = {private: false};

        $scope.save = function () {
            if ($rootScope.currentUser) {
                $scope.newAlbum.owner = $rootScope.currentUser._id;
                console.log("Adding album " + angular.toJson($scope.newAlbum));
                $scope.albums.save($scope.newAlbum);
                $scope.newAlbum = {private: false};
                $scope.closeDialog();
            }
        };

        $scope.remove = function (album) {
            if(album.owner == $rootScope.currentUser._id) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete the album ' + album.name + " ?")
                    .content('This will also remove all pictures in this album')
                    .ok('Yes !')
                    .cancel('Cancel');
                    //.targetEvent(ev);
                $mdDialog.show(confirm).then(function() {
                    $scope.albums.remove(album);
                });
            }
        };

        $scope.openAlbum = function(album) {
            $state.go('album', { id: album._id });
        };

        $scope.showAlbumModal = function () {
            $mdDialog.show({
                controller: 'GalleryController',
                parent: angular.element(document.body),
                templateUrl: 'client/gallery/views/album.modal.ng.html',
                clickOutsideToClose: true
            })
        };

        $scope.closeDialog = function() {
            $scope.newAlbum = {};
            $mdDialog.hide();
        }
    }]);

angular.module('MeteorPortalApp').controller('AlbumController', ['$scope', '$meteor', '$rootScope', '$mdDialog', '$stateParams',
    function ($scope, $meteor, $rootScope, $mdDialog, $stateParams) {

        $scope.$meteorSubscribe('albums');
        $scope.album = $meteor.object(Albums, $stateParams.id);

        $scope.images = $meteor.collectionFS(function() {
            return Images.find(
                {'metadata.albumId' : $stateParams.id}
            );
        }, false).subscribe('images');

        $scope.remove = function (image) {
            $scope.images.remove(image);
        };

        $scope.randomSpan = function (index) {
            if (index % 3 == 2) {
                return 2;
            } else {
                return 1;
            }
        };

        $scope.showUploadModal = function () {
            $mdDialog.show({
                controller: 'UploadController',
                parent: angular.element(document.body),
                templateUrl: 'client/gallery/views/upload.modal.ng.html',
                locals: {album: $scope.album},
                clickOutsideToClose: true
            })
        };

        $scope.showImageModal = function (image) {
            $mdDialog.show({
                controller: 'ImageController',
                parent: angular.element(document.body),
                templateUrl: 'client/gallery/views/image.modal.ng.html',
                locals: {image: image},
                clickOutsideToClose: true
            })
        };
    }]);