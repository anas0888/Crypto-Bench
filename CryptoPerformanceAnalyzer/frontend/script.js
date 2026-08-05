document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('runBtn');
    const storeBtn = document.getElementById('storeBtn');
    const resultsSection = document.getElementById('resultsSection');
    const txSection = document.getElementById('txSection');

    runBtn.addEventListener('click', () => {
        // We will implement fetch logic in Step 5
        // For now, just a placeholder UI change
        
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
    });

    storeBtn.addEventListener('click', () => {
        // Will be implemented later
        txSection.style.display = 'block';
        document.getElementById('txHash').innerText = 'Loading...';
    });
});
