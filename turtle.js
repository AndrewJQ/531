/*
    Originally written by Eli Cheramie
*/
// import * as THREE from 'three';

function crossProduct(vector1, vector2) {
    const x = vector1[1] * vector2[2] - vector1[2] * vector2[1];
    const y = vector1[2] * vector2[0] - vector1[0] * vector2[2];
    const z = vector1[0] * vector2[1] - vector1[1] * vector2[0];
    return [x, y, z];
}

function rotateVector(vector, axis, radians) {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const x = axis[0];
    const y = axis[1];
    const z = axis[2];
    const u = vector[0];
    const v = vector[1];
    const w = vector[2];

    const sa = [sin * x, sin * y, sin * z];

    const result = [
        (x * x + (1 - x * x) * cos) * u + (x * y * (1 - cos) - sa[2]) * v + (x * z * (1 - cos) + sa[1]) * w,
        (x * y * (1 - cos) + sa[2]) * u + (y * y + (1 - y * y) * cos) * v + (y * z * (1 - cos) - sa[0]) * w,
        (x * z * (1 - cos) - sa[1]) * u + (y * z * (1 - cos) + sa[0]) * v + (z * z + (1 - z * z) * cos) * w
    ];

    return result;
}

class Turtle {
    constructor(startingRadius, startingPosition) {
        this.vertex = startingPosition;
        this.vertex.radius = startingRadius;
        this.vertex.hasLeaf = false;
        this.direction = [0, 1, 0];
        this.up = [0, 0, 1];
        this.right = [1, 0, 0];
        this.stack = [];
        this.vertices = [[this.vertex]];
        this.verticesIndex = 0;
    }

    forward(distance) {
        const newVertex = [
            this.vertex[0] + this.direction[0] * distance,
            this.vertex[1] + this.direction[1] * distance,
            this.vertex[2] + this.direction[2] * distance,
        ]
        newVertex.radius = this.vertex.radius;
        newVertex.hasLeaf = false;
        this.vertices[this.verticesIndex].push(newVertex);
        this.vertex = newVertex;
    }

    turnRight(angle) {
        const newDirection = rotateVector(this.direction, this.up, -angle);
        const newRight = crossProduct(newDirection, this.up);
        this.direction = newDirection;
        this.right = newRight;
    }

    turnLeft(angle) {
        const newDirection = rotateVector(this.direction, this.up, angle);
        const newRight = crossProduct(newDirection, this.up);
        this.direction = newDirection;
        this.right = newRight;
    }

    pitchUp(angle) {
        const newDirection = rotateVector(this.direction, this.right, -angle);
        const newUp = crossProduct(this.right, newDirection);
        this.direction = newDirection;
        this.up = newUp;
    }

    pitchDown(angle) {
        const newDirection = rotateVector(this.direction, this.right, angle);
        const newUp = crossProduct(this.right, newDirection);
        this.direction = newDirection;
        this.up = newUp;
    }

    rollRight(angle) {
        const newUp = rotateVector(this.up, this.direction, -angle);
        const newRight = crossProduct(this.direction, newUp);
        this.up = newUp;
        this.right = newRight;
    }

    rollLeft(angle) {
        const newUp = rotateVector(this.up, this.direction, angle);
        const newRight = crossProduct(this.direction, newUp);
        this.up = newUp;
        this.right = newRight;
    }

    turnAround() {
        this.turnRight(Math.PI);
    }

    pushState() {
        this.stack.push({
            vertex: this.vertex,
            direction: this.direction,
            up: this.up,
            right: this.right,
        });
    }

    popState() {
        const state = this.stack.pop();
        this.verticesIndex++;
        this.vertex = state.vertex;
        this.vertices[this.verticesIndex] = [this.vertex];
        this.direction = state.direction;
        this.up = state.up;
        this.right = state.right;
    }

    shrinkRadius(factor) {
        this.vertex.radius *= factor;
    }

    addLeaf() {
        this.vertex.hasLeaf = true;
    }
}

export { Turtle }

/* Example usage */

function example() {
    let startRadius = 10;
    let turtle = new Turtle(startRadius, [0, 0, 0]);

    let distance = 2;
    turtle.forward(distance);
    let angle = Math.PI / 8;
    turtle.turnLeft(angle);
    turtle.forward(distance);
    turtle.pitchDown(angle);
    turtle.forward(distance);
    turtle.rollRight(angle);
    turtle.forward(distance);
    turtle.turnAround();
    turtle.forward(distance);

    let points = turtle.vertices;
    console.log(points);
    // [
    //     [
    //         [
    //             0,
    //             0,
    //             0
    //         ],
    //         [
    //             0,
    //             2,
    //             0
    //         ],
    //         [
    //             -0.7653668647301796,
    //             3.8477590650225735,
    //             0
    //         ],
    //         [
    //             -1.4724736459167271,
    //             5.554865846209121,
    //             0.7653668647301796
    //         ],
    //         [
    //             -2.1795804271032746,
    //             7.261972627395669,
    //             1.5307337294603591
    //         ],
    //         [
    //             -1.472473645916727,
    //             5.554865846209122,
    //             0.7653668647301796
    //         ]
    //     ]
    // ]
}

example();