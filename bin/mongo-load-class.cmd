@echo off

rem Movies
mongoimport -v --db class --collection top250 --jsonArray --drop --file "%ANGULAR_HOME%\data\imdbTop250.json"

rem States
mongoimport -v --db class --collection states --jsonArray --drop --file "%ANGULAR_HOME%\data\states.json"
mongoimport -v --db class --collection stateNames --jsonArray --drop --file "%ANGULAR_HOME%\data\state-names.json"

rem Doughnuts
mongoimport -v -db class --collection doughnutConfig --jsonArray --drop --file "%ANGULAR_HOME%\data\doughnut-config-data.json"
mongoimport -v -db class --collection doughnuts --jsonArray --drop --file "%ANGULAR_HOME%\data\doughnuts.json"

rem Northwind
mongoimport -v --db class --collection categories --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-categories.json"
mongoimport -v --db class --collection customers --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-customers.json"
mongoimport -v --db class --collection employees --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-employees.json"
mongoimport -v --db class --collection order_details --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-order-details.json"
mongoimport -v --db class --collection orders --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-orders.json"
mongoimport -v --db class --collection products --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-products.json"
mongoimport -v --db class --collection regions --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-regions.json"
mongoimport -v --db class --collection shippers --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-shippers.json"
mongoimport -v --db class --collection suppliers --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-suppliers.json"
mongoimport -v --db class --collection territories --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-territories.json"
mongoimport -v --db class --collection usstates --drop --jsonArray --file "%ANGULAR_HOME%\data\northwind\northwind-usstates.json"
