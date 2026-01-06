@echo off
echo Checking Node.js...

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed.
    echo.
    echo Please install Node.js manually from:
    echo https://nodejs.org/
    echo.
    echo This is safer than automatic installation.
    pause
    exit /b 1
) else (
    echo Node.js is already installed.
    echo.
)

echo Checking for node_modules...
if not exist "node_modules" (
    echo node_modules folder not found. Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Failed to install dependencies.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully.
    echo.
) else (
    echo node_modules folder found.
    echo.
)

echo Running Node.js script...
node Scanner-By-Bimz.js
if %errorlevel% neq 0 (
    echo An error occurred while executing Scanner-By-Bimz.js.
    pause
    exit /b %errorlevel%
)

pause