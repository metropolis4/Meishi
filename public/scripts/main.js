(function(){
var meishi = angular.module('meishi', ['ngResource']);
meishi.factory('User', function($resource){
    var model = $resource('/oauth/:id', {id: '@id'}, {
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
    console.log("FROM ANGULAR::: ", User.items);
}]);
})();