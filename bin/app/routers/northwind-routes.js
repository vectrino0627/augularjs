var express     = require( 'express' ),
    _           = require( 'underscore' ),
    Employee    = require( '../models/Employee' ),
    Customer    = require( '../models/Customer' ),
    Product     = require( '../models/Product' ),
    Category    = require( '../models/Category' ),
    Supplier    = require( '../models/Supplier' ),
    Order       = require( '../models/Order' ),
    OrderDetail = require( '../models/OrderDetails' );

function safeSet( model, obj, sFields ) {
  sFields.forEach( function ( field ) {
    if ( obj[field] ) {
      model[field] = obj[field];
    }
  } )
}

function checkQuery( query ) {
  if ( query.emptyAllowed ) {
    return query;
  }

  var keys = Object.keys( query );
  var dupe = _.clone( query );

  keys.forEach( function ( key ) {
    if ( !dupe[key] ) {
      delete dupe[key];
    }

  } );

  return dupe;
}

function genericPost( req, res, ObjType, pkField ) {
  var instance = new ObjType();
  safeSet( instance, req.body, ObjType.getFields() );

  instance.save( function ( err, obj, numberAffected ) {
    if ( err ) {
      res.json( err );
      res.end();
    } else if ( numberAffected ) {
      res.json( {
        message        : ObjType.getType() + ' updated!',
        numberAffected : numberAffected
      } );
    } else {

      res.json( { message : ObjType.getType() + ' created!' } );
    }
  } )
}

function genericPut( req, res, pkField, ObjType ) {
  var searchConfig = {};
  searchConfig[pkField] = req.params.id;

  ObjType.findOne( searchConfig,
    function ( err, instance ) {
      if ( err ) {
        res.send( err );
        res.end();
      } else {
        safeSet( instance, req.body, ObjType.getFields() );
        instance.save( function ( err ) {
          if ( err ) {
            res.send( err );
          }
          res.json( { message : ObjType.getType() + ' #' + instance[pkField] + ' updated' } )
        } )
      }
    } )
}

var nwr = express.Router();

nwr.get( '/', function ( req, res ) {
  res.json( { message : 'Speeding Planet\'s emulation of the Northwind database.' } );
} );

//##############################################################################
//       EMPLOYEES
//##############################################################################

nwr.route( '/employees' )

  .get( function ( req, res ) {

    if ( req.query.firstName ) {
      console.log( 'req.query.firstName: [' + req.query.firstName + ']' );
      req.query.firstName = new RegExp( '^' + req.query.firstName, 'i' );
    }

    if ( req.query.lastName ) {
      console.log( 'req.query.lastName: [' + req.query.lastName + ']' );
      req.query.lastName = new RegExp( '^' + req.query.lastName, 'i' );
    }

    var query = checkQuery( req.query );
    Employee.find( query, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }
      res.json( emps );
    } );
  } )

// create an employee (accessed at POST
// http://localhost:8001/northwind/employees)
  .post( function ( req, res ) {
    genericPost( req, res, Employee, 'employeeID' );
  } );

nwr.route( '/employees/:id' )
  .put( function ( req, res ) {
    genericPut( req, res, 'employeeID', Employee );
  } )
  .get( function ( req, res ) {
    Employee.findOne( { employeeID : req.params.id }, function ( err, emp ) {
      console.log( 'Searching for EmployeeID %d', req.params.id );

      if ( err ) {
        res.send( err );
      }

      res.json( emp );
    } )
  } )
  .delete( function ( req, res ) {
    Employee.remove( {
      employeeID : req.params.id
    }, function ( err ) {
      if ( err ) {
        res.send( err );
      }
      res.json( { message : 'Employee #' + req.params.id + ' deleted' } );
    } )
  } );

nwr.route( '/employees/f/*' )
  .get( function ( req, res ) {

    var fieldsArray = req.params[0].split( '/' ),
        fields      = fieldsArray.join( ' ' );
    Employee.find( req.query, fields, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( emps );
      } else {
        res.json( _.pluck( emps, fields ) );
      }
    } );
  } );
//##############################################################################
//       CUSTOMERS
//##############################################################################

nwr.route( '/customers' )

  .get( function ( req, res ) {
    if ( req.query.companyName ) {
      console.log( 'req.query.companyName: [' + req.query.companyName + ']' );
      req.query.companyName = new RegExp( '^' + req.query.companyName, 'i' );
    }

    if ( req.query.contactName ) {
      console.log( 'req.query.contactName: [' + req.query.contactName + ']' );
      req.query.contactName = new RegExp( '^' + req.query.contactName, 'i' );
    }

    var query = checkQuery( req.query );
    Customer.find( query, function ( err, custs ) {
      if ( err ) {
        res.send( err );
      }
      res.json( custs );
    } );
  } )

  // create an customer (accessed at POST
  // http://localhost:8001/northwind/customers)
  .post( function ( req, res ) {
    genericPost( req, res, Customer );
  } );

nwr.route( '/customers/:id' )
  .put( function ( req, res ) {
    genericPut( req, res, 'customerID', Customer );
  } )
  .get( function ( req, res ) {
    Customer.findOne( { customerID : req.params.id }, function ( err, cust ) {
      console.log( 'Searching for CustomerID %d', req.params.id );

      if ( err ) {
        res.send( err );
      }

      res.json( cust );
    } )
  } )
  .delete( function ( req, res ) {
    Customer.remove( {
      customerID : req.params.id
    }, function ( err ) {
      if ( err ) {
        res.send( err );
      }
      res.json( { message : 'Customer #' + req.params.id + ' deleted' } );
    } )
  } );

nwr.route( '/customers/f/*' )
  .get( function ( req, res ) {
    var fieldsArray = req.params[0].split( '/' ),
        fields      = fieldsArray.join( ' ' );
    Customer.find( req.query, fields, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( emps );
      } else {
        res.json( _.pluck( emps, fields ) );
      }
    } );
  } );

//##############################################################################
//       PRODUCTS
//##############################################################################
nwr.route( '/products' )
  .get( function ( req, res ) {
    if ( req.query.productName ) {
      req.query.productName = new RegExp( req.query.productName );
    }

    var query = checkQuery( req.query );
    Product.find( query, function ( err, prods ) {
      if ( err ) {
        res.send( err );
      }
      res.json( prods );
    } );
  } )

// create an product (accessed at POST http://localhost:8001/northwind/products)
  .post( function ( req, res ) {

    var prod = new Product(); 		// create a new instance of the Product model
    safeSet( prod, req.body, Product.getFields() );

    // save the Product and check for errors
    prod.save( function ( err ) {
      if ( err ) {
        res.json( err );
        res.end();
      } else {
        res.json( { message : 'Product created!' } );
      }
    } );

  } );

nwr.route( '/products/:id' )
  .put( function ( req, res ) {
    Product.findOne( { productID : req.params.id }, function ( err, prod ) {
      if ( err ) {
        res.send( err );
        res.end();
      } else {
        safeSet( prod, req.body, Product.getFields() );
        prod.save( function ( err ) {
          if ( err ) {
            res.send( err );
          }
          res.json( { message : 'Product #' + prod.productID + ' updated' } )
        } )
      }
    } )
  } )
  .get( function ( req, res ) {
    Product.findOne( { productID : req.params.id }, function ( err, prod ) {
      console.log( 'Searching for ProductID %d', req.params.id );

      if ( err ) {
        res.send( err );
      }

      res.json( prod );
    } )
  } )
  .delete( function ( req, res ) {
    Product.remove( {
      productID : req.params.id
    }, function ( err ) {
      if ( err ) {
        res.send( err );
      }
      res.json( { message : 'Product #' + req.params.id + ' deleted' } );
    } )
  } );

nwr.route( '/products/f/*' )
  .get( function ( req, res ) {
    var fieldsArray = req.params[0].split( '/' ),
        fields      = fieldsArray.join( ' ' );
    Product.find( req.query, fields, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( emps );
      } else {
        res.json( _.pluck( emps, fields ) );
      }
    } );

  } );

//##############################################################################
//       Categories
//##############################################################################
nwr.route( '/categories' )
  .get( function ( req, res ) {
    var query = checkQuery( req.query );
    Category.find( query, function ( err, prods ) {
      if ( err ) {
        res.send( err );
      }
      res.json( prods );
    } );
  } )

// create an category (accessed at POST
// http://localhost:8001/northwind/categories)
  .post( function ( req, res ) {

    var prod = new Category(); 		// create a new instance of the Category model
    safeSet( prod, req.body, Category.getFields() );

    // save the Category and check for errors
    prod.save( function ( err ) {
      if ( err ) {
        res.json( err );
        res.end();
      } else {
        res.json( { message : 'Category created!' } );
      }
    } );

  } );

nwr.route( '/categories/:id' )
  .put( function ( req, res ) {
    Category.findOne( { categoryID : req.params.id }, function ( err, prod ) {
      if ( err ) {
        res.send( err );
        res.end();
      } else {
        safeSet( prod, req.body, Category.getFields() );
        prod.save( function ( err ) {
          if ( err ) {
            res.send( err );
          }
          res.json( { message : 'Category #' + prod.categoryID + ' updated' } )
        } )
      }
    } )
  } )
  .get( function ( req, res ) {
    Category.findOne( { categoryID : req.params.id }, function ( err, prod ) {
      console.log( 'Searching for CategoryID %d', req.params.id );

      if ( err ) {
        res.send( err );
      }

      res.json( prod );
    } )
  } )
  .delete( function ( req, res ) {
    Category.remove( {
      categoryID : req.params.id
    }, function ( err ) {
      if ( err ) {
        res.send( err );
      }
      res.json( { message : 'Category #' + req.params.id + ' deleted' } );
    } )
  } );

nwr.route( '/categories/f/*' )
  .get( function ( req, res ) {
    var fieldsArray = req.params[0].split( '/' ),
        fields      = fieldsArray.join( ' ' );
    Category.find( req.query, fields, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( emps );
      } else {
        res.json( _.pluck( emps, fields ) );
      }
    } );

  } );

//##############################################################################
//      Suppliers
//##############################################################################
nwr.route( '/suppliers' )
  .get( function ( req, res ) {
    var query = checkQuery( req.query );
    Supplier.find( query, function ( err, prods ) {
      if ( err ) {
        res.send( err );
      }
      res.json( prods );
    } );
  } )

// create an supplier (accessed at POST
// http://localhost:8001/northwind/suppliers)
  .post( function ( req, res ) {

    var prod = new Supplier(); 		// create a new instance of the Supplier model
    safeSet( prod, req.body, Supplier.getFields() );

    // save the Supplier and check for errors
    prod.save( function ( err ) {
      if ( err ) {
        res.json( err );
        res.end();
      } else {
        res.json( { message : 'Supplier created!' } );
      }
    } );

  } );

nwr.route( '/suppliers/:id' )
  .put( function ( req, res ) {
    Supplier.findOne( { supplierID : req.params.id }, function ( err, prod ) {
      if ( err ) {
        res.send( err );
        res.end();
      } else {
        safeSet( prod, req.body, Supplier.getFields() );
        prod.save( function ( err ) {
          if ( err ) {
            res.send( err );
          }
          res.json( { message : 'Supplier #' + prod.supplierID + ' updated' } )
        } )
      }
    } )
  } )
  .get( function ( req, res ) {
    Supplier.findOne( { supplierID : req.params.id }, function ( err, prod ) {
      console.log( 'Searching for SupplierID %d', req.params.id );

      if ( err ) {
        res.send( err );
      }

      res.json( prod );
    } )
  } )
  .delete( function ( req, res ) {
    Supplier.remove( {
      supplierID : req.params.id
    }, function ( err ) {
      if ( err ) {
        res.send( err );
      }
      res.json( { message : 'Supplier #' + req.params.id + ' deleted' } );
    } )
  } );

nwr.route( '/suppliers/f/*' )
  .get( function ( req, res ) {
    var fieldsArray = req.params[0].split( '/' ),
        fields      = fieldsArray.join( ' ' );
    Supplier.find( req.query, fields, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( emps );
      } else {
        res.json( _.pluck( emps, fields ) );
      }
    } );

  } );

//##############################################################################
//      Orders
//##############################################################################
nwr.route( '/orders' )
  .get( function ( req, res ) {
    var query = checkQuery( req.query );
    Order.find( query, function ( err, prods ) {
      if ( err ) {
        res.send( err );
      }
      res.json( prods );
    } );
  } )

// create an order (accessed at POST http://localhost:8001/northwind/orders)
  .post( function ( req, res ) {

    var prod = new Order(); 		// create a new instance of the Order model
    safeSet( prod, req.body, Order.getFields() );

    // save the Order and check for errors
    prod.save( function ( err ) {
      if ( err ) {
        res.json( err );
        res.end();
      } else {
        res.json( { message : 'Order created!' } );
      }
    } );

  } );

nwr.route( '/orders/:id' )
  .put( function ( req, res ) {
    Order.findOne( { orderID : req.params.id }, function ( err, prod ) {
      if ( err ) {
        res.send( err );
        res.end();
      } else {
        safeSet( prod, req.body, Order.getFields() );
        prod.save( function ( err ) {
          if ( err ) {
            res.send( err );
          }
          res.json( { message : 'Order #' + prod.orderID + ' updated' } )
        } )
      }
    } )
  } )
  .get( function ( req, res ) {
    Order.findOne( { orderID : req.params.id }, function ( err, prod ) {
      console.log( 'Searching for OrderID %d', req.params.id );

      if ( err ) {
        res.send( err );
      }

      res.json( prod );
    } )
  } )
  .delete( function ( req, res ) {
    Order.remove( {
      orderID : req.params.id
    }, function ( err ) {
      if ( err ) {
        res.send( err );
      }
      res.json( { message : 'Order #' + req.params.id + ' deleted' } );
    } )
  } );

nwr.route( '/orders/f/*' )
  .get( function ( req, res ) {
    var fieldsArray = req.params[0].split( '/' ),
        fields      = fieldsArray.join( ' ' );
    Order.find( req.query, fields, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( emps );
      } else {
        res.json( _.pluck( emps, fields ) );
      }
    } );

  } );

//##############################################################################
//      OrderDetails
//##############################################################################
nwr.route( '/orderDetails' )
  .get( function ( req, res ) {
    var query = checkQuery( req.query );
    OrderDetail.find( query, function ( err, prods ) {
      if ( err ) {
        res.send( err );
      }
      res.json( prods );
    } );
  } )

// create an orderDetail (accessed at POST
// http://localhost:8001/northwind/orderDetails)
  .post( function ( req, res ) {

    var prod = new OrderDetail(); 		// create a new instance of the orderDetail
    // model
    safeSet( prod, req.body, OrderDetail.getFields() );

    // save the OrderDetail and check for errors
    prod.save( function ( err ) {
      if ( err ) {
        res.json( err );
        res.end();
      } else {
        res.json( { message : 'OrderDetail created!' } );
      }
    } );

  } );

// TODO: Implement get by ID (complicated by being a join table)

nwr.route( '/orderDetails/f/*' )
  .get( function ( req, res ) {
    var fieldsArray = req.params[0].split( '/' ),
        fields      = fieldsArray.join( ' ' );
    OrderDetail.find( req.query, fields, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( emps );
      } else {
        res.json( _.pluck( emps, fields ) );
      }
    } );

  } );

module.exports = nwr;