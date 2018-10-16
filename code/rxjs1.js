// const { from } = require('rxjs');
// const { map, filter } = require('rxjs/operators');

function from(initialData){
    return {
        pipe: (...pipeFunctions) => {
            return {
                subscribe: (onNext, onError, onComplete) => {

                    const dataObservable = createObservable(x => initialData.forEach(x))

                    let currentObservable = dataObservable;

                    pipeFunctions.forEach(pipeFunc => {
                        currentObservable = pipeFunc(currentObservable)
                    })

                    currentObservable.subscribe(onNext);
                    onComplete();
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
    return sourceObservable => {
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
    return sourceObservable => {
        const currentObservable = createObservable(destinationNext => {
            sourceObservable.subscribe(value => {
                if(filterFunction(value)){
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
        filter(x => x % 2 === 0),
        map(x => x - 1),
    );

observable.subscribe(
    val => console.log('odd: ', val),
    error => console.error(error),
    () => console.log('Completed!'),
);
