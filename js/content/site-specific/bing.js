
((startLookingForMatches) => {
	if (window.PLUGIN_searchCleanUp === undefined) {
		window.PLUGIN_searchCleanUp = {};
	}

	console.log("bing.js has loaded");
	chrome.storage.local.get('blockList', (result) => { startLookingForMatches(result.blockList, '.b_algo') });
})(startLookingForMatches);
