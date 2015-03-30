(function(){
var meishi = angular.module('meishi', ['ngResource']);
meishi.factory('User', function($resource){
    var model = $resource('/getProfile/:id', {id: '@id'}, {
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
    
    var user = User.items;
    user = user;
    $scope.greeting = "Hello";
    $http.get('https://api.linkedin.com/v1/people/~?format=json')
            .success(function(data, status, headers, config){
                $scope.user2 = data;
            })
            .error(function(data, status, headers, config){
                $scope.user2 = status;
            });
    console.log("FROM ANGULAR::: ", user, "TRY AGAIN??? ", User.model.get({}));
    $scope.userInfo = user;
}]);
})();