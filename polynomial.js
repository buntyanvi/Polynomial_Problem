const fs = require('fs');
fs.readFile('testCase.json', 'utf8', (error, fileData) => {
    if (error) {
        console.error('Error reading the JSON file:', error);
        return;
    }

    const inputData = JSON.parse(fileData);


    const decodeNumber = (value, base) => parseInt(value, base);


    const extractRoots = (data) => {
        const rootsArray = [];
        for (const key in data) {
            if (key !== 'keys') {
                const base = parseInt(data[key].base, 10);
                const decodedValue = decodeNumber(data[key].value, base);
                const xValue = parseInt(key);
                rootsArray.push({ x: xValue, y: decodedValue });
            }
        }
        return rootsArray;
    };


    const roots = extractRoots(inputData);


    const lagrangePolynomial = (xi, roots) => {
        let product = 1;
        for (const root of roots) {
            if (root.x !== xi) {
                product *= (0 - root.x) / (xi - root.x);
            }
        }
        return product;
    };


    const calculateConstantTerm = (roots) => {
        let constantTerm = 0;
        for (const root of roots) {
            const lagrangeFactor = lagrangePolynomial(root.x, roots);
            constantTerm += root.y * lagrangeFactor;
        }
        return constantTerm;
    };


    const secretConstant = calculateConstantTerm(roots);
    const roundedConstant = Math.round(secretConstant);
    console.log('The constant term (c) is:', roundedConstant);
});