let observablesCount = 0;
const reactions = {};
const accessedObservableKeys = [];

function observable(obj) {
    const localObj = {...obj};
    const observableId = `ObservableMap@${observablesCount++}`;

    const observableObject = {
        set: (key, value) => {
            localObj[key] = value;
            (reactions[`${observableId}|${key}`] || []).forEach(reaction => reaction());
        },
    }

    Object
        .keys(localObj)
        .forEach(key => {
            Object.defineProperty(
                observableObject,
                key,
                {
                    get: function() {
                        accessedObservableKeys.push(`${observableId}|${key}`);
                        return localObj[key];
                    },
                }
            );
        });

    return observableObject;
}

function autorun(reactionRunner) {
    accessedObservableKeys.length = 0;
    reactionRunner();

    const localAccessedObservableKeys = [...accessedObservableKeys];
    localAccessedObservableKeys.forEach(accessedObservableKey => {
        reactions[accessedObservableKey] = reactions[accessedObservableKey] || [];
        reactions[accessedObservableKey].push(reactionRunner);
    });

    return () => {
        localAccessedObservableKeys.forEach(accessedObservableKey => {
            reactions[accessedObservableKey] = reactions[accessedObservableKey].filter(
                func => func != reactionRunner
            );
        });
    }
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

const dispose1 = autorun(() => {
    console.log(`Ok Computer play count: ${album1.playCount}`);
});

const dispose2 = autorun(() => {
    console.log(`In Rainbows play count: ${album2.playCount}`);
});

console.log('--end--');

dispose1();
dispose2();
album1.set('playCount', 2);
album2.set('playCount', 20);
album2.set('playCount', 300);
