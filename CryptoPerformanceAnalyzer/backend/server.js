const express = require('express');
const cors = require('cors');
const benchmark = require('./benchmark');

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
