'use strict';

angular.module('MeteorPortalApp').controller('ImageController', ['$scope', '$mdDialog', 'image',
    function ($scope, $mdDialog, image) {
        $scope.image = image;

        $scope.privacyStatuses = [
            {value: true, text: 'True'},
            {value: false, text: 'False'}
        ];
        $scope.closeDialog = $mdDialog.hide;

        $scope.updateGallery = function($data, image) {
            image.update({$set: {'metadata.gallery': $data}});
        };

        $scope.updatePrivacy= function($data, image) {
            image.update({$set: {'metadata.private': $data}});
        };
    }]);

angular.module('MeteorPortalApp').controller('UploadController', ['$scope', '$rootScope', '$meteor', '$mdDialog', 'album',
    function ($scope, $rootScope, $meteor, $mdDialog, album) {

        $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

        $scope.album = album;

        $scope.addImages = function (files) {
            $mdDialog.hide();
            for (var i = 0, ln = files.length; i < ln; i++) {
                var fileObj = new FS.File(files[i]);
                fileObj.metadata = {
                    owner: $rootScope.currentUser._id,
                    albumId: $scope.album._id
                };
                $scope.images.save(fileObj);
            }
        };

        $scope.closeDialog = $mdDialog.hide;
    }]);
