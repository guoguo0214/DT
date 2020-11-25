//时钟初始化
(function(){
    function Clock(){
        this.timer = null;
        this.delay = null;
        this.countNum = 1;
    }
    Clock.prototype.starClock = function(){
        let count = 10;
        document.querySelector('.count').innerText = this.countNum;
        this.timer = setInterval(()=>{
            document.querySelector('.block').innerHTML = count;
            count--;
            if(count < 0){
                clearInterval(this.timer);
                this.starDelay();
            }
        },1000)
        this.countNum++;
    }
    Clock.prototype = new Answer();
    Clock.prototype.starDelay = function(){
        let count = 3;
        this.delay = setInterval(()=>{
            document.querySelector('.block').innerHTML = count;
            count--;
            if(count < 0){
                clearInterval(this.delay);
                this.starClock();
                this.refrech();
            }
        },1000)
    }
    Clock.prototype.stop = function(){
        clearInterval(this.timer);
        clearInterval(this.delay);
    }
    window.clock = Clock;
})();

//题目初始化
(function(){
    function Answer(){
        this.keys = "";
        this.key = '';
        this.data = null;
    }
    Answer.prototype = new clock();
    Answer.prototype.refrech = function(num){
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.responseType = 'json';
        //let num = parseInt(Math.random()*10);
        xhr.open('Get','http://127.0.0.1:8000/data');
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status>=200 && xhr.status<300){
                    Object.entries(xhr.response['title'][num]).forEach(([key, val]) => {
                        that.keys = key;
                        document.querySelector('.topic').innerText = val;
                    });
                    that.data = xhr.response['option'];
                    //that.createOption(xhr.response['option'],num);
                    //console.log(that.data);
                }
            }
        }
        xhr.send();
        console.log(this.data);
    }
    Answer.prototype.createOption = function(obj,num){
        let that = this;
        document.querySelector('.option').innerHTML = "";
        for(let i in obj[num]){
            let div = document.createElement('div');
            let roW = document.createElement('div');
            div.classList.add('options');
            div.setAttribute('click',0);
            roW.classList.add('roW');
            if (this.keys.indexOf(i) != -1) {
                roW.style.backgroundImage = 'url(./img/true.png)';
            } else {
                roW.style.backgroundImage = 'url(./img/false.png)';
            }
            div.innerText = i + '.' + obj[num][i];
            div.appendChild(roW);
            div.onclick = function(){
                if(this.getAttribute('click') == 0){
                    if(that.keys.indexOf(i) == -1){
                        for(let j of document.querySelectorAll('.roW')){
                            j.style.display = 'block';
                        }
                    }else{
                        this.children[0].style.display = 'block';
                    }
                    this.setAttribute('click',1);
                }
            }
            document.querySelector('.option').appendChild(div);
        }
    }
    window.answer = Answer;
    
})();

//点击互动
(function(){
    function Interactive(){
        this.clock = new clock();
        this.answer = new answer();
        this.count = 0;
        
    }
    //初始化
    Interactive.prototype.init = function(){
        this.clock.starClock();
        let num = parseInt(Math.random()*10);
        this.answer.refrech(num);
        this.click();
    }
    //互动
    Interactive.prototype.click = function(){
        console.log(document.querySelector('.option').innerHTML);
    }
    window.interactive = Interactive;
})();

let itt = new interactive();
itt.init();