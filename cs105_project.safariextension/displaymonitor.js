
function insertSheet()
{
	var theHead = document.head ;
	var element = document.createElement("link");
	element.id = "debugger";
	element.href=safari.extension.baseURI+"embed.css";
	element.type="text/css";
	element.rel="stylesheet";
	theHead.insertBefore(element, theHead.firstChild);
}


function changeUpdate(aMessageEvent) 
{
	if(aMessageEvent.name="change")
	{
		var event = aMessageEvent.message;
		if (event.key == "show_debug_info")
		{
			var elem = document.getElementById("debugger");
			if(event.newValue) 
	   		{
				elem.href=safari.extension.baseURI+"embed.css";
			} else {
				elem.href=safari.extension.baseURI+"embed_hidden.css";
	   		}
	   	}
	}
}

insertSheet();
safari.self.addEventListener("message",changeUpdate,false);