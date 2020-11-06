(function(){
	if (typeof window.vid2tab_hasRun !== 'undefined'){
		return;
	}
	window.vid2tab_hasRun = true;

	/**/
	let old_location=false;

	browser.runtime.onMessage.addListener( (message) => {

		const clickTarget = browser.menus.getTargetElement(message.targetElementId);

		const exportableTargets = clickTarget.parentNode.querySelectorAll('video');

		if(exportableTargets.length < 0){
			window.alert('No video targets found!');
			return;
		}
		const exportableTarget = exportableTargets[0];

		exportableTarget.classList.toggle("vid2tab");

		if(old_location){
			old_location.prepend(exportableTarget);
			old_location = false;
		}else {
			old_location = exportableTarget.parentNode;
			document.body.appendChild(exportableTarget);
		}
	});
	/**/
}());
