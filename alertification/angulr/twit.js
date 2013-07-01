angular.module('Twitter', ['ngResource']).config(['$httpProvider', function ($http) {
    $http.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.defaults.headers.post.Accept = "*/*";
    $http.defaults.transformRequest.push(function (data,b,c,d){
        var str = '',first=true;
        if(data){
            $.each($.parseJSON(data),function(key){
                if(!first) {str+='&'}
                str += key + '=' + this;
                first=false
            });
            return str;
        }
    });
}]);


function TwitterCtrl($scope, $resource) {
    var url = 'http://ip.jsontest.com/';
    //var url = 'http://graphite.hcpprod.com/render?format=jsonp&target=mcp_hcpprod_com.load.load.midterm&from=-6min';
    $scope.twitter = $resource(url);

    $scope.doSearch = function () {
        $scope.twitterResult = $scope.twitter.get();
    };
}