
const extId = 'vid2tab';

function onError(e,m) {
	console.error(e,m);
}

browser.menus.create({   // menus permission
	id: extId, 
	title: "Maximize Video in Tab",
	documentUrlPatterns: [ "<all_urls>" ],
	contexts: ["all","video","page"],
	onclick(info,tab) {
		browser.tabs.executeScript(tab.id, {
			frameId: info.frameId,
			code:`
				el = browser.menus.getTargetElement(${info.targetElementId});	
				if(el.tagName === 'VIDEO') {
					el.classList.toggle("vid2tab");
					document.body.classList.toggle("hide");
					el.controls=true;
				}else{
					els = el.querySelectorAll('video');
					if(els.length > 0){
						els[0].classList.toggle("vid2tab");
						document.body.classList.toggle("hide");
						els[0].controls=true;
					}
				}
			`,
		});
	}
},function(e){
	onError(e,"failed background.js::browser.menus.create()");
});

