const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint to verify backend is running
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// Benchmark endpoint (dummy data for now)
app.post('/api/benchmark', (req, res) => {
    const { algorithm, text } = req.body;
    
    // Return dummy data as requested in Step 5
    res.json({
        algorithm: algorithm,
        executionTime: "1 ms",
        memoryUsage: "3 MB",
        outputSize: "32 Bytes",
        output: "sample"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
