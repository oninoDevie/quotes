@echo off
echo Starting development servers...

:: Start backend server
start cmd /k "cd backend && npm run dev"

:: Wait for backend to start
timeout /t 5

:: Start frontend server
start cmd /k "live-server --port=8080"

echo Development servers started!
echo Frontend: http://localhost:8080
echo Backend: http://localhost:3000 