"""
Initialize backend module
"""
from .quantum_svm import QuantumSVMFraudDetector, generate_synthetic_fraud_data, load_kaggle_fraud_dataset

__version__ = "1.0.0"
__author__ = "V ANBU CHELVAN, SESHAGIRI S, DEEPSHIKA K"
__organization__ = "SRM Institute of Science and Technology"

__all__ = [
    'QuantumSVMFraudDetector',
    'generate_synthetic_fraud_data',
    'load_kaggle_fraud_dataset'
]
