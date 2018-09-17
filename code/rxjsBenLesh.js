// function from(arrayEvent) {
    // return {
        // subscribe: (onNext, onError, onEnd) => {
            // arrayEvent.forEach(onNext);
            // onEnd();
        // }
    // };
// }


// function myObservable(observer) {
    // observer.next(1);
    // observer.next(2);
    // observer.next(3);
    // setTimeout(() => {
        // observer.next(4);
        // observer.complete();
    // }, 1000);
// }


class DataEmitter {
    constructor() {
        let i = 0;
        this.intervalId = setInterval(() => this.emit(i++), 200);
    }
    emit(number) {
        const limit = 10;
        this.ondata(number);

        if (number === limit) {
            this.oncomplete();
            this.destroy();
        }
    }
    destroy() {
        clearInterval(this.intervalId);
    }
}

function createObservable(observer) {
    const datasource = new DataEmitter();
    datasource.ondata = e => observer.next(e);
    datasource.oncomplete = () => observer.complete();

    return () => {
        datasource.destroy();
    };
}

const destroy = createObservable({
    next: value => console.log(value),
    error: err => console.error(err),
    complete: () => console.log('end')
});

setTimeout(destroy, 1500);
