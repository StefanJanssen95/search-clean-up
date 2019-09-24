document.getElementById('openOptions').addEventListener('click', openOptionsPage);

function openOptionsPage(){
	chrome.runtime.openOptionsPage()
}