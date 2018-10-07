# [fit] __RxJS__ is far from dead
# [fit] Long live __MobX__


[.footer: @_maxgallo ]

---

![right](images/me.jpg)

# Hi 👋🏻
#[fit] I'm __Max__* Gallo

_About me:_ 🍝 💻 🇬🇧 🎶 🏍 📷 ✈️ ✍️

_Principal Engineer_ @ DAZN

<br />

_twitter:_ @\_maxgallo
_more:_ maxgallo.io

[.footer: or __Massimiliano__, if you like italian spelling challenges]

---

[.build-lists: true]

#[fit] _Here's_ __the plan__
<br/>
  
1. Diassemble _the libraries_
- Analyse _the implementation_
- Understand _the benefits_

---

# Context

| | __*First commit*__ | __*GitHub Stars*__ | __*Weekly Downloads*__ | __*Latest Version*__ |
| :---: | :---: | :---: | :---: | :---: |
| __RxJS__ | _Sep_ 2012 | 14,794 | 3,849,604 | 6.3.2 |
| __MobX__ | _Mar_ 2015 | 16,779 | 170,615 | 5.1.1 |

---

# Disassemble

---

# **Story**

Photo of myself disassemblying something.

Story about when some smoke went out from the VHS Recorder I was "Repairing".

Since then I've always been curious about how things are made inside

---

# __MobX__ code

```javascript
const { observable, autorun } = require('./lib/mobx.js');

const album1 = observable({
    title: "OK Computer",
    year: 1997,
    playCount: 0
});

autorun(() => {
	console.log(`Album 1 PlayCount: ${album1.playCount}`)
});

album1.playCount = 2;  // Alubm 1 PlayCount: 2
album1.playCount = 20; // Alubm 1 PlayCount: 20
```

---

# __MobX__ Live coding

---

# __MobX__ implementation

- Syntax is close to language
- Doesn't care about the past
- Transparent Functional Reactive Programming
- Lazy evaluation, no autorun no party
- Synchronous

---

# __MobX *Deep Dive*__ 
##[fit] Transparent Functional Reactive Programming

```javascript
autorun(() => {
	if (dinner.isReady) {
		shout('Dinner is ready')
	} 
});
```

_No explicit subscribe_

---

# __RxJS__ code

```javascript
const { from } = require('rxjs');
const { map, filter } = require('rxjs/operators');

const observable = from([1, 2, 3, 4, 5])
    .pipe(
        map(x => x + 1),
        map(x => x - 1),
        filter(x => x % 2 === 0),
        map(x => x * 100)
    );

observable.subscribe(
    value => console.log('next:', value),
    error => console.error(error),
    () => console.log(),
);
```

---

# __RxJS__ Live coding

---

# __RxJS__ implementation

- Made up reusable components -> Streams
- Flexibility with custom operators
- Lazy evaluation, no emit before subscribe
- Synchronous by default (can be async too, schedulers)
- Cold Observables (and Hot)

---

# __RxJS Deep Dive:__ Observables
Cold & Hot Observables

If the producer is inside the observer, then it's cold, if it's outside it's hot.

_(in MobX everything is hot)_

---

# All together

| | __Paradigm__ | __Synchrounicity__ | __Syntax__ | __Observables__ |
| :---: | :---: | :---: | :---: | :---: |
| __RxJS__ | _Reactive Streams_ | _Synch by default & Schedulers_  | _Custom (pipable operators)_ | _Cold & Hot Observables_ | 
| __MobX__ | _Transparent Functional Reactive Programming_ | _Synchronous_ | _Close to Language_ | _Only Hot_ |

---

# Common ideas

- Syncronous by default



---

# __MobX__ intro
## Transparent Reactive Programming

```javascript
import { observable, autorun } from 'mobx';

class Song {
    @observable playCount = 0;
}

const starman = new Song();

autorun(() => {
    console.log(`Starman new play count: ${starman.playCount}`);
    // Starman new play count: 0
});

starman.playCount += 1; // Starman new play count: 1
starman.playCount += 1; // Starman new play count: 2
starman.playCount += 1; // Starman new play count: 3

```

---

# One for all,
# and all for one

- Performance


---

# TakeAways

MobX Observables


---

# Links

[Reactive Programming Introduction - André Stalz](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

[Transparent Reactive Programming (meteor)](https://github.com/meteor/docs/blob/version-NEXT/long-form/tracker-manual.md)

[TFRP Discussion](https://github.com/mobxjs/mobx/issues/220)

[Building Observables - Ben Lesh](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87)

https://medium.com/@mweststrate/pure-rendering-in-the-light-of-time-and-state-4b537d8d40b1
https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254
https://github.com/mobxjs/mobx/issues/248

[Building yur own Observable](https://toddmotto.com/rxjs-observables-observers-operators)
https://github.com/mobxjs/mobx/wiki/Mobx-vs-Reactive-Stream-Libraries-(RxJS,-Bacon,-etc)








