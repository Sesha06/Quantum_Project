"""
Flask API Server for Quantum SVM Fraud Detection
Serves both the quantum backend and web frontend
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import numpy as np
import json
from backend.quantum_svm import QuantumSVMFraudDetector, generate_synthetic_fraud_data
from sklearn.model_selection import train_test_split
import os

app = Flask(__name__, template_folder='frontend/templates', static_folder='frontend/static')
CORS(app)

# Initialize quantum SVM
qsvm = QuantumSVMFraudDetector(n_qubits=5, n_features=30)

# Model state
model_state = {
    'trained': False,
    'metrics': None,
    'n_samples_trained': 0
}


@app.route('/')
def index():
    """Serve the main webpage"""
    return render_template('index.html')


@app.route('/api/quantum-properties', methods=['GET'])
def get_quantum_properties():
    """Get quantum circuit properties"""
    properties = qsvm.get_quantum_properties()
    
    # Add additional circuit details
    properties['circuit_description'] = {
        'layers': [
            {'name': 'Layer 1', 'gates': 'RY Rotations', 'description': 'Encode classical data into quantum amplitudes'},
            {'name': 'Layer 2', 'gates': 'CNOT Chain', 'description': 'Circular entanglement pattern'},
            {'name': 'Layer 3', 'gates': 'RZ Rotations', 'description': 'Phase encoding (half strength)'},
            {'name': 'Layer 4', 'gates': 'CNOT Ladder', 'description': 'Secondary entanglement'},
            {'name': 'Layer 5', 'gates': 'RY Rotations', 'description': 'Final rotation layer (quarter strength)'}
        ],
        'total_gates': 15,
        'entanglement_type': 'Circular + Ladder Pattern'
    }
    
    return jsonify(properties)


@app.route('/api/train', methods=['POST'])
def train_model():
    """Train the quantum SVM model"""
    try:
        data = request.json
        n_samples = data.get('n_samples', 5000)
        use_quantum = data.get('use_quantum', False)
        
        # Generate synthetic fraud data
        X, y = generate_synthetic_fraud_data(n_samples=n_samples, fraud_ratio=0.01)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
        
        # Train the model
        qsvm.train(X_train, y_train, use_quantum_kernel=use_quantum)
        
        # Evaluate
        metrics = qsvm.evaluate(X_test, y_test)
        
        # Update state
        model_state['trained'] = True
        model_state['metrics'] = metrics
        model_state['n_samples_trained'] = len(X_train)
        
        return jsonify({
            'status': 'success',
            'message': 'Model trained successfully',
            'metrics': {
                'accuracy': float(metrics['accuracy']),
                'auc_roc': float(metrics['auc_roc']),
                'true_positives': int(metrics['true_positives']),
                'false_positives': int(metrics['false_positives']),
                'true_negatives': int(metrics['true_negatives']),
                'false_negatives': int(metrics['false_negatives']),
                'samples_trained': len(X_train),
                'samples_tested': len(X_test)
            }
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400


@app.route('/api/predict', methods=['POST'])
def predict_fraud():
    """Predict fraud for new transaction"""
    try:
        if not model_state['trained']:
            return jsonify({'status': 'error', 'message': 'Model not trained yet'}), 400
        
        data = request.json
        transaction = np.array(data.get('transaction', [])).reshape(1, -1)
        
        # Pad if necessary
        if transaction.shape[1] < 30:
            transaction = np.pad(transaction, ((0, 0), (0, 30 - transaction.shape[1])))
        
        predictions, probabilities = qsvm.predict(transaction[:, :30])
        
        return jsonify({
            'status': 'success',
            'prediction': int(predictions[0]),
            'fraud_probability': float(probabilities[0][1]),
            'legitimate_probability': float(probabilities[0][0]),
            'label': 'Fraud' if predictions[0] == 1 else 'Legitimate'
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400


@app.route('/api/model-status', methods=['GET'])
def get_model_status():
    """Get current model training status"""
    return jsonify({
        'trained': model_state['trained'],
        'samples_trained': model_state['n_samples_trained'],
        'has_metrics': model_state['metrics'] is not None
    })


@app.route('/api/quantum-circuit', methods=['GET'])
def get_quantum_circuit_info():
    """Get detailed quantum circuit information"""
    circuit_info = {
        'description': 'A 5-qubit parameterized quantum circuit optimized for fraud detection',
        'qubits': 5,
        'parameters': 5,
        'total_gates': 15,
        'layers': [
            {
                'number': 1,
                'name': 'Data Encoding',
                'gates': ['RY(θ₀)', 'RY(θ₁)', 'RY(θ₂)', 'RY(θ₃)', 'RY(θ₄)'],
                'purpose': 'Encodes classical features into quantum amplitudes'
            },
            {
                'number': 2,
                'name': 'Entanglement - Circular',
                'gates': ['CNOT(0→1)', 'CNOT(1→2)', 'CNOT(2→3)', 'CNOT(3→4)', 'CNOT(4→0)'],
                'purpose': 'Creates circular entanglement between qubits'
            },
            {
                'number': 3,
                'name': 'Phase Encoding',
                'gates': ['RZ(θ₀/2)', 'RZ(θ₁/2)', 'RZ(θ₂/2)', 'RZ(θ₃/2)', 'RZ(θ₄/2)'],
                'purpose': 'Encodes phase information'
            },
            {
                'number': 4,
                'name': 'Entanglement - Ladder',
                'gates': ['CNOT(0→1)', 'CNOT(2→3)'],
                'purpose': 'Creates ladder entanglement pattern'
            },
            {
                'number': 5,
                'name': 'Final Rotation',
                'gates': ['RY(θ₀/4)', 'RY(θ₁/4)', 'RY(θ₂/4)', 'RY(θ₃/4)', 'RY(θ₄/4)'],
                'purpose': 'Final transformations before measurement'
            }
        ],
        'measurement': 'Computational basis measurement (Z-basis)',
        'kernel_type': 'Quantum Kernel Method (QKM)',
        'advantages': [
            'Captures non-linear patterns through quantum superposition',
            'Circular entanglement enables global information sharing',
            'Multi-layer design increases expressiveness',
            'Can detect fraud patterns classical methods miss'
        ]
    }
    return jsonify(circuit_info)


@app.route('/api/fraud-statistics', methods=['GET'])
def get_fraud_statistics():
    """Get general fraud detection statistics"""
    stats = {
        'dataset_info': {
            'total_transactions': '284,807',
            'fraud_cases': '492',
            'fraud_percentage': '0.17%',
            'legitimate_transactions': '284,315',
            'features': 30
        },
        'quantum_advantage': {
            'classical_methods': ['Logistic Regression', 'Random Forest', 'Neural Networks'],
            'quantum_advantage': 'Quantum kernel captures non-linear patterns with fewer parameters',
            'speed_improvement': 'Potential exponential speedup for high-dimensional data'
        }
    }
    return jsonify(stats)


if __name__ == '__main__':
    print("Starting Quantum SVM Fraud Detection Server...")
    print("Access the website at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
