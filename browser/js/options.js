const browser = chrome;
const blockListContainer = document.querySelector('.blocklist');


function saveOptions(e) {
	e.preventDefault();

	const blocklist = [];
	const items = document.querySelectorAll('.blocklist-item');
	for (const item of items) {
		if (item.value.length > 0)
			blocklist.push(item.value);
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

		for (const itemValue of blockList) {
			const item = addNewRule();
			item.value = itemValue;
		}
		addNewRule();
	}

	browser.storage.local.get('blockList', setCurrentChoice);
}

function addNewRule(){
	const item = document.createElement('input');
	item.type = 'text';
	item.classList.add('blocklist-item');
	blockListContainer.appendChild(item);
	return item;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
document.querySelector('#blocklist-add-item').addEventListener('click', addNewRule);