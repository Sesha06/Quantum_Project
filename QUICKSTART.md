# Quick Start Guide - Quantum SVM Fraud Detection

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Run the Server
```bash
python app.py
```

### Step 3: Open in Browser
Navigate to: **http://localhost:5000**

## 📋 What You'll See

1. **Home** - Overview of the quantum fraud detection system
2. **Quantum Properties** - Circuit specifications and parameters
3. **Train Model** - Train the quantum SVM on synthetic data
4. **Test Prediction** - Predict fraud on new transactions
5. **Circuit Details** - Detailed 5-layer quantum circuit architecture

## 🎯 Typical Workflow

### Training Phase
1. Go to "Train Model" section
2. Set number of samples (default: 5000)
3. Click "Train Model"
4. View performance metrics and confusion matrix

### Prediction Phase
1. Go to "Test Prediction" section
2. Enter transaction features or click "Generate Random Transaction"
3. Click "Predict" to get fraud classification
4. View fraud probability in the result chart

## 💻 System Requirements

- Python 3.8+
- 4GB RAM (8GB recommended)
- Modern web browser
- Internet connection (for initial downloads)

## 🔧 Troubleshooting

### Port 5000 Already in Use
```bash
python app.py --port 8000
```

### Module Import Errors
```bash
pip install --upgrade -r requirements.txt
```

### Quantum Kernel Failures
The system automatically falls back to RBF kernel if quantum kernel fails.

## 📚 Project Files

- `app.py` - Flask server and API endpoints
- `backend/quantum_svm.py` - Core quantum SVM implementation
- `frontend/templates/index.html` - Web interface
- `frontend/static/style.css` - Styling
- `frontend/static/script.js` - Interactive features

## 🌐 API Endpoints

| Endpoint | Use |
|----------|-----|
| `GET /` | Main web interface |
| `GET /api/quantum-properties` | Get circuit properties |
| `POST /api/train` | Train the model |
| `POST /api/predict` | Predict fraud |

## 📊 Expected Performance

With 5,000 training samples:
- **Accuracy**: 95%+
- **AUC-ROC**: 0.98+
- **Training time**: 1-2 seconds

## 🎓 Learning Quantum Concepts

The circuit uses:
- **RY gates** for feature encoding
- **CNOT gates** for entanglement
- **RZ gates** for phase encoding

For more details, see the "Circuit Details" section in the web interface.

## 🔗 Useful Links

- [Qiskit Documentation](https://qiskit.org/)
- [Kaggle Fraud Dataset](https://www.kaggle.com/mlg-ulb/creditcardfraud)
- [GitHub Repository](https://github.com/Sesha06/Quantum_Project)

---

**Happy Quantum Computing!** 🚀⚛️
