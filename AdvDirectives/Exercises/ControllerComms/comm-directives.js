(function ( angular ) {
  var mod = angular.module( 'commDirectives', ['employeeServices'] );

  /*
   * The basic elements of a directive called pager are below
   * Fill in the missing portions
   */
  mod.directive( 'pager', function () {
    return {
      restrict   : 'E',
      // Allow this directive to wrap around other html/directives


      /*
       * Write a controller with a registerWidget function
       * registerWidget will take one argument, a child controller
       * Assign the child controller to this
       * directive's controller's childCtrl property
       */


      link : function ( scope, element ) {
        // Get a reference to the current controller
        // (hint: the element may help here)


        element.on( 'click', function ( event ) {
          var target = angular.element( event.target );
          if (target.hasClass('glyphicon-fast-backward')) {
            ctrl.childCtrl.first();
          } else if (target.hasClass('glyphicon-step-backward')) {
            ctrl.childCtrl.previousRecord();
          } else if (target.hasClass('glyphicon-step-forward')) {
            ctrl.childCtrl.nextRecord();
          } else if (target.hasClass('glyphicon-fast-forward')){
            ctrl.childCtrl.last();
          }
          scope.$digest();

        } );

      },

      templateUrl : 'pager-tpl.html'
    }
  } );


  /*
   * The basic elements of a directive called employeeDir are below
   * You will need to fill in a few important parts
   */
  mod.directive( 'employeeDir', function ( employeeDAO ) {
    return {
      restrict   : 'E',

      // Require in the controller from pager
      // (Hint: it's a parent controller, and it's optional)


      scope      : {
        employeeId : '@'
      },
      
      // The controller function, with a little bit of content already in place
      controller : function ( $scope ) {
        var ctrl      = this,
            employees = employeeDAO.getEmployees(),
            empRef = {
              emp : {}
            };

        if ( $scope.employeeId ) {
          empRef.emp = employeeDAO.getEmployee( $scope.employeeId );
        } else {
          empRef.emp = employees[0];
        }

        ctrl.nextRecord = function () {
          empRef.emp = employees[Math.min( employees.length - 1,
            employees.indexOf( empRef.emp ) + 1 )];
        };

        ctrl.previousRecord = function () {
          empRef.emp = employees[Math.max( 0, employees.indexOf( empRef.emp ) - 1 )];
        };

        /*
         * Define four functions:
         * size(): Returns the size of the set of employees
         * first(): Set empRef.emp to the first employee in the set
         * last(): Set empRef.emp to the last employee in the set
         * refresh(): Refresh the dataset
         */


        $scope.empRef = empRef;
        $scope.employees = employees;

      },

      /*
       * Build a link function which does the following
       * if the controller asked for via require, above, is present/defined,
       * use that controller to register this widget's controller
       */


      templateUrl : 'employee-tpl.html'
    }
  } );

  // You're finished. Things should work at this point!

})( angular );