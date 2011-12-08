/**
 *   Check neither QHM
 */


var port = chrome.extension.connect(),
	metas = document.getElementsByTagName("meta"),
	title = document.getElementsByTagName("title");

// check options
chrome.extension.sendRequest({name: "GetQHMSites"}, function(r){
	var qhm_sites = r.qhm_sites;
	
	if (qhm_sites)
	{
		var url_parts = document.location.href.split("/");
		url_parts.pop();//file を除去
		var url = url_parts.join("/") + "/";
		qhm_sites = "\n" + qhm_sites + "\n";
	}
	
	if (qhm_sites != false && typeof url != "undefined" && qhm_sites.match("\n"+url+"\n"))
	{
		chrome.extension.sendRequest({name: "QHMCheck", values: [title[0].text]});
	}
	else
	{
		// check meta
		for (var i = 0; i < metas.length; i++)
		{
			var meta = metas[i];
			if (meta.name == 'GENERATOR' && meta.content.match(/^Quick Homepage Maker/))
			{
				chrome.extension.sendRequest({name: "QHMCheck", values: [title[0].text]});
			}
		}
	}
	
});
