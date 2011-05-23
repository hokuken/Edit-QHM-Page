chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		// !move to QHM
		if (request.name == "MoveToQHM") {
			url = request.values.pop();
			sendResponse({farewell: "goodbye"});
			location.href = url;
		}
		// !start short keys
		else if (request.name == "StartShortKeys") {
			var step = 0;
			document.body.addEventListener("keydown", function(e){
				if (e.target.tagName == "INPUT" || e.target.tagName == "TEXTAREA")
				{
					return;
				}
				if (e.keyCode == 71)
				{
					step++;
				}
				else if (e.keyCode == 69 && step > 0)
				{
					chrome.extension.sendRequest({name: "MoveToQHM"});
				}
				else
				{
					step = 0;
				}
			}, false);


			sendResponse({farewell: "goodbye"});

		}
		else
			sendResponse({}); // snub them.
	}
);	
