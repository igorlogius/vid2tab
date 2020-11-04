
const extId = 'vid2tab';

function onError(e,m) {
	console.error(e,m);
}

browser.menus.create({   // menus permission
	id: extId, 
	title: "Maximize Video in Tab",
	documentUrlPatterns: [ "<all_urls>" ],
	contexts: ["video"],
	onclick(info,tab) {
		browser.tabs.executeScript(tab.id, {
			frameId: info.frameId,
			code: `browser.menus.getTargetElement(${info.targetElementId}).classList.toggle("vid2tab");`,
		});
	}
},function(e){
	onError(e,"failed background.js::browser.menus.create()");
});

