"""
Initialize backend module
"""
from .quantum_svm import QuantumSVMFraudDetector, generate_synthetic_fraud_data, load_kaggle_fraud_dataset

__version__ = "1.0.0"
__author__ = "SESHAGIRI S"

__all__ = [
    'QuantumSVMFraudDetector',
    'generate_synthetic_fraud_data',
    'load_kaggle_fraud_dataset'
]
