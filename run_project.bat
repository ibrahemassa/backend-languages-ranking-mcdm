@echo off
echo ========================================
echo Backend Language Selector - Auto Starter
echo ========================================

REM Step 1: Start Python Backend in new terminal
echo.
echo [1/3] Starting Backend...
cd backend
pip install -r requirements.txt
start cmd /k "cd %cd% && python app.py"
cd ..

REM Step 3: Open new terminal, wait 6 seconds, then run npm run dev
echo.
echo [3/3] Starting frontend server after 6 seconds delay in new window...
cd frontend
start cmd /k "cd %cd% && timeout /t 6 /nobreak >nul && npm run dev"
cd ..

REM Step 2: Run npm install immediately in current terminal
echo.
echo [2/3] Installing frontend dependencies (running here)...
npm install --force



echo.
echo ========================================
echo Project is running!
echo Backend:  http://127.0.0.1:5000
echo Frontend: http://localhost:5173
echo ========================================
pause
