chrome.runtime.onMessage.addListener(updateCounter);

function updateCounter(data, sender) {
	if (data.count)
		chrome.tabs.get(sender.tab.id, tab => {
			if (!chrome.runtime.lastError) {
				let text = `${data.count}`;

				if (tab.index >= 0) {
					chrome.browserAction.setBadgeText({tabId: tab.id, text: text});
				} else {
					let tabId = sender.tab.id, text = text;

					chrome.webNavigation.onCommitted.addListener(function update(details) {
						if (details.tabId === tabId) {
							chrome.browserAction.setBadgeText({tabId: tab.id, text: text});
							chrome.webNavigation.onCommitted.removeListener(update);
						}
					})
				}
			}
		});
}
