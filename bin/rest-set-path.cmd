@echo off


SET REST_HOME=%CD%

FOR /D %%I IN ("%CD%") DO SET _LAST_SEGMENT_=%%~nxI

echo Initial REST_HOME: %REST_HOME%
echo LAST_SEGMENT: %_LAST_SEGMENT_%

if "%_LAST_SEGMENT_%"=="bin" (
  set REST_HOME=%REST_HOME:~0,-4%
)

set ORIGINAL_DIR=%CD%
set OLD_PATH=%PATH%
set NODE_MODULES=%REST_HOME%\node_modules\.bin
set MONGO=%REST_HOME%\bin\mongo\x64

rem Set path to node.exe here, if not already set
rem set NODE_PATH=C:\Program Files\nodejs\

echo Setting PATH....
set PATH=%NODE_MODULES%;%REST_HOME%\bin;%MONGO%;%PATH%;

echo PATH successfully set for Node REST Server
echo PATH is %PATH%
