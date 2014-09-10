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