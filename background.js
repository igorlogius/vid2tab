
const extId = 'vid2tab';

function onError(e, msg){
	console.log(`${extId}::onError error: ${e}, message: ${msg}`);
}

async function onMenuClicked(clickData, tab) { 

	if ( typeof clickData.menuItemId !== 'string' ) { return; }
	if ( !clickData.menuItemId.startsWith(extId) ) { return; }

	try {
		// activeTab permission 
		await browser.tabs.insertCSS    ({file: 'main.css' });
		await browser.tabs.executeScript({file: 'main.js'  });
		await browser.tabs.sendMessage(tab.id, {  
			"targetElementId": clickData.targetElementId, 
		});
	}catch(e){
		onError(e, 'failed background.js::onMenuClicked()::browser.tabs.sendMessage()');
	}
}

browser.menus.create({   // menus permission
	id: extId,
	title: "Toggle Video Size (vid2tab)",
	documentUrlPatterns: [ "<all_urls>" ],
	contexts: ["all", "page", "link", "image", "editable", "video" ],
	onclick: onMenuClicked,
},function(e){
	onError(e,"failed background.js::browser.menus.create()");
});

