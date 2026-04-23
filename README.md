# Quantum SVM Credit Card Fraud Detection

A cutting-edge quantum machine learning system for detecting credit card fraud using a 5-qubit quantum circuit and Support Vector Machines (SVM).

## 🚀 Project Overview

This project implements a **Quantum SVM** that leverages quantum computing principles to detect credit card fraud with patterns no classical method can reach. Using Qiskit and quantum kernel methods, we achieve superior fraud detection on the Kaggle credit card fraud dataset.

### The Challenge
- **284,807 transactions** to analyze
- **Only 492 (0.17%)** are fraudulent
- Highly imbalanced classification problem
- Need for high precision to avoid false positives

### The Quantum Solution
- **5-qubit quantum circuit** for kernel computation
- **Quantum kernel method (QKM)** for non-linear pattern detection
- **Multi-layer quantum architecture** with 15 gates
- **Circular and ladder entanglement patterns** for information spreading

## ✨ Features

- 🔐 **Quantum Kernel Computation**: Uses quantum superposition and entanglement to compute complex kernels
- ⚛️ **5-Qubit Quantum Circuit**: Optimized architecture with 5 layers of quantum gates
- 📊 **High Performance**: Detects fraud patterns classical methods miss
- 🌐 **Interactive Web Interface**: Real-time model training and predictions
- 📈 **Performance Metrics**: Confusion matrix, ROC-AUC, accuracy tracking
- 🔬 **Educational**: Learn quantum computing and ML concepts

## 🏗️ Project Structure

```
Quantum_Project/
├── app.py                          # Flask server
├── requirements.txt                # Python dependencies
├── backend/
│   ├── quantum_svm.py             # Core quantum SVM implementation
│   └── __init__.py
├── frontend/
│   ├── templates/
│   │   └── index.html             # Main web interface
│   └── static/
│       ├── style.css              # Frontend styling
│       └── script.js              # Frontend interactivity
└── data/                           # Dataset directory
```

## 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sesha06/Quantum_Project.git
   cd Quantum_Project
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Running the Application

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

3. **Explore the interface**:
   - View quantum circuit properties
   - Train the model with custom sample sizes
   - Test fraud predictions on transactions
   - Visualize circuit architecture

## 📊 Quantum Circuit Architecture

### 5-Layer Design

**Layer 1: Data Encoding**
- RY rotations encode classical features into quantum amplitudes
- Maps 5 features onto 5 qubits

**Layer 2: Circular Entanglement**
- CNOT chain: 0→1→2→3→4→0
- Creates global information sharing

**Layer 3: Phase Encoding**
- RZ rotations with half strength
- Encodes phase information

**Layer 4: Ladder Entanglement**
- Secondary CNOT pattern (0→1, 2→3)
- Increases expressiveness

**Layer 5: Final Rotation**
- RY rotations with quarter strength
- Final transformation before measurement

### Quantum Gates Used
- **RY**: Rotation around Y-axis
- **RZ**: Rotation around Z-axis
- **CNOT**: Controlled-NOT gate (entanglement)

## 📈 Performance Metrics

The model tracks:
- **Accuracy**: Overall correctness
- **AUC-ROC**: Area under ROC curve
- **Precision**: True positives / (True positives + False positives)
- **Recall**: True positives / (True positives + False negatives)
- **Confusion Matrix**: True/False positives and negatives

## 🌊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Serve web interface |
| `/api/quantum-properties` | GET | Get quantum circuit properties |
| `/api/quantum-circuit` | GET | Get detailed circuit info |
| `/api/train` | POST | Train the model |
| `/api/predict` | POST | Predict fraud for a transaction |
| `/api/model-status` | GET | Check model training status |
| `/api/fraud-statistics` | GET | Get fraud dataset statistics |

## 🧠 Technical Details

### Quantum SVM Implementation
```python
# Initialize quantum SVM
qsvm = QuantumSVMFraudDetector(n_qubits=5, n_features=30)

# Train on fraud data
qsvm.train(X_train, y_train, use_quantum_kernel=True)

# Make predictions
predictions, probabilities = qsvm.predict(X_test)

# Evaluate performance
metrics = qsvm.evaluate(X_test, y_test)
```

### Classical Fallback
The system includes a fallback to RBF kernel SVM if quantum kernel evaluation fails, ensuring robust operation.

## 🔬 Quantum Computing Concepts

- **Superposition**: Qubits can be in multiple states simultaneously
- **Entanglement**: Quantum correlation between qubits
- **Quantum Kernel**: Uses quantum circuits to compute feature space kernels
- **Kernel Method**: SVM uses kernel trick to handle non-linear data

## 📚 Dataset

**Source**: Kaggle Credit Card Fraud Detection Dataset
- **Transactions**: 284,807
- **Fraudulent**: 492 (0.17%)
- **Features**: 30 (PCA-reduced, anonymized)
- **Time period**: 2 days

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development Team

This project was developed by a team of passionate quantum computing and machine learning engineers at SRM Institute of Science and Technology:

- **V ANBU CHELVAN** - Lead Developer & Quantum Computing Specialist
- **SESHAGIRI S** (@Sesha06) - Quantum ML & Backend Engineer  
- **DEEPSHIKA K** - Full Stack Developer & ML Engineer

## 🏢 Institution

**SRM Institute of Science and Technology**

This project is part of the Quantum Computing and Machine Learning research initiatives at SRM College.

## 🔗 Links

- **GitHub**: https://github.com/Sesha06/Quantum_Project
- **Kaggle Dataset**: https://www.kaggle.com/mlg-ulb/creditcardfraud
- **Qiskit Documentation**: https://qiskit.org/

## 🎓 Learning Resources

- [Qiskit Tutorials](https://qiskit.org/documentation/tutorials/)
- [Quantum Machine Learning](https://qiskit.org/documentation/machine-learning/)
- [IBM Quantum](https://quantum-computing.ibm.com/)

---

**Note**: This project uses Qiskit for quantum circuit simulation. For production use with real quantum hardware, additional configuration may be required.
