/*
  # Demo code for L-systems
*/


// ## An L-System needs...
// variables, constants (alphabet)
// rules (production rules)
// a way to expand a string through iteration
// way to interpret string into visual 

// ## The dragon curve drawn using an L-system.
// variables : F G
// constants : + −
// start  : F
// rules  : (F → F+G), (G → F-G)
// angle  : 90°
let alphabet = ['X', 'Y', 'F', '+', '-', '[', ']'];
let iterations;
let axiom;
let rules;

//----------------------------------------------------

// Hilbert - iterations: 5
export const hilbert = () => {
    iterations = 5;
    axiom = 'X';
    rules = {
        'X': '-YF+XFX+FY-',
        'Y': '+XF-YFY-FX+',
        'F': '',
        '-': '-',
        '+': '+',
        '[': '[',
        ']': ']'
    };
    
}

//----------------------------------------------------

const iterate_once = (lindenmayerString) => {
    let newString = '';
    for (let i = 0; i < lindenmayerString.length; i++) {
        const result = rules[lindenmayerString[i]];
        newString += result || lindenmayerString[i];
    }
    return newString;
}

const iterateNTimes = (n, lindenmayerString) => {
    let newString = lindenmayerString;
    for (let i = 0; i < n; i++) {
        newString = iterate_once(newString);
    }
    return newString;
};

const makeVisual = (options, lindenmayerString) => {
    let theSvgString = '';

    // Basically constants
    let angle = (options.angle || 90) * Math.PI / 180;
    let startingPoint = options.startingPoint || [0, 0];
    let lineLength = options.lineLength || 10;

    // State
    let rotation = 0;
    let points = [startingPoint];

    const moveForward = () => {
        const lastPoint = points[points.length - 1];

        const dx = Math.cos(rotation) * lineLength;
        const dy = Math.sin(rotation) * lineLength;

        points.push([lastPoint[0] + dx, lastPoint[1] + dy]);
    };

    const whatToDo = {
        'X': () => {
            return moveForward();
        },
        'Y': () => {
            return moveForward();
        },
        'F': () => {
            return moveForward();
        },
        '+': () => {
            rotation = rotation - angle;
        },
        '-': () => {
            rotation = rotation + angle;
        },
        '[': () => {
            return;
        },
        ']': () => {
            return;
        }
    };

    for (let i = 0; i < lindenmayerString.length; i++) {
        const toDo = whatToDo[lindenmayerString[i]];
        toDo();
    }


    //console.log(points)


    // return a path moving through all the points
    // return `<polyline points="${points.join(' ')}" 
    //                 fill="none" stroke="black" 
    //                 stroke-width="1px"/>`;

    return points;
};

// start 
hilbert();
const expanded = iterateNTimes(iterations, axiom);

export const hilbertShape = makeVisual({
    lineLength: 1.5,
    angle: 90,
    startingPoint: [0, 50]
}, expanded);

// get result into the svg in the dom
const svg = document.querySelector('svg');
//svg.innerHTML = result;

// let oneStep = iterate_once(axiom);
// debugger;