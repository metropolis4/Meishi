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
    
    var user = User.items;
    user = _.map(user, function(val){
        return val;
    });
    console.log("FROM ANGULAR::: ", user);
    $scope.userInfo = user;
}]);
})();