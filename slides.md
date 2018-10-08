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
  
1. _Reinventing_ MobX
- _Reinventing_ RxJS
- All _for_ One _and_ One _for_ All

---

# **Story**

Photo of myself disassemblying something.

Story about when some smoke went out from the VHS Recorder I was "Repairing".

Since then I've always been curious about how things are made inside

---

#[fit] Reinventing __MobX__

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

# __MobX__ considerations

- Syntax is close to language
- __Transparent__ Functional Reactive Programming

---

_let's reinvent_ MobX

---

# __MobX__ from the inside

- Doesn't care about the past
- I can change my observable can change even if I don't observe it
- Synchronous

---

# __MobX Deep Dive:__ Computed Properties

TODO

---

#[fit] Reinventing __RxJS__

---

# __RxJS__ code

```javascript
const { from } = require('rxjs');
const { map, filter } = require('rxjs/operators');

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
// odd: 1, odd: 2, odd: 3, odd: 4, odd: 5, Completed!
```
---

# __RxJS__ considerations

- Syntax is less familiar than MobX


---

_let's reinvent_ RxJS

---

# __RxJS__ from the inside

- Made up reusable parts -> Streams
- Flexibility with custom operators
- Lazy evaluation, no emit before subscribe
- Synchronous by default (can be async too, schedulers)

---

# __RxJS Deep Dive:__ Cold & Hot

Cold & Hot Observables

If the producer is inside the observer, then it's cold, if it's outside it's hot.

_(in MobX everything is hot)_

---

# __RxJS Deep Dive:__ Schedulers

RxJS is synchronous by default, but can be async too, and can handle a virtual time

This is due to schedulers!

---

# Recap

| | __Paradigm__ | __Synchrounicity__ | __Syntax__ | __Observables__ |
| :---: | :---: | :---: | :---: | :---: |
| __RxJS__ | _Reactive Streams_ | _Synch by default & Schedulers_  | _Custom (pipable operators)_ | _Cold & Hot Observables_ | 
| __MobX__ | _Transparent Functional Reactive Programming_ | _Synchronous_ | _Close to Language_ | _Only Hot_ |

---

# Context

| | __*First commit*__ | __*GitHub Stars*__ | __*Weekly Downloads*__ | __*Latest Version*__ |
| :---: | :---: | :---: | :---: | :---: |
| __RxJS__ | _Sep_ 2012 | 14,794 | 3,849,604 | 6.3.2 |
| __MobX__ | _Mar_ 2015 | 16,779 | 170,615 | 5.1.1 |


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








