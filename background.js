
const extId = 'vid2tab';

function onError(e,m) {
	console.error(e,m);
}

browser.menus.create({   // menus permission
	id: extId, 
	title: "Toggle Video Size",
	documentUrlPatterns: [ "<all_urls>" ],
	contexts: ["all","video","page"],
	onclick(info,tab) {
		browser.tabs.executeScript(tab.id, {
			frameId: info.frameId,
			code:`
				var el = browser.menus.getTargetElement(${info.targetElementId});
				if(el !== null && el.tagName.toLowerCase() === 'video') {
					document.body.classList.toggle("hide");
					el.classList.toggle("vid2tab");
					el.controls=true;
				}else{
					el = el.querySelectorAll('video');
					if(el.length > 0){
						el = el[0];
						if(el !== null && el.tagName.toLowerCase() === 'video'){
							document.body.classList.toggle("hide");
							el.classList.toggle("vid2tab");
							el.controls=true;
						}else{
							el = el.closest('video');
							if(el !== null && el.tagName.toLowerCase() === 'video'){
								document.body.classList.toggle("hide");
								el.classList.toggle("vid2tab");
								els[0].controls=true;
							}
						}
					}
				}
			`,
		});
	}
},function(e){
	onError(e,"failed background.js::browser.menus.create()");
});

