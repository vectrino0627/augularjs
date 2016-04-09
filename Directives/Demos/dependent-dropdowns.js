(function(angular) {
  var mod = angular.module( 'dirApp', [] );

  var makesModels = {
    'Ford'   : ['F-150', 'Mustang', 'Explorer'],
    'Honda'  : ['Civic', 'Accord', 'CR-V'],
    'Toyota' : ['Celica', 'Camry', 'Corolla'],
    'Chevy'  : ['Volt', 'Malibu', 'Suburban']
  };

  mod.directive('selectLink', function($log) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $log.log( 'Scope: ', scope );
        $log.log( 'Element: ', element );
        $log.log( 'Attrs: ', attrs );

        scope.$watch(attrs.selectLink, function(newValue, oldValue) {
          $log.log( 'Changed! OldVal: %s NewVal: %s', oldValue, newValue );
          if (newValue) {
            $log.log( 'The new makes array should be ', makesModels[newValue] );
            var optionsList = '';
            makesModels[newValue].forEach(function(model) {
              optionsList += '<option>' + model + '</option>';
            });
            element.html( optionsList );
          }
        })
      }
    }
  });

  mod.directive('steveLink', function($log) {
    return {
      restrict: 'E',
      template: '<select ng-options="model for model in models"></select>',
      link: function(scope, element, attrs) {
        $log.log( 'Scope: ', scope );
        $log.log( 'Element: ', element );
        $log.log( 'Attrs: ', attrs );

        scope.$watch(attrs.watch, function(newValue, oldValue) {
          $log.log( 'Changed! OldVal: %s NewVal: %s', oldValue, newValue );
          if (newValue) {
            $log.log( 'The new makes array should be ', makesModels[newValue] );
            scope.models = makesModels[newValue];
          }
        })
      }
    }
  });


  mod.directive('ourHello', function() {
    return {
      template: '<p>Hello, {{ firstName }} {{lastName}}!</p>',
      restrict: 'EA',
      scope: {
        firstName: '=',
        lastName: '@'
      }
    }
  });

  mod.controller('MainCtrl', function($scope, $log) {
    $scope.firstName = 'John';
    $scope.otherName = 'Glory';
  })

})(angular);