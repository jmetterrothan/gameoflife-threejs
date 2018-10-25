/**
 * A set of available shapes of common and known patterns 
 */
export default [
    { name: "Default", points: [ { x: 0, y: 0 } ] },
    { name: "Pulsar", points: [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 } ] },
    { name: "Glider", points: [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 2 }  ] },
    { name: "Blinker", points: [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 } ] },
    { name: "Beacon", points: [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 2, y: -3 }, { x: 3, y: -3 }, { x: 3, y: -2 } ] },
    { name: "R-Pentomino", points: [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: -1 }, { x: 2, y: 1 } ] },
    { name: "Beehive", points: [ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: -2 } ] },
    { name: "Toad", points: [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 } ] },
    { name: "Snake", points: [ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: 0 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 4, y: 0 } ] },
    { name: "Spaceship", points: [ 
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 },
        { x: 2, y: -1 }, { x: 3, y: -1 },
        { x: 2, y: -2 }, { x: 3, y: -2 },
        { x: -1, y: -3 }, { x: 1, y: -3 }, { x: 4, y: -3 }, { x: 6, y: -3 },
        { x: -1, y: -4 }, { x: 6, y: -4 },
        { x: -1, y: -6 }, { x: 6, y: -6 },
        { x: 0, y: -7 }, { x: 1, y: -7 }, { x: 4, y: -7 }, { x: 5, y: -7 },
        { x: 1, y: -8 }, { x: 2, y: -8 }, { x: 3, y: -8 }, { x: 4, y: -8 },
        { x: 2, y: -10 }, { x: 3, y: -10 },
        { x: 2, y: -11 }, { x: 3, y: -11 },
    ] },
    { name: "Blossom", points: [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 3 } ] },
    { name: "Flower", points: [ 
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
        { x: -2, y: -2 }, { x: -2, y: -3 }, { x: -2, y: -4 },
        { x: 0, y: -5 }, { x: 1, y: -5 }, { x: 2, y: -5 },
        { x: 3, y: -2 }, { x: 3, y: -3 }, { x: 3, y: -4 },
    ] }
];