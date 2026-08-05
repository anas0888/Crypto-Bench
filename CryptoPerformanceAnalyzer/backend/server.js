const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const benchmark = require('./benchmark');
const blockchain = require('./blockchain');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint to verify backend is running
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// Benchmark endpoint
app.post('/api/benchmark', (req, res) => {
    const { algorithm, text } = req.body;
    
    try {
        const result = benchmark.measurePerformance(algorithm, text);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Store endpoint
app.post('/api/store', async (req, res) => {
    try {
        const benchmarkResult = req.body;
        
        // Create JSON from benchmark result
        const jsonString = JSON.stringify(benchmarkResult);
        
        // Generate SHA-256 hash
        const hash = crypto.createHash('sha256').update(jsonString).digest('hex');
        
        // Store hash on blockchain
        const txHash = await blockchain.storeHash(hash);
        
        // Return transaction hash
        res.json({ txHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
