(function(){
var meishi = angular.module('meishi', ['ngResource']);
meishi.factory('User', function($resource){
    var model = $resource('/getProfile/:id', {id: '@_id'}, {
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
    console.log("FROM ANGULAR::: ", user, "TRY AGAIN??? ", User.model.get({}));
    $scope.userInfo = user;
}]);
})();