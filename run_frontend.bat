@echo off
echo ========================================================
echo   Starting HotelHub Luxury Frontend
echo ========================================================
echo.
cd /d "%~dp0\frontend"
start http://localhost:3000
node server.js
pause
