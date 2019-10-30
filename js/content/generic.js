console.log("generic.js has loaded");

function startLookingForMatches(blockList, resultClass) {
	const interval = window.setInterval(findMatches, 500);

	function findMatches() {
		let blocked = 0;
		let searchResults = document.querySelectorAll(resultClass);
		for (const result of searchResults) {
			const link = result.querySelector('a');
			if (!link) {
				continue;
			}

			for (const blockRule of blockList) {
				if (!blockRule.type) {
					break;
				}

				if (blockRule.type === 'regex') {
					const regexp = new RegExp(blockRule);
					const isMatch = regexp.test(link);
					if (isMatch) {
						result.classList.add('searchCleanUpFilter');
						blocked++;
						break;
					}
				} else if (blockRule.type === 'text') {
					const isMatch = link.href.toLowerCase().includes(blockRule.value.toLowerCase());
					if (isMatch) {
						result.classList.add('searchCleanUpFilter');
						blocked++;
						break;
					}
				}
			}
		}

		console.log('Blocked items:', blocked);
		if (blocked > 0) {
			chrome.runtime.sendMessage({count: blocked});
		}

		if (searchResults.length > 0) {
			setTimeout(() => {
				const loadMoreButton = document.querySelector('.result--more__btn');
				if (loadMoreButton) {
					loadMoreButton.addEventListener('click', () => startLookingForMatches(blockList, resultClass, loadMoreButton));
				}
			}, 500);
			window.clearInterval(interval);
		}
	}
}
