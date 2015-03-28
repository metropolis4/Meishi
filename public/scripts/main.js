(function(){
var meishi = angular.module('meishi', ['ngResource']);
meishi.factory('User', function($resource){
    var model = $resource('/getProfile', {}, {
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
    console.log("FROM ANGULAR::: ", User.model.query(function(user){
        _.map(user, function(val){
            return val;
        });
    }));
    $scope.userInfo = User.items;
}]);
})();