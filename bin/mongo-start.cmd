@echo off
start "mongod" mongod --httpinterface --rest --directoryperdb --smallfiles --dbpath "%ANGULAR_HOME%\data\mongo"
