'use strict';

let test;
let myTimer = {
    startTime: 0,
    endTime: 0,
    result: 0,
    intervalID: 0
};

function toggleMenu() {
    document.getElementById('menu').classList.toggle('hide');
}

function goToBegining() {
    document.getElementById('menu').classList.add('hide');
    document.getElementById('test').classList.add('hide');
    document.getElementById('final').classList.add('hide');
    document.getElementById('start').classList.remove('hide');
}

function goToInfo() {
    document.getElementById('menu').classList.add('hide');
    document.getElementById('test').classList.add('hide');
    document.getElementById('final').classList.add('hide');
    document.getElementById('start').classList.remove('hide');
}

function openTest() {
    document.getElementById('menu').classList.add('hide');
    document.getElementById('start').classList.add('hide');
    document.getElementById('final').classList.add('hide');
    document.getElementById('test').classList.remove('hide');
    document.getElementById('h2').classList.remove('hide');
    test = new Test;
    createPage();
}

function createPage() {
    let question = test.getQuestion();
    document.getElementById('progress').style.width = `${(260 / 11) * (test.getNumber() + 1)}px`;
    document.getElementById('question').innerHTML = `${question.question}`;
    let img = document.getElementById('img');
    if (question.image) {
        img.setAttribute('src', `./images/${question.image}`);
        img.classList.remove('hide');
    } else {
        img.classList.add('hide');
    }
    switch(question.type) {
        case 'text':
            createAnswers1(question.variants);
            break;
        case 'color':
            createAnswers2(question.variants);
            break;
        case 'image':
            createAnswers3(question.variants);
            break;
    }
    
}

function createAnswers1(variants) {
    let answers = document.getElementById('answers');
    answers.innerHTML = '';
    answers.setAttribute('class', 'answers1');
    for(let i = 0; i < variants.length; i++) {
        let label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="input" value="${variants[i]}">${variants[i]}`;
        answers.append(label);
    }
}

function createAnswers2(variants) {
    let answers = document.getElementById('answers');
    answers.innerHTML = '';
    answers.setAttribute('class', 'answers2');
    for(let i = 0; i < variants.length; i++) {
        let label = document.createElement('label');
        label.style.backgroundColor = `${variants[i]}`;
        label.innerHTML = `<input type="radio" name="input" value="${variants[i]}">`;
        answers.append(label);
    }
}

function createAnswers3(variants) {
    let answers = document.getElementById('answers');
    answers.innerHTML = '';
    answers.setAttribute('class', 'answers3');
    for(let i = 0; i < variants.length; i++) {
        let label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="input" value="${variants[i]}">${variants[i]}`;
        answers.append(label);
    }
}

function checkInput(event) {
    if (event.target.type === 'radio') {
        test.currentAnswer = event.target.value;
        document.getElementById('btn').disabled = false;
    }
}

function nextPage() {
    test.saveAnswer();
    if (test.getNumber() < 11) {
        document.getElementById('btn').disabled = true;
        createPage();
    } else {
        document.getElementById('test').classList.add('hide');
        document.getElementById('progressing').classList.remove('hide');
        setTimeout(goToResult, 3000);
    }
}

function goToResult() {
    document.getElementById('progressing').classList.add('hide');
    document.getElementById('final').classList.remove('hide');
    let h2 = document.getElementById('h2');
    h2.textContent = 'Готово!';
    h2.classList.add('h2-final');
    startTimer();
}

function startTimer() {
    myTimer.startTime = new Date().getTime();
    myTimer.intervalID = setInterval(() => {
        myTimer.endTime = new Date().getTime();
        myTimer.result = (10 * 60) - Math.floor((myTimer.endTime - myTimer.startTime) / 1000);
        let min = Math.floor(myTimer.result / 60);
        let sec  = myTimer.result % 60;
        document.getElementById('timer').textContent = `${min}:${sec<10 ? '0'+sec : sec}`;
    }, 1000);
}

function callAndList() {
    clearInterval(myTimer.intervalID);
    getData();
}

async function getData() {
    try {
        const response = await fetch('https://swapi.dev/api/people/1/');
        const data = await response.json();
        for (const key in data) {
            if (Array.isArray(data[key])) {
                let newArray = [];
                for (const i of data[key]) {
                    const response = await fetch(i);
                    const data2 = await response.json();
                    if (data2.name) {
                        newArray.push(data2.name);
                    } else if (data2.title) {
                        newArray.push(data2.title);
                    }
                }
                data[key] = newArray;
            } 
            else if (data[key].includes('http')) {
                if (key !== 'url') {
                    const response = await fetch(data[key]);
                    const data2 = await response.json();
                    data[key] = data2.name;
                }
            }
        }
        showData(data);
    }
    catch {}
}

function showData(data) {
    document.getElementById('final').firstElementChild.style.gap = '20px';
    let result = document.getElementById('result');
    result.innerHTML = `<h6>${data.name}</h6>`;
    let table = document.createElement('table');
    table.innerHTML = '';
    for (const key in data) {
        if (Array.isArray(data[key])) {
            if (data[key].length === 0) {
                continue;
            }
            let td = '';
            for (const i of data[key]) {
                td += `${i}` + '<br>';
            }
            table.innerHTML += `<tr><td>${key}</td><td class="yellow">${td}</td></tr>`;
        } else if (data[key].includes('http')) {
            table.innerHTML += `<tr><td>${key}</td><td><a href="${data[key]}">${data[key].split('//')[1]}</a></td></tr>`;
        } else {
            table.innerHTML += `<tr><td>${key.replace('_', ' ')}</td><td class="yellow">${data[key]}</td></tr>`;
        }
    }
    result.append(table);
    result.classList.remove('hide');
}
