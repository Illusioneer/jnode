angular.module('project', ['mongolab']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:ListCtrl, templateUrl:'list.html'}).
            when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
            when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
            otherwise({redirectTo:'/'});
    }).config(function($httpProvider){
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

function ListCtrl($scope, Project, $http) {
    $scope.projects = Project.query();
    var url = "http://graphite.hcpprod.com/render?format=json&target=stats.gauges.WEBP02.cpu.1.Avg&from=-60min";
    $http.get(url).success(function(data) {
        console.log(data);
    });
}

function CreateCtrl($scope, $location, Project) {
    $scope.save = function() {
        Project.save($scope.project, function(project) {
            $location.path('/edit/' + project._id.$oid);
        });
    }
}

function EditCtrl($scope, $location, $routeParams, Project) {
    var self = this;

    Project.get({id: $routeParams.projectId}, function(project) {
        self.original = project;
        $scope.project = new Project(self.original);
    });

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.project);
    }

    $scope.destroy = function() {
        self.original.destroy(function() {
            $location.path('/list');
        });
    };

    $scope.save = function() {
        $scope.project.update(function() {
            $location.path('/');
        });
    };
}

angular.module('mongolab', ['ngResource']).
    factory('Project', function($resource) {
        var Project = $resource('https://api.mongolab.com/api/1/databases' +
            '/angularjs/collections/projects/:id',
            { apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
                update: { method: 'PUT' }
            }
        );
        console.log(Project());

        Project.prototype.update = function(cb) {
            return Project.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        Project.prototype.destroy = function(cb) {
            return Project.remove({id: this._id.$oid}, cb);
        };

        return Project;
    });