angular.module('Graphite', ['ngResource']).config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

function GraphiteCtrl($scope, $resource) {
    $scope.graphite = $resource('http://mcp.hcpprod.com:3000/posts?host_name=localhost');

$scope.doSearch = function () {
    $scope.graphiteResult = $scope.graphite.get();
};
}

define('DB_NAME', 'hc_genie');

/** MySQL database username */
define('DB_USER', 'hc_genie_user');

/** MySQL database password */
define('DB_PASSWORD', '1tzM@jickZ!');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('WP_DEBUG', false);
