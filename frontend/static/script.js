// Global variables
let confusionChart = null;
let probabilityChart = null;
const API_BASE = 'http://localhost:5000/api';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadQuantumProperties();
    loadCircuitDetails();
    setupNavigation();
    setupEventListeners();
    generateFeatureInputs();
});

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('train-btn').addEventListener('click', trainModel);
    document.getElementById('predict-btn').addEventListener('click', predictFraud);
    document.getElementById('random-btn').addEventListener('click', generateRandomTransaction);
}

// Load Quantum Properties
async function loadQuantumProperties() {
    try {
        const response = await fetch(`${API_BASE}/quantum-properties`);
        const data = await response.json();
        
        const container = document.getElementById('properties-container');
        container.innerHTML = '';
        
        // Add quantum properties
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'object' && key !== 'circuit_description') continue;
            
            const item = document.createElement('div');
            item.className = 'property-item';
            item.innerHTML = `
                <span class="property-label">${formatLabel(key)}</span>
                <span class="property-value">${formatValue(value)}</span>
            `;
            container.appendChild(item);
        }
        
        // Add circuit description
        if (data.circuit_description) {
            const desc = document.createElement('div');
            desc.className = 'property-item';
            desc.innerHTML = `
                <span class="property-label">Circuit Layers</span>
                <span class="property-value">${data.circuit_description.layers.length}</span>
            `;
            container.appendChild(desc);
        }
    } catch (error) {
        console.error('Error loading quantum properties:', error);
        document.getElementById('properties-container').innerHTML = 
            '<p style="color: #ef4444;">Error loading properties</p>';
    }
}

// Load Circuit Details
async function loadCircuitDetails() {
    try {
        const response = await fetch(`${API_BASE}/quantum-circuit`);
        const data = await response.json();
        
        const container = document.getElementById('circuit-details');
        container.innerHTML = `
            <h3>${data.description}</h3>
            <p style="color: #cbd5e1; margin: 1rem 0;">
                <strong>Configuration:</strong> ${data.qubits} qubits, 
                ${data.total_gates} gates, ${data.layers.length} layers
            </p>
            <p style="color: #cbd5e1; margin: 1rem 0;">
                <strong>Kernel Type:</strong> ${data.kernel_type}
            </p>
            <h4 style="color: var(--primary-color); margin: 1.5rem 0 1rem 0;">Quantum Advantages:</h4>
            <ul style="color: #cbd5e1; margin-left: 1.5rem;">
                ${data.advantages.map(adv => `<li>${adv}</li>`).join('')}
            </ul>
        `;
        
        // Populate layers
        const layersContainer = document.getElementById('circuit-layers');
        layersContainer.innerHTML = data.layers.map((layer, idx) => `
            <div class="layer">
                <div class="layer-number">Layer ${layer.number}</div>
                <div class="layer-name">${layer.name}</div>
                <div class="layer-gates"><strong>Gates:</strong> ${layer.gates.join(', ')}</div>
                <div class="layer-purpose">${layer.purpose}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading circuit details:', error);
        document.getElementById('circuit-details').innerHTML = 
            '<p style="color: #ef4444;">Error loading circuit details</p>';
    }
}

// Generate Feature Inputs
function generateFeatureInputs() {
    const container = document.getElementById('features-input');
    container.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const div = document.createElement('div');
        div.className = 'feature-input';
        div.innerHTML = `
            <label for="feature-${i}">F${i}</label>
            <input type="number" id="feature-${i}" value="0" step="0.1" min="-5" max="5">
        `;
        container.appendChild(div);
    }
}

// Generate Random Transaction
function generateRandomTransaction() {
    for (let i = 0; i < 30; i++) {
        const input = document.getElementById(`feature-${i}`);
        input.value = (Math.random() * 10 - 5).toFixed(2);
    }
}

// Train Model
async function trainModel() {
    const nSamples = parseInt(document.getElementById('n-samples').value);
    const useQuantum = document.getElementById('use-quantum').checked;
    
    const trainBtn = document.getElementById('train-btn');
    const progressDiv = document.getElementById('training-progress');
    const metricsDiv = document.getElementById('metrics-display');
    
    trainBtn.disabled = true;
    trainBtn.textContent = 'Training...';
    progressDiv.classList.remove('hidden');
    metricsDiv.classList.add('hidden');
    
    try {
        const response = await fetch(`${API_BASE}/train`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                n_samples: nSamples,
                use_quantum: useQuantum
            })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            // Display metrics
            document.getElementById('metric-accuracy').textContent = 
                (data.metrics.accuracy * 100).toFixed(2) + '%';
            document.getElementById('metric-auc').textContent = 
                data.metrics.auc_roc.toFixed(4);
            document.getElementById('metric-tp').textContent = 
                data.metrics.true_positives;
            document.getElementById('metric-fp').textContent = 
                data.metrics.false_positives;
            document.getElementById('metric-tn').textContent = 
                data.metrics.true_negatives;
            document.getElementById('metric-fn').textContent = 
                data.metrics.false_negatives;
            
            // Update confusion matrix
            updateConfusionMatrix(
                data.metrics.true_negatives,
                data.metrics.false_positives,
                data.metrics.false_negatives,
                data.metrics.true_positives
            );
            
            progressDiv.classList.add('hidden');
            metricsDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Training error:', error);
        alert('Training failed: ' + error.message);
        progressDiv.classList.add('hidden');
    } finally {
        trainBtn.disabled = false;
        trainBtn.textContent = 'Train Model';
    }
}

// Update Confusion Matrix Chart
function updateConfusionMatrix(tn, fp, fn, tp) {
    const ctx = document.getElementById('confusionChart').getContext('2d');
    
    if (confusionChart) {
        confusionChart.destroy();
    }
    
    confusionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['True Negative', 'False Positive', 'False Negative', 'True Positive'],
            datasets: [{
                label: 'Count',
                data: [tn, fp, fn, tp],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.6)',
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(16, 185, 129, 0.6)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(16, 185, 129, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#cbd5e1' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: '#334155' }
                },
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: '#334155' }
                }
            }
        }
    });
}

// Predict Fraud
async function predictFraud() {
    const features = [];
    for (let i = 0; i < 30; i++) {
        features.push(parseFloat(document.getElementById(`feature-${i}`).value) || 0);
    }
    
    try {
        const response = await fetch(`${API_BASE}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transaction: features })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            const resultDiv = document.getElementById('prediction-result');
            const labelDiv = document.getElementById('result-label');
            const probDiv = document.getElementById('result-probability');
            
            // Update label
            labelDiv.textContent = data.label.toUpperCase();
            labelDiv.className = `result-label ${data.label.toLowerCase()}`;
            
            // Update probability
            probDiv.innerHTML = `
                <strong>Fraud Probability:</strong> ${(data.fraud_probability * 100).toFixed(2)}%<br>
                <strong>Legitimate Probability:</strong> ${(data.legitimate_probability * 100).toFixed(2)}%
            `;
            
            // Update chart
            updateProbabilityChart(data.fraud_probability, data.legitimate_probability);
            
            resultDiv.classList.remove('hidden');
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Prediction error:', error);
        alert('Prediction failed: ' + error.message);
    }
}

// Update Probability Chart
function updateProbabilityChart(fraudProb, legitProb) {
    const ctx = document.getElementById('probabilityChart').getContext('2d');
    
    if (probabilityChart) {
        probabilityChart.destroy();
    }
    
    probabilityChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Fraud', 'Legitimate'],
            datasets: [{
                data: [fraudProb * 100, legitProb * 100],
                backgroundColor: ['rgba(239, 68, 68, 0.6)', 'rgba(16, 185, 129, 0.6)'],
                borderColor: ['rgba(239, 68, 68, 1)', 'rgba(16, 185, 129, 1)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#cbd5e1' }
                }
            }
        }
    });
}

// Utility Functions
function formatLabel(str) {
    return str
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatValue(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.join(', ');
    }
    return value;
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
