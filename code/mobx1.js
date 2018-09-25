// const { observable, autorun } = require('mobx');

let calledObservables = [];
const reactions = {};

function observable(objectToObserve) {
    const observableObject = {};

    const observablePrefix = Math.random();
    function getObservableId(key) {
        return observablePrefix + key;
    }

    Object.keys(objectToObserve).forEach( key => {
        Object.defineProperty(
            observableObject,
            key,
            {
                get() {
                    calledObservables.push(getObservableId(key))
                    return objectToObserve[key];
                },
                set(value) {
                    objectToObserve[key] = value;
                    reactions[getObservableId(key)].forEach(func => func());
                }
            }
        )

    })

    return observableObject;
}

function autorun(runner) {
    // 1. track which observable I call during execution
    calledObservables = [];
    runner();
    // 2. re-evaluate the function every time one of those observable change
    calledObservables.forEach(observableId => {
        reactions[observableId] = reactions[observableId] || [];
        reactions[observableId].push(runner);
    });
}

// -------------------------------

const album1 = observable({
    title: "OK Computer",
    year: 1997,
    playCount: 0
});

const album2 = observable({
    title: "Rainbows",
    year: 2007,
    playCount: 0
});

autorun(() => { console.log(`Play Count1: ${album1.playCount}`)});
autorun(() => { console.log(`Play Count2: ${album2.playCount}`)});

console.log('\n reactions \n');

album1.playCount = 2;
album1.playCount = 20;
album2.playCount = 3;

