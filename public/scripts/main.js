(function(){
var meishi = angular.module('meishi', ['ngResource']);
meishi.factory('User', function($resource){
    var model = $resource('/getProfile/:access_token', {access_token: '@access_token'}, {
        update: {
            method: 'PUT',
        }
    });
    return {
        model: model,
        items: model.query()
    };
});
meishi.controller('mainController', ['$scope', '$http' , 'User', function($scope, $http, User){
    
    var user = User.model.get({});
    user = user;
    $http.get('https://api.linkedin.com/v1/people/~?format=json')
            .success(function(data, status, headers, config){
                $scope.user2 = data;
            })
            .error(function(data, status, headers, config){
                $scope.user2 = status;
            });
    console.log("FROM ANGULAR::: ", user, "TRY AGAIN??? ", User.items, "AND AGAIN??? ", user2);
    $scope.userInfo = user;
}]);
})();