(function ( angular ) {
  var mod = angular.module( 'menuApp', [] );

  /*
   * Write a directive, acMenu, which does the following:
   * - Defines a list 'submenus' which consists of unordered lists under list items
   * - Adds the classes 'hidden' and 'sublist' to any submenus
   * - Adds the HTML on the next line _before_ each submenu
   *   <span class="glyphicon glyphicon-menu-down glyphicon-small"></span>
   * - When you click on any top-level list item that has a submenu:
   *     o Remove the class 'hidden' from this list item's submenu
   *     o Ensure that the class 'hidden' is on any sibling submenus
   *
   * You will want to look at the jQuery APIs for a number of functions
   * http://api.jquery.com/
   * You may want to pay particular attention to
   * http://api.jquery.com/children
   * http://api.jquery.com/siblings
   * http://api.jquery.com/find
   * http://api.jquery.com/addClass
   * http://api.jquery.com/toggleClass
   * http://api.jquery.com/before
   * http://api.jquery.com/on
   *
   */
    mod.directive("acMenu", function(){

        return {
            //templateUrl : 'partials/trans-tag-tpl.html',
               // restrict    : 'E',
            transclude  : true,
            scope       : {
            personName  : '@',
                otherPerson : '@personName'}
        }
    } );

    mod.controller( 'DirCtrl', ['$scope',
        function ( $scope, $log ) {
            $log.log( 'This controller doesn\'t do very much at the moment.' );
            $scope.otherPerson = 'Bob';
        }] );


})( angular );