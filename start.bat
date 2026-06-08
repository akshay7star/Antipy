@echo off
setlocal

set "APP_DIR=%~dp0app"
set "URL=http://localhost:3000"

if not exist "%APP_DIR%\package.json" (
  echo Could not find the app folder at:
  echo %APP_DIR%
  echo.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to run this project.
  echo Install Node.js 18 or newer, then run this file again.
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js with npm enabled, then run this file again.
  echo.
  pause
  exit /b 1
)

cd /d "%APP_DIR%"

if not exist "node_modules" (
  echo Installing dependencies. This may take a few minutes...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting AntiPy at %URL% ...
start "AntiPy Dev Server" cmd /k "cd /d ""%APP_DIR%"" && npm run dev"

echo Opening browser...
timeout /t 5 /nobreak >nul
start "" "%URL%"

exit /b 0
