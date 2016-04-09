@echo off

SET ANGULAR_HOME=%CD%

FOR /D %%I IN ("%CD%") DO SET _LAST_SEGMENT_=%%~nxI

echo Initial ANGULAR_HOME: %ANGULAR_HOME%
echo LAST_SEGMENT: %_LAST_SEGMENT_%

if "%_LAST_SEGMENT_%"=="bin" (
  set ANGULAR_HOME=%ANGULAR_HOME:~0,-4%
)

echo Modified ANGULAR_HOME %ANGULAR_HOME%
set OLD_PATH=%PATH%
set NODE_MODULES=%ANGULAR_HOME%\node_modules\.bin
set CHROMEDRIVER=%ANGULAR_HOME%\node_modules\protractor\selenium
set NODE_EXE=%ANGULAR_HOME%\bin\node\windows\x64;%ANGULAR_HOME%\bin\node\windows\x86
set MONGO=%ANGULAR_HOME%\bin\mongo\windows\x64\bin;%ANGULAR_HOME%\bin\mongo\windows\x86\bin


echo Setting PATH....
set PATH=%NODE_MODULES%;%CHROMEDRIVER%;%ANGULAR_HOME%\bin;%NODE_EXE%;%MONGO%;%PATH%

echo PATH successfully set for Angular JS Class
echo PATH is %PATH%
