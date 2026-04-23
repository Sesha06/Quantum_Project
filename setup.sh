#!/bin/bash
# Quantum SVM Fraud Detection - Setup Script for Linux/Mac

echo "🚀 Quantum SVM Fraud Detection - Setup"
echo "======================================"
echo ""

# Check Python version
echo "✓ Checking Python installation..."
python --version

# Create virtual environment
echo "✓ Creating virtual environment..."
python -m venv venv

# Activate virtual environment
echo "✓ Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "✓ Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo "======================================"
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the server, run:"
echo "   python app.py"
echo ""
echo "🌐 Then open your browser to:"
echo "   http://localhost:5000"
echo ""
echo "📚 For more info, see:"
echo "   - QUICKSTART.md"
echo "   - README.md"
echo "   - DEPLOYMENT.md"
echo "======================================"
