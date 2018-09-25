const reactions = {};
const accessedObservableKeys = [];

function observable(obj) {
    // generate observable ids
    const observablePrefix = `ObservableMap@${Math.random()}`;
    function getObservableId(key) {
        return `${observablePrefix}|${key}`; // ObservableMap@0.6101384306883373|playCount
    }

    // on every set, trigger all the reactions
    const observableObject = {
        set: (key, value) => {
            obj[key] = value;
            (reactions[getObservableId(key)] || []).forEach(
                reaction => reaction()
            );
        },
    }

    // on every get track accessed
    Object.keys(obj)
        .forEach(key => {
            Object.defineProperty(
                observableObject,
                key,
                {
                    get: function() {
                        accessedObservableKeys.push(getObservableId(key));

                        // // computed
                        // const getter = Object.getOwnPropertyDescriptor(obj, key).get;
                        // if (getter) {
                            // return getter();
                        // }
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
    return accessedObservableKeys;
}

function autorun(reactionRunner) {
    console.log('');
    const trackedAccesses = track(reactionRunner);
    console.log('autorun', trackedAccesses);

    // add reaction for every observable
    trackedAccesses.forEach(accessedObservableKey => {
        // console.log('====> tracking accessedObservableKey: ', accessedObservableKey);
        reactions[accessedObservableKey] = reactions[accessedObservableKey] || [];
        reactions[accessedObservableKey].push(reactionRunner);
    });

    return () => {
        // dismiss reaction for every observable
        trackedAccesses.forEach(accessedObservableKey => {
            reactions[accessedObservableKey] = reactions[accessedObservableKey].filter(
                func => func != reactionRunner
            );
        });
    }
}

function computed(computedFunction) {
    return {
        get() {
            return computedFunction();
        }
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

const allPlayCount = computed(() => album1.playCount + album2.playCount);

const dispose1 = autorun(() => {
    console.log(`Ok Computer play count: ${album1.playCount}`);
});

const dispose2 = autorun(() => {
    console.log(`In Rainbows play count: ${album2.playCount}`);
});

const dispose3 = autorun(() => {
    console.log(`All Album play count: ${allPlayCount.get()}`);
});


console.log('');
console.log('----start-reactions----');
console.log('');

// dispose1();
// dispose2();
//
album1.set('playCount', 2);
album2.set('playCount', 20);
// album2.set('playCount', 300);
