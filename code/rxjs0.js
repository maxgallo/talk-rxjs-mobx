// const { from } = require('rxjs');
// const { map, filter } = require('rxjs/operators');

// 1 - from, pipe with 1 map
// 2 - multiple maps
// 3 - filter

function from(elementArray) {
    return {
        pipe: (...functions) => ({
            subscribe: (onNext, onError, onComplete) => {

                const dataObservable = {
                    subscribe: (onNext) => {
                        elementArray.forEach(onNext);
                    }
                }

                let observable = dataObservable;

                for (let i in functions) {
                    const pipeFunc = functions[i];
                    observable = pipeFunc(observable)
                }

                observable.subscribe(onNext);

                onComplete();
            },
        }),
    }
}

function createObservable(operator) {
    return {
        subscribe: onNext => operator(onNext),
    }
}

function map(mapFunction) {
    return sourceObservable => {
        const observable = createObservable(destinationNext => {
            sourceObservable.subscribe(
                x => {
                    const y = mapFunction(x)
                    destinationNext(y);
                }
            )
        });
        return observable;
    }
}

function filter(filterFunction) {
    return sourceObservable => {
        const observable = createObservable(destinationNext => {
            sourceObservable.subscribe(
                x => {
                    if (filterFunction(x)) {
                        destinationNext(x);
                    }
                }
            )
        });
        return observable;
    }
}

const observable = from([1, 2, 3, 4, 5])
    .pipe(
        map(x => x + 1),
        map(x => x - 1),
        filter(x => x % 2 === 0),
        map(x => x * 100),
    );

observable.subscribe(
    val => console.log('two-', val),
    error => console.error(error),
    () => console.log(),
);
