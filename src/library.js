// Circle
const circle = (cx = 0, cy = 0, r, stroke = "black", fill = "none") => {
    return `
        <circle cx="${cx}" cy="${cy}" r="${r}" stroke=${stroke} fill=${fill} />
    `;
}

// Ellipse
const ellipse = (cx = 0, cy = 0, rx, ry, stroke = "black", fill = "none") => {
    return `
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" stroke=${stroke} fill=${fill} />
    `;
}

// Rectangle
const rect = (x = 0, y = 0, width, height, stroke = "black", fill = "none") => {
    return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" stroke=${stroke} fill=${fill} />
    `;
}

// Polygon
const polygon = (points, stroke = "black", fill = "none") => {
    let pointsList = ``;

    points.forEach(e => {
        pointsList += `${e} `;
    });

    return `
        <polygon points="${pointsList}" stroke=${stroke} fill=${fill} />
    `;
}

// Line
const line = (x1, y1, x2, y2, stroke = "black") => {
    return `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke=${stroke} />
    `;
}

// Polyline
const polyline = (points, stroke = "black") => {
    let pointsList = ``;

    points.forEach(e => {
        pointsList += `${e} `;
    });

    return `
        <polyline points="${pointsList}" stroke="${stroke}" fill="none" />
    `;
}

// Path
const path = (points, stroke = "black") => {
    let pointsList = "";

    for (let i = 0; i < points.length - 1; i = i + 2) {
        if (i < 1) {
            pointsList += `M${points[i]} ${points[i + 1]} `;
        }
        else {
            pointsList += `L${points[i]} ${points[i + 1]} `;
        }
    }

    pointsList += `Z`;

    return `
        <path 
            d="${pointsList}"
            stroke="${stroke}" fill="none" />
    `;
}

// Rotate
const rotate = (shape, x = 0, y = 0, rotation) => {
    return `
    <g transform="rotate(${rotation}, ${x}, ${y})">
        ${shape}
    </g>
    `;
}

// Scale
const scale = (shape, x = 0, y = 0) => {
    return `
    <g transform="scale(${x},${y})">
        ${shape}
    </g>
    `;
}

//Translate
const translate = (shape, x = 0, y = 0) => {
    return `
    <g transform="translate(${x},${y})">
        ${shape}
    </g>
    `;
}

// Rows
const rows = (shape, num_r, tx) => {
    let shapes = [];

    for (let i = 0; i < num_r; i++) {
        shapes.push(translate(shape, i * tx, 0));
    }

    return `<g>${shapes.join("\n")}</g>`;
}

// Columns
const columns = (shape, num_c, ty) => {
    let shapes = [];

    for (let i = 0; i < num_c; i++) {
        shapes.push(translate(shape, 0, i * ty));
    }

    return `<g>${shapes.join("\n")}</g>`;
}

// Interruptions
const interruptions = (shape, _row = 10, _col = 10, _random = 1) => {
    let data = "";

    // Parameters
    const ROWS = _row;
    const COL = _col;
    let intensity = _random;

    // Shape creation
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COL; c++) {
            let rotation = Math.floor(Math.random() * 180);
            let random = Math.random() * intensity;

            if (random < 0.4) {
                data += translate(
                    rotate(shape, 0, 0, rotation),
                    (c * 10),
                    (r * 10));
            }
        }
    }

    return data;
}

// Schotter
const schotter = () => {
    // Svg string
    let data = "";

    const RECT_SIZE = 44;
    const ROWS = 20;
    const COL = 12;

    let intensity = 0.02;


    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COL; c++) {
            let rotation = Math.floor(Math.random() * 180) * (r * intensity);

            data += translate(
                rotate(rect(70, 0, RECT_SIZE, RECT_SIZE, "black", "none"), 0, 0, rotation),
                (c * RECT_SIZE),
                (r * RECT_SIZE));
        }
    }

    return data;
}

// (Des)Ordres
const desOrdres = () => {
    // Number of rows and columns
    const ROW = 15;
    const COL = 15;

    // Min/max rectangles
    const MIN_RECT = 4;
    const MAX_RECT = 11;
    const RANGE_RECT = MAX_RECT - MIN_RECT;

    // Min/max starting x & y values
    const MAX = 42;
    const MIN = -2;
    const SIZE = MAX + Math.abs(MIN);
    let range1 = 3;
    let range2 = 4;

    // List of previous points
    let prevPoints = [MIN, MIN, MAX, MIN, MAX, MAX, MIN, MAX];
    let currentPoints;

    // Svg string
    let data = "";

    // Initialize number of rectangles
    let rectangles = Math.floor(Math.random() * RANGE_RECT) + MIN_RECT;

    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            let first = true;
            for (let i = 0; i < rectangles; i++) {
                // Random range of points
                if (first) {
                    currentPoints =
                        [Math.random() * range1 + prevPoints[0] + (SIZE * c),// Min x
                        Math.random() * range1 + prevPoints[1] + (SIZE * r), // Min y
                        Math.random() * range1 + prevPoints[2] - range1 + (SIZE * c), // Max x
                        Math.random() * range1 + prevPoints[3] + (SIZE * r), // Min y
                        Math.random() * range1 + prevPoints[4] - range1 + (SIZE * c), // Max x
                        Math.random() * range1 + prevPoints[5] - range1 + (SIZE * r), // Max y
                        Math.random() * range1 + prevPoints[6] + (SIZE * c), // Min x
                        Math.random() * range1 + prevPoints[7] - range1 + (SIZE * r)]; // Max y
                }
                else {
                    currentPoints =
                        [Math.random() * range2 + prevPoints[0],// Min x
                        Math.random() * range2 + prevPoints[1], // Min y
                        Math.random() * range2 + prevPoints[2] - range2, // Max x
                        Math.random() * range2 + prevPoints[3], // Min y
                        Math.random() * range2 + prevPoints[4] - range2, // Max x
                        Math.random() * range2 + prevPoints[5] - range2, // Max y
                        Math.random() * range2 + prevPoints[6], // Min x
                        Math.random() * range2 + prevPoints[7] - range2]; // Max y
                }

                // Add each rectangle to  the svg string
                data += path(currentPoints, "black");

                prevPoints = currentPoints;
                first = false;
            }
            prevPoints = [MIN, MIN, MAX, MIN, MAX, MAX, MIN, MAX];
            rectangles = Math.floor(Math.random() * RANGE_RECT) + MIN_RECT;
        }
    }

    return data;
}

// Rouge
const rouge = (width, height, vb) => {
    return `
        ${rotate(rect(1, 35, 25, 25, "none", "#BE2A2A"), [5, 1, 60])}
        ${rotate(rect(20, 10, 25, 25, "none", "#6B2933"), [-26, 20, 35])}
        ${rotate(rect(55, 45, 25, 25, "none", "#6B2933"), [4, 55, 70])}
        ${rotate(rect(51, 55, 25, 25, "none", "#6B2933"), [-25, 51, 80])}
        ${rotate(rect(30, 3, 25, 25, "none", "rgba(190,42,42,0.98)"), [-3, 55, 3])}
        ${rotate(rect(71, 74, 25, 25, "none", "#BE2A2A"), [-48, 71, 100])}
        ${rotate(rect(12, 20, 25, 25, "none", "#E84139"), [45, 24, 32])}
        ${rotate(rect(45, 25, 25, 25, "none", "#E84139"), [-10, 57, 37])}
        ${rotate(rect(74, 75, 25, 25, "none", "#E42524"), [14, 100, 75])}
    `;
}