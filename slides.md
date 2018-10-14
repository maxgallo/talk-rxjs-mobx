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

[.build-lists: true]

#[fit] _Here's_ __the plan__
<br/>
  
1. _Reinventing_ MobX
- _Reinventing_ RxJS
- All _for_ One _and_ One _for_ All

---

![right](images/me1996.jpg)

# [fit] Reinventing
## [fit] the weel

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
- transparent _functional reactive programming_

---

💡 _let's reinvent_ MobX 

---

[.build-lists: true]
# __MobX__ *from the* inside

- _Doesn't care about the_ past
- _act as a_ proxy in front of JavaScript
- _All reactions are_ Synchronous
- Derivation Graph

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

![inline](diagrams/derivationGraph/derivationGraph.pdf)

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
<br/>

- Syntax _is less familiar than MobX_
- Explicit Subscription
- Observable _[TC39 stage 1](https://github.com/tc39/proposals#stage-1)_
- Pipeline operator _[TC39 stage 1](https://github.com/tc39/proposals#stage-1)_

---

💡 _let's reinvent_ RxJS

---

[.build-lists: true]
# __RxJS__ *from the inside*

<br />

- _Made of_ reusable parts > **Streams**
- custom operators
- Lazy evaluation
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

# Side _by_ Side

| | __Paradigm__ | __Execution__ | __Syntax__ | __Observables__ |
| :---: | :---: | :---: | :---: | :---: |
| __MobX__ | Transparent _Functional Reactive Programming_ | _Synchronous_ | _Plain Javascript_ | _Observable Values_ |
| __RxJS__ | Event Stream _Functional Reactive Programming_ | _Synchronous & Asynchronous_  | _Custom*_ | _Observable Events_ | 

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
- events & values
- _work with_ time
- heavy __I/O__ tasks
- low-level control


---

[.build-lists: true]
#[fit] When _should I use_ __both__ ?


1. **RxJS** _handles an_ Heavy Task
2. _it changes the_ Application State, _managed by_ **MobX**
3. Reaction: _the view is updated_

---

### [fit] When _should I use_ __both__ ? 
#[fit] __real life__
#[fit] __example__

Application State > __MobX__
 
Scroll based animations > __RxJS__

![right fit autoplay mute loop](videos/dazn.mp4)

---

#[fit] Thank __you__

<br />

_slides_ [github.com/maxgallo/talk-rxjs-mobx](https://github.com/maxgallo/talk-rxjs-mobx)

_twitter_ @\_maxgallo
_other_ maxgallo.io







