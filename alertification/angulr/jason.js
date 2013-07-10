angular.module('Graphite', ['ngResource']).controller('GraphiteCtrl', function ($scope, $http) {
    var url = 'http://graphite.hcpprod.com/render?format=json&target=stats.gauges.WEBP02.cpu.1.Avg&from=-10min';
    $scope.doSearch = function() {
        $http.get(url)
            .success(function(data) {
                console.log(data[0].datapoints);
                $scope.graphiteResult = data[0];
                $scope.daFunk = "We got da funk!";
            });
    };
});

$(function(){
    $("select").multiselect();
});
