nslo-elvironment - v0.1.0
===
create elements in a familiar environment
## Install
### npm
```bash
$ npm install FireNeslo/elvironment --save
```
### bower
```bash
$ bower install FireNeslo/elvironment --save
```
## Usage
```js
var elvironment = require('..');


createList.$inject = ['ol','li','i','b'];
function createList (list, item, italic, bold) {
	return list('#a-list', [ 
		item('#item-1', italic('item 1')),
		item('#item-2', bold('item 2'))
	])
}

var list = elvironment(createList);

function createArticle(article, header, footer, section, h2, p,i) {
	return article('.post', [ 
		header('.title', h2('title')),
		section('.content', p('content')),
		footer('.footer', i('author'))
	]);
}

var article = elvironment(createArticle);

elvironment.shortcut('~', function(element, value) {
	element.attr('placeholder', value);
});

function createForm(form, input, br) {
	var attributes = {
		placeholder: 'username'
	};
	return form('.login', [ 
		input(':text', '@username', attributes), br(),
		input(':password','@password', '~password'), br(),
		input(':submit', '=login')
	]);
}

var form = elvironment(createForm);
window.elvironment = elvironment;
// if using browserify or webpack
//document.body.appendChild(list.toDom());
//document.body.appendChild(article.toDom());
//document.body.appendChild(form.toDom());

console.log(
	'\n'+list,
	'\n'+article
)
```
## Test
```bash
$ npm install -g mocha
$ npm test
```
##API

<!-- Start /home/fireneslo/Dropbox/nslo/elvironment/index.js -->

## elviroment(cb)

### Params: 

* **function** *cb* - element environment

## shortcut(shortcut, 			action)

Adds a shortcut

### Params: 

* **string|regexp** *shortcut* - prefix or expression to activate action (prefixes are removed) 
* **function** *			action* - action to invoke on shortcut

<!-- End /home/fireneslo/Dropbox/nslo/elvironment/index.js -->




<!-- Start /home/fireneslo/Dropbox/nslo/elvironment/lib/attributes.js -->

## Attributes

Attributes helper

## map(cb)

map over attributes

### Params: 

* **function** *cb* - mapping callback

## toString()

make attributes string

<!-- End /home/fireneslo/Dropbox/nslo/elvironment/lib/attributes.js -->




<!-- Start /home/fireneslo/Dropbox/nslo/elvironment/lib/element.js -->

## Attributes

global document

## Element

Element container

### Params: 

* **string** *name* - element tag name
* **Element[]** *[children]* - child elements

Converts element to string

## attr(key, [value])

Sets attribute

### Params: 

* **string** *key* - key to get or set
* **string** *[value]* - the value to set

## text([text])

Sets text

### Params: 

* **string** *[text]* - text to set

## children([children], [replace])

Appends or replaces children

### Params: 

* **Element[]** *[children]* - elements tp append or replace
* **boolean** *[replace]* - should replace children

## toDom()

Converts Element to dom structure (browser only)

<!-- End /home/fireneslo/Dropbox/nslo/elvironment/lib/element.js -->

