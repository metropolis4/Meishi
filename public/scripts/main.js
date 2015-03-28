(function(){
var meishi = angular.module('meishi', ['ngResource']);
meishi.factory('User', function($resource){
    var model = $resource('/getProfile/:token', {token: '@access_token'}, {
        update: {
            method: 'PUT',
        }
    });
    return {
        model: model,
        items: model.query()
    };
});
meishi.controller('mainController', ['$scope', 'User', function($scope, User){
    
    var user = User.model.get({});
    user = user;
    console.log("FROM ANGULAR::: ", user, "TRY AGAIN??? ", User.items);
    $scope.userInfo = user;
}]);
})();