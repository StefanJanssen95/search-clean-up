(() => {
	if (window.PLUGIN_searchCleanUp === undefined) {
		window.PLUGIN_searchCleanUp = {};
	}

	console.log("ddg.js has loaded");
	let blockList = [];

	chrome.storage.local.get('blockList', (result) => { blockList = result.blockList; startLookingForMatches(); });

	function startLookingForMatches() {
		const interval = window.setInterval(findMatches, 500);

		function findMatches() {
			let blocked = 0;
			const searchResults = document.querySelectorAll('.result');
			for (const result of searchResults) {
				const link = result.querySelector('a');
				if (link) {
					for (const blockRule of blockList) {
						const regexp = new RegExp(blockRule);
						const isMatch = regexp.test(link);
						if (isMatch) {
							result.classList.add('searchCleanUpFilter');
							blocked++;
							break;
						}
					}
				}
			}

			console.log(blocked);

			if (blocked > 0) {
				chrome.runtime.sendMessage({count: blocked});
			}

			if (searchResults.length > 0) {
				const loadMoreButton = document.querySelector('.result--more__btn');
				loadMoreButton.addEventListener('click', startLookingForMatches);
				window.clearInterval(interval);
			}
		}
	}
})();
