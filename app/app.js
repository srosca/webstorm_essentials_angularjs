angular.module('app.controllers', [])
    .controller('EntriesController', function ($scope, store) {
        $scope.entries = store.entries;
    })
    .controller('EntryController', function ($scope, $routeParams, store) {
        $scope.entry = store.entries[$routeParams.index];
    })
    .controller('NewEntryController', function ($scope, $location, store) {
        $scope.add = function () {
            store.add($scope.entry);
            $location.path('/');
        };
        $scope.clear = function () {
            $scope.entry = {};
        }
    });

angular.module('app.services', [])
    .service('store', function ($http) {
        var store = {
            entries: [],

            add: function (item) {
                this.entries.push(item);
            }
        };

        return store;
    });

angular.module('app.filters', [])
    .filter('summary', function ($filter) {
        return function (item) {
            return item.split(" ").slice(0, 5).join(" ");
        };
    });

angular.module('app', ['ngRoute', 'app.controllers', 'app.services', 'app.filters'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/entries.html',
            controller: 'EntriesController'
        }).when('/entry/:index', {
            templateUrl: 'app/views/entry.html',
            controller: 'EntryController'
        }).when('/new-entry/', {
            templateUrl: 'app/views/new-entry.html',
            controller: 'NewEntryController'
        }).otherwise({
            redirectTo: '/'
        });

    }).run(function ($http, store) {
        $http.get('data/entries.json')
            .success(function (data) {
                store.entries = data;
            });
    });


