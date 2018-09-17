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

function createObservable() {
    return ({
        subscribe(onNext, onError, onComplete) {
            const datasource = new DataEmitter();

            datasource.ondata = onNext;
            datasource.oncomplete = onComplete;

            return () => datasource.destroy();
        }
    });
}

const destroy = createObservable()
    .subscribe(
        value => console.log(value),
        err => console.error(err),
        () => console.log('end')
    );

// setTimeout(destroy, 1500);
