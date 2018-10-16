// const { observable, autorun } = require('mobx');
const accessedObservables = [];
const derivationGraph = {};

function observable(targetObject){
    const observableObject = {}

    const unique = Math.random()
    function getObservableId(key){
        return unique + key;
    }


    Object.keys(targetObject).forEach(objectKey => {
        Object.defineProperty(
            observableObject,
            objectKey,
            {
                get(){
                    accessedObservables.push(getObservableId(objectKey))
                    return targetObject[objectKey];
                },
                set(value){
                    targetObject[objectKey] = value;
                    derivationGraph[getObservableId(objectKey)].forEach(runner => {
                        runner()
                    })
                }
            }
        )
    })


    return observableObject;
}

function autorun(runner){
    accessedObservables.length = 0;
    runner();
    console.log(accessedObservables);
    accessedObservables.forEach(objectId => {
        derivationGraph[objectId] = derivationGraph[objectId] || [];
        derivationGraph[objectId].push(runner)
    });
}

const album1 = observable({
    title: "OK Computer",
    year: 1997,
    playCount: 0
});

const album2 = observable({
    title: "In Rainbows",
    year: 2020,
    playCount: 0
});

autorun(() => { console.log(`Album 1 PlayCount: ${album1.playCount}`)});
autorun(() => { console.log(`Album 2 PlayCount: ${album2.playCount}`)});

console.log('\n reactions \n');

album1.playCount = 2;
album1.playCount = 20;

album2.playCount = 2000


console.log('is sync?')
