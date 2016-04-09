var frisby = require( 'frisby' ),
  baseURL = 'http://localhost:8001/northwind/',
  employeeURL = baseURL + 'employees',
  productURL = baseURL + 'products',
  customerURL = baseURL + 'customers';

frisby.create( 'node-rest basic test' )
  .get( employeeURL )
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON( '0', {
    employeeID : 1,
    firstName  : 'Nancy',
    lastName   : 'Davolio'
  } )
  .toss();

//##################################################
//  EMPLOYEES
//##################################################

frisby.create('Employee Create')
  .post(employeeURL, {
    firstName: 'John',
    lastName: 'Paxton',
    employeeID: 10
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({
    "message": "Employee created!"
  })
  .toss();

frisby.create('Employee Create Validation Fail')
.post(employeeURL, {
    firstName: 'Wrong',
    lastName: 'Wrongstone'
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({
    "message": "Validation failed",
    "errors": {
      "employeeID": {
        "message": "Path `employeeID` is required.",
        "name": "ValidatorError",
        "path": "employeeID",
        "type": "required"
      }
    }
  })
  .toss();

frisby.create('Employee Update')
  .put(employeeURL + '/1', {
    employeeID: 1,
    title: 'The Big Cheese'
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({message : 'Employee #1 updated'})
  .toss();

frisby.create('Employee Delete')
  .delete(employeeURL + '/10')
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({message : 'Employee #10 deleted'})
  .toss();

//##################################################
//  PRODUCTS
//##################################################

var testProdID = 100000;

frisby.create('Product Create')
  .post(productURL, {
    productID: testProdID,
    productName: 'Test Product',
    unitPrice: 69
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({
    "message": "Product created!"
  })
  .toss();

frisby.create('Product Create Validation Fail')
  .post(productURL, {
    productName: 'Wrong Product',
    quantityPerUnit: 'Wrongstone'
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({
    "message": "Validation failed",
    "errors": {
      "productID": {
        "message": "Path `productID` is required.",
        "name": "ValidatorError",
        "path": "productID",
        "type": "required"
      }
    }
  })
  .toss();

frisby.create('Product Update')
  .put(productURL + '/' + testProdID, {
    productID: testProdID,
    productName: 'Test Product Updated'
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({message : 'Product #' + testProdID + ' updated'})
  .toss();

frisby.create('Product Delete')
  .delete(productURL + '/' + testProdID )
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({message : 'Product #' + testProdID + ' deleted'})
  .toss();

//##################################################
//  CUSTOMERS
//##################################################

var testCustID = 'TESTC';

frisby.create('Customer Create')
  .post(customerURL, {
    customerID: testCustID,
    companyName: 'Test Company',
    contactName: 'Test Contact'
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({
    "message": "Customer created!"
  })
  .toss();

frisby.create('Customer Create Validation Fail')
  .post(customerURL, {
    customerName: 'Wrong Customer',
    quantityPerUnit: 'Wrongstone'
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({
    "message": "Validation failed",
    "errors": {
      "customerID": {
        "message": "Path `customerID` is required.",
        "name": "ValidatorError",
        "path": "customerID",
        "type": "required"
      }
    }
  })
  .toss();

frisby.create('Customer Update')
  .put(customerURL + '/' + testCustID, {
    customerID: testCustID,
    customerName: 'Test Customer Updated'
  })
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({message : 'Customer #' + testCustID + ' updated'})
  .toss();

frisby.create('Customer Delete')
  .delete(customerURL + '/' + testCustID )
  .expectStatus( 200 )
  .expectHeaderContains( 'content-type', 'application/json' )
  .expectJSON({message : 'Customer #' + testCustID + ' deleted'})
  .toss();
