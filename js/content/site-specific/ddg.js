((startLookingForMatches) => {
	if (window.PLUGIN_searchCleanUp === undefined) {
		window.PLUGIN_searchCleanUp = {};
	}

	console.log("ddg.js has loaded");
	chrome.storage.local.get('blockList', (result) => { startLookingForMatches(result.blockList, '.result') });
})(startLookingForMatches);
