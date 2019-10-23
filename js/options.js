const browser = chrome;
const blockListContainer = document.querySelector('.blocklist');
const blockListTextContainer = document.querySelector('.blocklist-text');


function saveOptions(e) {
	e.preventDefault();

	const blocklist = [];
	const items = document.querySelectorAll('.blocklist-item');
	const textItems = document.querySelectorAll('.blocklist-text-item');
	for (const item of items) {
		if (item.value.length > 0)
			blocklist.push({ value: item.value, type: 'regex'});
	}
	for (const item of textItems) {
		if (item.value.length > 0)
			blocklist.push({ value: item.value, type: 'text'});
	}
	browser.storage.local.set({
		blockList: blocklist
	});
}

function restoreOptions() {

	function setCurrentChoice(result) {
		blockList = result.blockList;
		if(blockList == undefined)
			blockList = [];

		for (const item of blockList) {
			if (!item.type) {
				const itemInput = addNewRegexRule();
				itemInput.value = item;
			} else {
				let itemInput;
				switch (item.type) {
					case 'text':
						itemInput = addNewIncludeRule();
						break;
					case 'regex':
						itemInput = addNewRegexRule();
						break;
				}
				itemInput.value = item.value;
			}
		}
		addNewRegexRule();
		addNewIncludeRule();
	}

	browser.storage.local.get('blockList', setCurrentChoice);
}

function addNewRegexRule(){
	const div = createItemDiv("Regex to exclude: ");
	const item = createInput('blocklist-item');
	div.appendChild(item);
	blockListContainer.appendChild(div);
	return item;
}

function addNewIncludeRule(){
	const div = createItemDiv("Text to exclude: ");
	const item = createInput('blocklist-text-item');
	div.appendChild(item);
	blockListTextContainer.appendChild(div);
	return item;
}

function createInput(className) {
	const input = document.createElement('input');
	input.type = 'text';
	input.classList.add(className);
	return input;
}

function createItemDiv(text) {
	const div = document.createElement('div');
	span = document.createElement("span");
	txt = document.createTextNode(text);
	span.appendChild(txt);
	div.appendChild(span);
	return div;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
document.querySelector('#blocklist-add-item').addEventListener('click', addNewRegexRule);
document.querySelector('#blocklist-text-add-item').addEventListener('click', addNewIncludeRule);