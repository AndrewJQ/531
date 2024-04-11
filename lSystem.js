const { booleans, colors, primitives, transforms } = jscadModeling // modeling comes from the included MODELING library
const { translate } = transforms;

const { intersect, subtract, union } = booleans
const { colorize, colorNameToRgb } = colors
const { cube, cuboid, sphere } = primitives

export const pathThroughSpace = (pathPoints) => {
    // use hullChain to create a path through space
    let spheres = [];
    for (let i = 0; i < pathPoints.length; i++) {
        spheres.push(primitives.cube({
            center: pathPoints[i],
            size: 1
        }));
    }
    return jscadModeling.hulls.hullChain(spheres);
    //return spheres;
}

export const lSystem = (shape) => {
    let data = shape;

    let simplifiedData = [];

    for (let i = 0; i < data.length; i++) {
        data[i].push(0);
    }

    for (let i = 0; i < data.length; i++) {
        let num = 0;

        if (data[i + 1] != null &&
            data[i][1] == data[i + 1][1]) {
            for (let j = i; j < data.length; j++) {
                if (data[j + 1] != null &&
                    data[j][1] == data[j + 1][1]) {
                    num++;
                }
                else {
                    break;
                }
            }
        }
        else if (data[i + 1] != null &&
            data[i][0] == data[i + 1][0]) {
            for (let j = i; j < data.length; j++) {
                if (data[j + 1] != null &&
                    data[j][0] == data[j + 1][0]) {
                    num++;
                }
                else {
                    break;
                }
            }
        }

        //debugger;
        if (num != 0) {
            if (simplifiedData[simplifiedData.length - 1] != data[i]) {
                simplifiedData.push(data[i]);
            }

            if (simplifiedData[simplifiedData.length - 1] != data[i + num]) {
                simplifiedData.push(data[i + num]);
            }

            i += (num - 1);
        }

        //console.log(num)
    }

    simplifiedData.push(data[data.length - 1]);

    console.log(data);
    console.log(simplifiedData);

    return simplifiedData;
}
