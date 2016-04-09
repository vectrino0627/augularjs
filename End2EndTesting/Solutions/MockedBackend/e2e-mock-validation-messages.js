/*
 * Build an Angular module around the data below
 * The module should depend on customerApp and ngMockE2E
 * When it runs, configure an $httpBackend as follows:
 *  + Anything to /northwind/customers/ should respond with customers
 *  + Anything to /northwind/customers/?companyName or ?contactName
 *    should be passed through to the actual implementation
 *
 * Challenge: underscore.js is included in the HTML page. Consider implementing
 * the requests for companyName and contactName (using the same dataset, no
 * need to duplicate the functionality entirely, just enough for the test)
 */

(function ( angular ) {
  var mod = angular.module( 'customerAppE2E', ['customerApp', 'ngMockE2E'] );

  mod.run(function($httpBackend) {
    $httpBackend.whenGET( /northwind\/customers\/?$/ ).respond( function(method, url, data) {
/*
      console.log( 'No params version called!' );
      console.log('url: %s | data: %o', url, data);
*/
      return [200, customers, {}];
    } );

    $httpBackend.whenGET(/northwind\/customers\/?\?(companyName|contactName).+/ ).passThrough();
/*
      .respond(function(method, url, data) {
        console.log( 'Parameterized version called!' );
        console.log('url: %s | data: %o', url, data);
        return [200, customers, {}];
      });
*/

  });

  var customers = [
    {
      "_id": "553742cab9611373318ba7e8",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "ANATR",
      "companyName": "Ana Trujillo Emparedados y helados",
      "contactName": "Ana Trujillo",
      "contactTitle": "Owner",
      "address": "Avda. de la Constitución 2222",
      "city": "México D.F.",
      "region": null,
      "postalCode": "05021",
      "country": "Mexico",
      "phone": "(5) 555-4729",
      "fax": "(5) 555-3745"
    },
    {
      "_id": "553742cab9611373318ba7e9",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "ANTON",
      "companyName": "Antonio Moreno Taquería",
      "contactName": "Antonio Moreno",
      "contactTitle": "Owner",
      "address": "Mataderos  2312",
      "city": "México D.F.",
      "region": null,
      "postalCode": "05023",
      "country": "Mexico",
      "phone": "(5) 555-3932",
      "fax": null
    },
    {
      "_id": "553742cab9611373318ba7f9",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "EASTC",
      "companyName": "Eastern Connection",
      "contactName": "Ann Devon",
      "contactTitle": "Sales Agent",
      "address": "35 King George",
      "city": "London",
      "region": null,
      "postalCode": "WX3 6FW",
      "country": "UK",
      "phone": "(171) 555-0297",
      "fax": "(171) 555-3373"
    },
    {
      "_id": "553742cab9611373318ba7fb",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "FAMIA",
      "companyName": "Familia Arquibaldo",
      "contactName": "Aria Cruz",
      "contactTitle": "Marketing Assistant",
      "address": "Rua Orós, 92",
      "city": "Sao Paulo",
      "region": "SP",
      "postalCode": "05442-030",
      "country": "Brazil",
      "phone": "(11) 555-9857",
      "fax": null
    },
    {
      "_id": "553742cab9611373318ba805",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "GOURL",
      "companyName": "Gourmet Lanchonetes",
      "contactName": "André Fonseca",
      "contactTitle": "Sales Associate",
      "address": "Av. Brasil, 442",
      "city": "Campinas",
      "region": "SP",
      "postalCode": "04876-786",
      "country": "Brazil",
      "phone": "(11) 555-9482",
      "fax": null
    },
    {
      "_id": "553742cab9611373318ba80f",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "LAMAI",
      "companyName": "La maison d'Asie",
      "contactName": "Annette Roulet",
      "contactTitle": "Sales Manager",
      "address": "1 rue Alsace-Lorraine",
      "city": "Toulouse",
      "region": null,
      "postalCode": "31000",
      "country": "France",
      "phone": "61.77.61.10",
      "fax": "61.77.61.11"
    },
    {
      "_id": "553742cab9611373318ba81a",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "MORGK",
      "companyName": "Morgenstern Gesundkost",
      "contactName": "Alexander Feuer",
      "contactTitle": "Marketing Assistant",
      "address": "Heerstr. 22",
      "city": "Leipzig",
      "region": null,
      "postalCode": "04179",
      "country": "Germany",
      "phone": "0342-023176",
      "fax": null
    },
    {
      "_id": "553742cab9611373318ba82b",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "ROMEY",
      "companyName": "Romero y tomillo",
      "contactName": "Alejandra Camino",
      "contactTitle": "Accounting Manager",
      "address": "Gran Vía, 1",
      "city": "Madrid",
      "region": null,
      "postalCode": "28001",
      "country": "Spain",
      "phone": "(91) 745 6200",
      "fax": "(91) 745 6210"
    },
    {
      "_id": "553742cab9611373318ba831",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "SPLIR",
      "companyName": "Split Rail Beer & Ale",
      "contactName": "Art Braunschweiger",
      "contactTitle": "Sales Manager",
      "address": "P.O. Box 555",
      "city": "Lander",
      "region": "WY",
      "postalCode": "82520",
      "country": "USA",
      "phone": "(307) 555-4680",
      "fax": "(307) 555-6525"
    },
    {
      "_id": "553742cab9611373318ba837",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "TRADH",
      "companyName": "Tradição Hipermercados",
      "contactName": "Anabela Domingues",
      "contactTitle": "Sales Representative",
      "address": "Av. Inês de Castro, 414",
      "city": "Sao Paulo",
      "region": "SP",
      "postalCode": "05634-030",
      "country": "Brazil",
      "phone": "(11) 555-2167",
      "fax": "(11) 555-2168"
    },
    {
      "_id": "553742cab9611373318ba7ea",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "AROUT",
      "companyName": "Around the Horn",
      "contactName": "Thomas Hardy",
      "contactTitle": "Sales Representative",
      "address": "120 Hanover Sq.",
      "city": "London",
      "region": null,
      "postalCode": "WA1 1DP",
      "country": "UK",
      "phone": "(171) 555-7788",
      "fax": "(171) 555-6750"
    },
    {
      "_id": "553742cab9611373318ba83f",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "WHITC",
      "companyName": "White Clover Markets",
      "contactName": "Karl Jablonski",
      "contactTitle": "Owner",
      "address": "305 - 14th Ave. S. Suite 3B",
      "city": "Seattle",
      "region": "WA",
      "postalCode": "98128",
      "country": "USA",
      "phone": "(206) 555-4112",
      "fax": "(206) 555-4115"
    },
    {
      "_id": "553742cab9611373318ba818",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "MAISD",
      "companyName": "Maison Dewey",
      "contactName": "Catherine Dewey",
      "contactTitle": "Sales Agent",
      "address": "Rue Joseph-Bens 532",
      "city": "Bruxelles",
      "region": null,
      "postalCode": "B-1180",
      "country": "Belgium",
      "phone": "(02) 201 24 67",
      "fax": "(02) 201 24 68"
    },
    {
      "_id": "553742cab9611373318ba832",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "SUPRD",
      "companyName": "Suprêmes délices",
      "contactName": "Pascale Cartrain",
      "contactTitle": "Accounting Manager",
      "address": "Boulevard Tirou, 255",
      "city": "Charleroi",
      "region": null,
      "postalCode": "B-6000",
      "country": "Belgium",
      "phone": "(071) 23 67 22 20",
      "fax": "(071) 23 67 22 21"
    },
    {
      "_id": "553742cab9611373318ba839",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "VAFFE",
      "companyName": "Vaffeljernet",
      "contactName": "Palle Ibsen",
      "contactTitle": "Sales Manager",
      "address": "Smagsloget 45",
      "city": "Århus",
      "region": null,
      "postalCode": "8200",
      "country": "Denmark",
      "phone": "86 21 32 43",
      "fax": "86 22 33 44"
    },
    {
      "_id": "553742cab9611373318ba83a",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "VICTE",
      "companyName": "Victuailles en stock",
      "contactName": "Mary Saveley",
      "contactTitle": "Sales Agent",
      "address": "2, rue du Commerce",
      "city": "Lyon",
      "region": null,
      "postalCode": "69004",
      "country": "France",
      "phone": "78.32.54.86",
      "fax": "78.32.54.87"
    },
    {
      "_id": "553742cab9611373318ba83b",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "VINET",
      "companyName": "Vins et alcools Chevalier",
      "contactName": "Paul Henriot",
      "contactTitle": "Accounting Manager",
      "address": "59 rue de l'Abbaye",
      "city": "Reims",
      "region": null,
      "postalCode": "51100",
      "country": "France",
      "phone": "26.47.15.10",
      "fax": "26.47.15.11"
    },
    {
      "_id": "553742cab9611373318ba826",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "RANCH",
      "companyName": "Rancho grande",
      "contactName": "Sergio Gutiérrez",
      "contactTitle": "Sales Representative",
      "address": "Av. del Libertador 900",
      "city": "Buenos Aires",
      "region": null,
      "postalCode": "1010",
      "country": "Argentina",
      "phone": "(1) 123-5555",
      "fax": "(1) 123-5556"
    },
    {
      "_id": "553742cab9611373318ba7f2",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "CACTU",
      "companyName": "Cactus Comidas para llevar",
      "contactName": "Patricio Simpson",
      "contactTitle": "Sales Agent",
      "address": "Cerrito 333",
      "city": "Buenos Aires",
      "region": null,
      "postalCode": "1010",
      "country": "Argentina",
      "phone": "(1) 135-5555",
      "fax": "(1) 135-4892"
    },
    {
      "_id": "553742cab9611373318ba81c",
      "odata.metadata": "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
      "customerID": "OCEAN",
      "companyName": "Océano Atlántico Ltda.",
      "contactName": "Yvonne Moncada",
      "contactTitle": "Sales Agent",
      "address": "Ing. Gustavo Moncada 8585 Piso 20-A",
      "city": "Buenos Aires",
      "region": null,
      "postalCode": "1010",
      "country": "Argentina",
      "phone": "(1) 135-5333",
      "fax": "(1) 135-5535"
    }
  ]

})( angular );