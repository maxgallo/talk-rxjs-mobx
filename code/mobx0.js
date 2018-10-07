const { observable, autorun } = require('mobx');

const album1 = observable({
    title: "OK Computer",
    year: 1997,
    playCount: 0
});

autorun(() => { console.log(`Album 1 PlayCount: ${album1.playCount}`)});

console.log('\n reactions \n');

album1.playCount = 2;
album1.playCount = 20;

