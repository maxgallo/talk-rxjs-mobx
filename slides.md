# [fit] __RxJS__ is far from dead
# [fit] Long live __MobX__


[.footer: Hello Hello Hello Hello ]

---

[.build-lists: true]

## Here's __the plan__

- Reactive Programming
- Context
- RxJS intro
- MobX intro
- Same problem, two solution (compare the implementation)
- Re-implementing from scratch
- Best tool for the job
- One for all, and all for one (both in the same repo)
- Takeaways

---

# [fit] __Reactive__ Programming
#### [fit] _not another indroduction to reactive programming_

---

## [fit] _Reactive programming is a story about_
# [fit] __Producers__
### and
# [fit] __Consumers__

---

# Context

| | __*First commit*__ | __*GitHub Stars*__ | __*Weekly Downloads*__ | __*Latest Version*__ |
| :---: | :---: | :---: | :---: | :---: |
| __RxJS__ | _Sep_ 2012 | 14,794 | 3,849,604 | 6.3.2 |
| __MobX__ | _Mar_ 2015 | 16,779 | 170,615 | 5.1.1 |

---

# RxJS intro

```javascript

const { of } = rxjs;
const { map } = rxjs.operators;

of(1,2,3).pipe(map(x => x + '!!!'));
```

---


---

# __MobX__ intro
## _Transparent Reactive Programming

Transparent reactive programming

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

# Observables

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








