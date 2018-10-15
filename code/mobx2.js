// const { observable, autorun } = require('mobx');

let accessedObservables = [];
const derivationGraph = {}; // observableId > reaction

function observable(toObserve) {
    const observableObject = {};
    const uniqueId = Math.random();
    function getObservableId(key) {
        return uniqueId + key;
    }

    Object.keys(toObserve).forEach(key => {
        Object.defineProperty(
            observableObject,
            key,
            {
                get() {
                    accessedObservables.push(getObservableId(key));
                    return toObserve[key];
                },
                set(value) {
                    toObserve[key] = value;
                    (derivationGraph[getObservableId(key)] || []).forEach(
                        func => func()
                    );
                },
            }
        );
    });


    return observableObject;
}

function autorun(runner) {
    accessedObservables = [];
    runner();
    accessedObservables.forEach(objectId => {
        derivationGraph[objectId] = derivationGraph[objectId] || [];
        derivationGraph[objectId].push(runner);
    });
}

const album1 = observable({
    title: "OK Computer",
    year: 1997,
    playCount: 0
});

const album2 = observable({
    title: "In Rainbows",
    year: 2007,
    playCount: 0
});

autorun(() => { console.log(`Album 1 PlayCount: ${album1.playCount}`)});
autorun(() => { console.log(`Album 2 PlayCount: ${album2.playCount}`)});

console.log('\n reactions \n');

album1.playCount = 2;
album1.playCount = 20;
album2.playCount = 3;
album1.playCount = 200;

console.log(album1.playCount);

