'use strict';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('bok');
const url = 'http://127.0.0.1:3000/api/book/';
//const url = 'data/data.json';
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data.myBooks);
        console.log("Visa första i json-objektet: " + data.myBooks[0].title);
        let bok = data.myBooks;
        return bok.map(function(bok) {
            let li = createNode('li');
            li.innerHTML = bok.title + " " + bok.author;
            append(ul, li);
        })
    })
    .catch(function(error) {
        console.log(error);
    });
