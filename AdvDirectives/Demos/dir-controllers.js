(function ( angular ) {
  var mod = angular.module( 'tabsDemo', [] );

  mod.directive( 'tabContainer', function () {
    return {
      restrict   : 'E',
      transclude : true,
      scope      : {},
      controller : function ( $scope ) {
        var panes = $scope.panes = [];
        $scope.select = function ( pane ) {
          panes.forEach( function ( pane ) {
            pane.selected = false;
          } );
          pane.selected = true;
        };

        this.addPane = function ( pane ) {
          if ( panes.length === 0 ) {
            $scope.select( pane );
          }

          panes.push( pane );
        };
      },

      templateUrl : 'tab-container-tpl.html'
    };
  } );

  mod.directive( 'tabPane', function () {
    return {
      require     : '^^tabContainer',
      restrict    : 'E',
      transclude  : true,
      scope       : {
        title : '@'
      },
      link        : function ( scope, element, attrs, tabsCtrl ) {
        tabsCtrl.addPane( scope );
      },
      templateUrl : 'tab-pane-tpl.html'
    };
  } )
})( angular );