var apiUrl = "http://ec2-52-29-87-189.eu-central-1.compute.amazonaws.com/app_dev.php/feed";
var saveForLaterUrl = "http://ec2-52-29-87-189.eu-central-1.compute.amazonaws.com/app_dev.php/saveForLater";
var mockApiUrl = "http://private-fa233-ttsfeedlybff.apiary-mock.com/feed";

angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	
	// Form data for the login modal
	$scope.loginData = {};
	
	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
	scope: $scope
	}).then(function(modal) {
	$scope.modal = modal;
	});
	
	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
	$scope.modal.hide();
	};
	
	// Open the login modal
	$scope.login = function() {
	$scope.modal.show();
	};
	
	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
	console.log('Doing login', $scope.loginData);
	
	// Simulate a login delay. Remove this and replace with your login
	// code if using a login system
	$timeout(function() {
	  $scope.closeLogin();
	}, 1000);
	};

})
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('JSONCtrl', function($scope, $http,$httpParamSerializer) {
  $http.get(apiUrl).then(function (response) {
      $scope.items = response.data.items;
      $scope.activeItem = $scope.items[0];
  });
  
  	$scope.isPlaying = false;
  	$scope.index = 0;
			
	$scope.speakText = function(text) {
		concatedText = text.title;
		if (text.summary !== undefined && text.summary.content !== undefined) {
			concatedText = concatedText + text.summary.content;
		}
	TTS.speak({
	       text: concatedText,
	       locale: text.locale,
	       rate: 0.9
	   }, function () {
		   if ($scope.isPlaying == true) {
	       	$scope.index++;
	       	$scope.activeItem = angular.copy($scope.items[$scope.index]);
	       	$scope.$apply();
	       	setTimeout(function(){$scope.speakText($scope.activeItem);}, 1000);
	       }
	   }, function (reason) {
	       // Handle the error case
	   });
	};
			
	$scope.togglePlay = function (text) {
		$scope.isPlaying = !$scope.isPlaying;
		if ($scope.isPlaying == true) {
			$scope.speakText(text);
		} else {
			$scope.speakText({title: "", summary: {content: " "}});
		}
	};
	
	$scope.saveForLater = function (item) {

      	
      	var data = [item.id];
	  	var objectToSerialize={'itemIds':data};

	  	$http({
        	url: saveForLaterUrl,
			method: "POST",
			data: objectToSerialize,
    	})
    	.success(function(data){
    	});
	  }
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});


