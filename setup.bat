@echo off
REM Quantum SVM Fraud Detection - Setup Script for Windows

echo.
echo 🚀 Quantum SVM Fraud Detection - Setup
echo ======================================
echo.

REM Check Python version
echo ✓ Checking Python installation...
python --version

REM Create virtual environment
echo ✓ Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo ✓ Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo ✓ Installing dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt

echo.
echo ======================================
echo ✅ Setup complete!
echo.
echo 🚀 To start the server, run:
echo    python app.py
echo.
echo 🌐 Then open your browser to:
echo    http://localhost:5000
echo.
echo 📚 For more info, see:
echo    - QUICKSTART.md
echo    - README.md
echo    - DEPLOYMENT.md
echo ======================================
echo.

pause
