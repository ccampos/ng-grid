// Generated by CoffeeScript 1.6.2
(function() {
  var app;

  app = angular.module('app', ['ngGrid']);

  app.controller('MyCtrl', function($scope, $timeout, $http) {
    var pushIt;

    $scope.mySelections = [];
    $scope.myData = [];
    pushIt = function() {
      $scope.myData.push({
        "engine": "Webkit",
        "browser": "Safari 3.0",
        "platform": "OSX.4+",
        "version": 522.1,
        "grade": "A",
        "date": (new Date()).toLocaleString()
      });
      return $timeout(pushIt, 500);
    };
    $scope.filterOptions = {
      filterText: '',
      useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
      pageSizes: [20, 100, 500, 2500],
      pageSize: 20,
      currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {
      var pagedData;

      pagedData = data.slice((page - 1) * pageSize, page * pageSize);
      $scope.myData = pagedData;
      return $scope.totalServerItems = data.length;
    };
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
      var ft;

      if (searchText) {
        ft = searchText.toLowerCase();
        return $http.get('/largeLoad.json').success(function(largeLoad) {
          var data;

          data = largeLoad.filter(function(item) {
            return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
          });
          return $scope.setPagingData(data, page, pageSize);
        });
      } else {
        return $http.get('/largeLoad.json').success(function(largeLoad) {
          return $scope.setPagingData(largeLoad, page, pageSize);
        });
      }
    };
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    $scope.$watch('pagingOptions', function(newVal, oldVal) {
      return $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
      return $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    }, true);
    return $scope.gridOptions = {
      data: 'myData',
      columnDefs: [
        {
          field: 'engine',
          displayName: 'Engine'
        }, {
          field: 'browser',
          displayName: 'Browser'
        }, {
          field: 'platform',
          displayName: 'Platform'
        }, {
          field: 'version',
          displayName: 'Version'
        }, {
          field: 'grade',
          displayName: 'Grade'
        }
      ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  });

}).call(this);
