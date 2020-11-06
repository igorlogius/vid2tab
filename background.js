
const extId = 'vid2tab';


const CSS=`
.vid2tab { 
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 999999999999999999999 !important;
    visibility: visible !important;
}

.hide {
    visibility: hidden !important;
}
`;

function onError(e,m) {
	console.error(e,m);
}

let maxedtabs={};

browser.menus.create({   // menus permission
	id: extId,
	title: "Expand Video to Tab Size",
	documentUrlPatterns: [ "<all_urls>" ],
	contexts: ["all","video","page"],
	onclick(info,tab) {
		browser.tabs.insertCSS({code: CSS});
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

