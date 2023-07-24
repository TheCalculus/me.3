let timer = document.getElementById("timer");

let initial = new Date(2020, 3, 20);
let delta = (new Date() - initial);

// an interesting question: which series of divisions is more performant?
// the many, smaller divisions or the singular, humongous division? in practice,
// this difference is probably negligible so I will retain the singular division

// delta /= 1000;
// delta /= 60;
// delta /= 60;
// delta /= 24;
// delta /= 365;

// 1000 * 60 * 60 * 24 * 365 = 31536000000
delta /= 31536000000;

setInterval(() => {
    timer.innerHTML = delta.toFixed(8);
    delta += 3.1709792e-10; // 10 / 31536000000
}, 10);