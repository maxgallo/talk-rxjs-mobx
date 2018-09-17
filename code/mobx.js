let observablesCount = 0;
const reactions = {};
const accessedObservableKeys = [];

function observable(obj) {
    const observableId = `ObservableMap@${observablesCount++}`;

    const observableObject = {
        set: (key, value) => {
            obj[key] = value;
            (reactions[`${observableId}|${key}`] || []).forEach(reaction => reaction());
        },
    }

    Object.keys(obj)
        .forEach(key => {
            Object.defineProperty(
                observableObject,
                key,
                {
                    get: function() {
                        accessedObservableKeys.push(`${observableId}|${key}`);

                        const getter = Object.getOwnPropertyDescriptor(obj, key).get;
                        if (getter) {
                            // computed
                            return getter();
                        }
                        return obj[key];
                    }
                }
            );
        });

    return observableObject;
}

function track(func) {
    accessedObservableKeys.length = 0;
    func();

    const localAccessedObservableKeys = [...accessedObservableKeys];
    return localAccessedObservableKeys;
}

function autorun(reactionRunner) {
    const trackedAccesses = track(reactionRunner);

    trackedAccesses.forEach(accessedObservableKey => {
        reactions[accessedObservableKey] = reactions[accessedObservableKey] || [];
        reactions[accessedObservableKey].push(reactionRunner);
    });

    return () => {
        trackedAccesses.forEach(accessedObservableKey => {
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

const library = observable({
    get allPlayCount() {
        return album1.playCount + album2.playCount;
    }
});

const dispose1 = autorun(() => {
    console.log(`Ok Computer play count: ${album1.playCount}`);
});

const dispose2 = autorun(() => {
    console.log(`In Rainbows play count: ${album2.playCount}`);
});

const dispose3 = autorun(() => {
    console.log(`All count: ${library.allPlayCount}`);
});

console.log('----start-reactions----');

// dispose1();
// dispose2();
// dispose2();
album1.set('playCount', 2);
album2.set('playCount', 20);
album2.set('playCount', 300);
