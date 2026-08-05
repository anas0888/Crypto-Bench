document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('runBtn');
    const storeBtn = document.getElementById('storeBtn');
    const resultsSection = document.getElementById('resultsSection');
    const txSection = document.getElementById('txSection');

    runBtn.addEventListener('click', async () => {
        const algorithm = document.getElementById('algorithmSelect').value;
        const text = document.getElementById('inputText').value;

        if (!text) {
            alert('Please enter some text to process.');
            return;
        }

        // Display results section with some mock loading text
        resultsSection.style.display = 'block';
        txSection.style.display = 'none';

        document.getElementById('resAlgorithm').innerText = algorithm;
        document.getElementById('resTime').innerText = '...';
        document.getElementById('resMemory').innerText = '...';
        document.getElementById('resSize').innerText = '...';
        document.getElementById('resOutput').innerText = 'Processing...';

        try {
            const response = await fetch('http://localhost:3000/api/benchmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ algorithm, text })
            });

            const data = await response.json();

            document.getElementById('resAlgorithm').innerText = data.algorithm;
            document.getElementById('resTime').innerText = data.executionTime;
            document.getElementById('resMemory').innerText = data.memoryUsage;
            document.getElementById('resSize').innerText = data.outputSize;
            document.getElementById('resOutput').innerText = data.output;

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('resOutput').innerText = 'Error connecting to backend.';
        }
    });

    storeBtn.addEventListener('click', () => {
        // Will be implemented later
        txSection.style.display = 'block';
        document.getElementById('txHash').innerText = 'Loading...';
    });
});
