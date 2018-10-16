# [fit] __RxJS__ is far from dead
# [fit] Long live __MobX__


[.footer: @_maxgallo ]
^ - rise your hand if you use RxJS in production
- rise your hand if you use MobX in production

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

#[fit] Introducing __MobX__
<br/>

> a battle tested, simple and scalable
> state management library
-- Michel Weststrate

---

#[fit] Introducing __RxJS__
<br/>

_Part of the_ Reactive X _Family_

> API for asynchronous programming
with observable streams

---

[.build-lists: true]

#[fit] _Here's_ __the plan__
<br/>
  
1. _Reinventing_ MobX
- _Reinventing_ RxJS
- All _for_ One _and_ One _for_ All

---

![right](images/me1996.jpg)

# [fit] Reinventing
## [fit] the wheel

## _by_

# __taking things apart__

^ - This is me when I was six
- I like to understand things by taking them apart
- and watch inside to understand how they work

---

![fill](images/bg.jpg)
#[fit] Reinventing __MobX__

---

# __MobX__ code

```javascript
const { observable, autorun } = require('mobx');

const okComputer = observable({
    title: "OK Computer",
    year: 1997,
    playCount: 0
});

autorun(() => {
	console.log(`Ok Computer PlayCount: ${okComputer.playCount}`)
}); // Ok Computer PlayCount: 0

okComputer.playCount = 2;  // Ok Computer PlayCount: 2
okComputer.playCount = 20; // Ok Computer PlayCount: 20
```

---

[.build-lists: true]
# __MobX__ code _first impressions_

<br/>

- Syntax _is close to the language_
- _No explicit_ Subscription
- transparent _reactive programming_

---

💡 _let's reinvent_ MobX 

---

[.build-lists: true]
# __MobX__ *from the* inside

- _Doesn't care about the_ past
- _act as a_ proxy in front of JavaScript
- _All reactions are_ Synchronous
- _use_ Derivation Graph

^ Meta programming with ES6 Proxies

---

# __MobX *Deep Dive*__  Computed Properties

[.code-highlight: 9-14]

```javascript
const { observable, autorun, computed } = require('mobx');

const okComputer = observable({
    title: "OK Computer",
    year: 1997,
    playCount: 0
});

const allInfo = computed(() => okComputer.title + okComputer.playCount);

autorun(() => { console.log(allInfo) }); // Ok Computer0

okComputer.playCount = 2;  // Ok Computer2
okComputer.playCount++;    // Ok Computer3
```

^ - Computed values are observables

---

# __MobX *Deep Dive*__ Derivation Graph

<br />
<br />
<br />
<br />
<br />
<br />
_Creation_ Flow _<---_ __vs__ _---> Reactions_ Flow

![original 150%](diagrams/derivationGraph/derivationGraph.pdf)

^ - First time from right to left
then left to right for changes

---

![fill](images/bg.jpg)
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
// odd: 1, odd: 3, odd: 5, Completed!
```
---

[.build-lists: true]
# __RxJS__ code _first impressions_

- Syntax _is library specific_
- Explicit Subscription
- Observable _[TC39 stage 1](https://github.com/tc39/proposals#stage-1)_
- Pipeline operator _[TC39 stage 1](https://github.com/tc39/proposals#stage-1)_

^ MutationObserver is a method for observing and reacting to changes to the DOM.
It's already available in many browser.

---

💡 _let's reinvent_ RxJS

---

# __RxJS *Operators*__

<br />
<br />
<br />
<br />
<br />
<br />
_Operator_ 1 _-->_> _Operator_ 2 _-->_> _Operator_ 3

![original 150%](diagrams/rxjsCode/rxjsCode.pdf)

---

[.build-lists: true]
# __RxJS__ *from the inside*


- _Made of_ reusable parts > **Streams**
- custom operators
- Lazy evaluation
- _Offer a_ Standard contract _between parts_
- Synchronous _by default_ > **Schedulers**

<!--

---

# __RxJS *Deep Dive*__ Cold & Hot Observables

❄️ Cold Observable _The producer is inside the observer_ 

🔥 Hot Observable _The producer is outside the observer_

-->

---

# __RxJS *Deep Dive*__ Schedulers

> Schedulers in RxJS are things that control the order of event emissions (to Observers) and the speed of those event emissions.
-- André Staltz

<br />
<br />
Queue __*/*__ Asap __*/*__ Async __*/*__ AnimationFrame __*/*__ VirtualTime

---

![fill](images/bg.jpg)
#[fit] All _for_ One _and_ One _for_ All

---

| | __Paradigm__ | __Execution__ | __Syntax__ | __Observables__ |
| :---: | :---: | :---: | :---: | :---: |
| __MobX__ | Transparent _Reactive Programming_ | _Sync_ | _Plain Javascript_ | _Observable Values_ |
| __RxJS__ | Event Stream _Functional Reactive Programming_ | _Sync & <br/> Async_  | _Library Specific*_ | _Observable Events_ |

---

[.build-lists: true]

#[fit] When _should I use_ __MobX__ ?

- learning curve
- values, _not events_
- _Easy representation of_ application state
- state = __derivation (__ _previous State_ __)__

---

[.build-lists: true]

#[fit] When _should I use_ __RxJS__ ?

<br />

- events & values
- _work with_ time
- low-level control

---

[.build-lists: true]
#[fit] Can _I use_ __both__ ?

__Yes!__


1. __*RxJS*__ _handles an_ Heavy Task
2. _it changes the_ Application State, _managed by_ __*MobX*__
3. Reaction: _the view is updated_

---

### [fit] Can _I use_ __both__ ?
#[fit] __real life__
#[fit] __example__

Application State > __MobX__
 
Scroll based animations > __RxJS__

![right fit autoplay mute loop](videos/dazn.mp4)

---

## __Discover more__ _about_ [MobX](https://github.com/mobxjs/mobx) _&_ [RxJS](https://github.com/ReactiveX/rxjs/) 📖

- [Transparent Reactive Programming (meteor)](https://github.com/meteor/docs/blob/version-NEXT/long-form/tracker-manual.md)
- [TFRP Discussion](https://github.com/mobxjs/mobx/issues/220)
- [MobX in-depth explanation __Michel Weststrate__](https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254)
- [MobX autorun runtime subscription] (https://github.com/mobxjs/mobx/issues/248)

- [Reactive Programming Introduction __André Stalz__](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [Building Observables __Ben Lesh__](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87)
- [Building yur own Observable __Todd Motto__](https://toddmotto.com/rxjs-observables-observers-operators)
```

---

#[fit] Thank __you__

<br />

_slides_ [github.com/maxgallo/talk-rxjs-mobx](https://github.com/maxgallo/talk-rxjs-mobx)

_twitter_ @\_maxgallo
_other_ maxgallo.io







