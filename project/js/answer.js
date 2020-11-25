(function () {
    function timing() {
        this.timer = null;
        this.delay = null;
        this.count = 1;
        this.mark = 0;
        this.frist = true;
    }

    timing.prototype.starClock = function () {
        this.stop();
        document.querySelector('.count').innerText = this.count;
        let num = 10;
        this.timer = setInterval(() => {
            document.querySelector('.block').innerHTML = num;
            num--;
            if (num < 0) {
                this.stop();
                this.starDelay();
                for (let i of document.querySelectorAll('.roW')) {
                    i.style.display = 'block';
                }
            }
        }, 1000);
        this.newData();
        this.count++;
    }
    timing.prototype.starDelay = function () {
        this.stop();
        if (this.count == 11) {
            this.stop();
            if (this.mark != 100) {
                document.querySelector('.mc').style.display = 'block';
                document.querySelector('.out').style.display = 'block';
            } else {
                document.querySelector('.mc').style.display = 'block';
                document.querySelector('.mf').style.display = 'block';
            }
            return false;
        }
        let num = 1;
        this.delay = setInterval(() => {
            document.querySelector('.block').innerHTML = '<img src="./img/text.png" alt="">';
            num--;
            if (num < 0) {
                this.stop();
                this.starClock();
            }
        }, 1000);
    }
    timing.prototype.stop = function () {
        clearInterval(this.timer);
        clearInterval(this.delay);
    }
    timing.prototype.newData = function () {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('get', 'http://127.0.0.1:8000/data');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let num = parseInt(Math.random() * 10);
                    this.createData(num, xhr.response);
                }
            }
        }.bind(this);
        xhr.send();
    }
    timing.prototype.createData = function (num, data) {
        let keys = '';
        let flag = true;
        document.querySelector('.option').innerHTML = '';
        Object.entries(data['title'][num]).forEach(([key, val]) => {
            document.querySelector('.topic').innerHTML = val;
            Object.entries(data['option'][num]).forEach(([k, v]) => {
                let div = document.createElement('div');
                let roW = document.createElement('div');
                div.classList.add('options');
                div.setAttribute('click', 0);
                roW.classList.add('roW');
                if (key.indexOf(k) != -1) {
                    roW.style.backgroundImage = 'url(./img/true.png)';
                } else {
                    roW.style.backgroundImage = 'url(./img/false.png)';
                }
                div.innerText = k + '.' + v;
                div.appendChild(roW);
                div.onclick = function () {
                    if (flag) {
                        keys = keys + k;
                        if (div.getAttribute('click') == 0) {
                            if (key.indexOf(k) == -1) {
                                div.style.borderColor = 'red';
                                for (let i of document.querySelectorAll('.roW')) {
                                    i.style.display = 'block';
                                }
                                this.stop();
                                this.starDelay();
                                if (this.frist && this.count <= 9) {
                                    document.querySelector('.mc').style.display = 'block';
                                    document.querySelector('.frist').style.display = 'block';
                                    this.mark += 10;
                                    document.querySelector('.df').innerText = this.mark;
                                    this.frist = false;
                                    this.stop();
                                }
                                flag = false;
                            } else {
                                div.style.borderColor = 'green';
                                div.children[0].style.display = 'block';
                            }
                            if (keys == key) {
                                for (let i of document.querySelectorAll('.roW')) {
                                    i.style.display = 'block';
                                }
                                this.mark += 10;
                                this.stop();
                                this.starDelay();
                                document.querySelector('.df').innerText = this.mark;
                                flag = false;
                            }
                            div.setAttribute('click', 1);
                        }
                    }
                }.bind(this);
                document.querySelector('.option').appendChild(div);
            });
        })
    }

    window.qs = new timing();
})();

(function () {
    function Interact() {
        this.timing = qs;
    }
    Interact.prototype.mantle = function () {
        document.querySelector('.mc').onclick = function () {
            document.querySelector('.frist').style.display = 'none';
            document.querySelector('.out').style.display = 'none';
            document.querySelector('.mf').style.display = 'none';
            document.querySelector('.mc').style.display = 'none';
            console.log(document.querySelector('.mc'));
            this.timing.starDelay();
        }.bind(this);
    }
    Interact.prototype.init = function () {
        this.timing.starClock();
        this.timing.newData();
        this.mantle();
    }

    window.star = new Interact();
})()
star.init();