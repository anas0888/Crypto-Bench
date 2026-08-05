const cryptoLib = require('./crypto');

function measurePerformance(algorithmName, text) {
    const startMemory = process.memoryUsage().heapUsed;
    const startTime = process.hrtime.bigint();

    let output = '';

    if (algorithmName === 'AES') {
        output = cryptoLib.runAES(text);
    } else if (algorithmName === 'RSA') {
        output = cryptoLib.runRSA(text);
    } else if (algorithmName === 'SHA256') {
        output = cryptoLib.runSHA256(text);
    } else if (algorithmName === 'SHA512') {
        output = cryptoLib.runSHA512(text);
    }
    // Other algorithms will be implemented in subsequent steps

    const endTime = process.hrtime.bigint();
    const endMemory = process.memoryUsage().heapUsed;

    const executionTimeMs = Number(endTime - startTime) / 1000000;
    const memoryUsedMB = Math.max(0, (endMemory - startMemory) / (1024 * 1024));
    const outputSizeBytes = Buffer.byteLength(output, 'utf8');

    return {
        algorithm: algorithmName,
        executionTime: executionTimeMs.toFixed(3) + ' ms',
        memoryUsage: memoryUsedMB.toFixed(4) + ' MB',
        outputSize: outputSizeBytes + ' Bytes',
        output: output
    };
}

module.exports = {
    measurePerformance
};
