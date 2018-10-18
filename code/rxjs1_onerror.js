// const { from } = require('rxjs');
// const { map, filter } = require('rxjs/operators');

function from(initialData){
    return {
        pipe: (...pipeFunctions) => {
            return {
                subscribe: (onNext, onError, onComplete) => {
                    let errorFired = false;
                    const wrappedOnError = () => {
                        errorFired = true;
                        onError()
                    }
                    const dataObservable = createObservable(x => {
                        // initialData.forEach(x)
                        while(initialData.length && !errorFired) {
                            x(initialData.pop())
                        }
                    })

                    let currentObservable = dataObservable;

                    pipeFunctions.forEach(pipeFunc => {
                        currentObservable = pipeFunc(currentObservable, wrappedOnError)
                    })

                    currentObservable.subscribe(onNext);
                    !errorFired && onComplete();
                }
            }
        }
    }
}

function createObservable(operator) {
    return {
        subscribe: innerOnNext => {
            operator(innerOnNext)
        }
    }
}

function map(mapFunction){
    return (sourceObservable, onError) => {
        const currentObservable = createObservable(destinationNext => {
            sourceObservable.subscribe(value => {
                const newValue = mapFunction(value)
                destinationNext(newValue);
            })
        })
        return currentObservable;
    }
}

function filter(filterFunction){
    return (sourceObservable, onError) => {
        const currentObservable = createObservable(destinationNext => {
            sourceObservable.subscribe(value => {
                let isFilterOk = true;

                try {
                    isFilterOk = filterFunction(value)
                } catch (err) {
                    return onError(err);
                }

                if(isFilterOk){
                    destinationNext(value);
                }
            })
        })
        return currentObservable;
    }
}

const observable = from([1, 2, 3, 4, 5])
    .pipe(
        map(x => x + 1),
        // filter(x => x % 2 === 0),
        filter(x => { throw new Error('I\'m Evil') } ),
        map(x => x - 1),
    );

observable.subscribe(
    val => console.log('odd: ', val),
    // error => console.error(error),
    error => console.log('Error found :('),
    () => console.log('Completed!'),
);
