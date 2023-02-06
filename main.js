/* 
 * (class)Progress<nowValue, minValue, maxValue>
 */

//helper function-> return <DOMelement>
const showbox1 = document.querySelector('.showbox1');
const showbox2 = document.querySelector('.showbox2');
const showbox4 = document.querySelector('.showbox4');
const showbox5 = document.querySelector('.showbox5');
const container = document.querySelector('.container')
const btnext = document.querySelector('#btnext');
const btnno = document.querySelector('#btnno');
const btnyes = document.querySelector('#btnyes');
let flag = 1;
function elt(type, prop, ...childrens) {
    let elem = document.createElement(type);
    if (prop) Object.assign(elem, prop);
    for (let child of childrens) {
        if (typeof child == "string") elem.appendChild(document.createTextNode(child));
        else elem.appendChild(elem);
    }
    return elem;
}

//Progress class
class Progress {
    constructor(now, min, max, options) {
        this.dom = elt("div", {
            className: "progress-bar"
        });
        this.min = min;
        this.max = max;
        this.intervalCode = 0;
        this.now = now;
        this.syncState();
        if (options.parent) {
            document.querySelector(options.parent).appendChild(this.dom);
        }
        else document.body.appendChild(this.dom)
    }

    syncState() {
        this.dom.style.width = this.now + "%";
    }

    startTo(step, time) {
        if (this.intervalCode !== 0) return;
        this.intervalCode = setInterval(() => {
            console.log("sss")
            if (this.now + step > this.max) {
                this.now = this.max;
                this.syncState();
                clearInterval(this.interval);
                this.intervalCode = 0;
                return;
            }
            this.now += step;
            this.syncState()
        }, time)
    }
    end() {
        this.now = this.max;
        clearInterval(this.intervalCode);
        this.intervalCode = 0;
        this.syncState();
    }
}

let pb = new Progress(15, 0, 100, { parent: ".progress" });

//arg1 -> step length
//arg2 -> time(ms)
pb.startTo(5, 500);

//end to progress after 5s
setTimeout(() => {
    pb.end()
}, 3000)
setTimeout(() => {
    showbox1.classList.toggle('show')
    container.classList.add('hide')
}, 4000)
btnext.addEventListener('click', () => {
    showbox2.classList.toggle('show')
    showbox1.classList.toggle('show')
})
btnyes.addEventListener('click', () => {
    showbox2.classList.toggle('show')
    showbox4.classList.toggle('show')
    showbox4.style.height = 'auto';
})
btnno.addEventListener('click', () => {
    flag++;
    showbox1.classList.add('hide');
    setTimeout(() => {
        showbox2.classList.toggle('show')
    }, 100)
    setTimeout(() => {
        showbox2.classList.toggle('show')
    }, 200)
    if (flag > 4) {
        showbox2.classList.add('hide')
        setTimeout(() => {
            showbox5.classList.add('show')
        }, 300)
    }
})
