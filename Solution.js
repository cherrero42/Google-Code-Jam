function readInput() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    
    let problem = {
        T: 0,
        testCases: []
    };
    
    let cT = {
        mp: [],
        words: []
    };
    
    let readingmp = true;
    let wordsLeftToRead = 0;
    rl.on('line', function (line) {
        if (problem.T === 0) {
            problem.T = Number(line);
        } else if (readingmp) {
            cT.mp = line.split(' ').map(num => Number(num));
            readingmp = false;
        } else if (wordsLeftToRead > 0) {
            cT.words.push(line);
            wordsLeftToRead--;
            if (wordsLeftToRead === 0) {
                problem.testCases.push(cT);
                cT = {
                    mp: [],
                    words: []
                };
                readingmp = true;
            }
        } else {
            wordsLeftToRead = Number(line);
        }
        if (problem.testCases.length === problem.T) {
            rl.close()
        }
    })
    .on('close', () => {
        sP(problem);
        process.exit();
    });
}
    
function sP(problem) {
    for (let i = 0; i < problem.T; i++) {
        const mp = problem.testCases[i].mp;
        const words = problem.testCases[i].words;
        const enc = new Set();
        
        for (let j = 0; j < words.length; j++) {
            let encodedWord = '';
            for (let k = 0; k < words[j].length; k++) {
                const letter = words[j][k];
                encodedWord += mp[letter.charCodeAt(0) - 65];
            }
            if (enc.has(encodedWord)) {
                console.log(`Case #${i + 1}: YES`);
                break;
            } else {
                enc.add(encodedWord);
            }
            if (j === words.length - 1) {
                console.log(`Case #${i + 1}: NO`);
            }
        }
    }
}
 
readInput();