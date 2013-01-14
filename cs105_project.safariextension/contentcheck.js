function checkcredits(){
	$('img').each(function(index) { 
		var cmnt=this.nextSibling; 
		while(cmnt != null && cmnt.nodeName != "IMG" && cmnt.nodeType != 8)
			{ cmnt=cmnt.nextSibling; } 
		if(cmnt==null || cmnt.nodeName=="IMG")
			{ 
				$(this).before('<span class="debug-warning">Credit Warning: NO&nbsp;COMMENT&nbsp;FOUND for <strong>'+this.nodeName+'</strong><br><a href="'+this.src+'">'+this.src+'</a></span>'); 	
			} else { 	
			$(this).before('<span class="debug-good"><a href="'+this.src+'">'+this.src+'</a><br>Note: <strong>'+this.nodeName+'</strong>  COMMENT&nbsp;FOUND: <br> [<strong>'+cmnt.nodeValue+'</strong>]</span>'); 
			} 
		} );

	$('script').add('video').add('audio').add('embed').add('object').each(function(index) {
		var cmnt=this.nextSibling; 
		while(cmnt != null && cmnt.nodeType != 8)
			{ cmnt=cmnt.nextSibling; } 
		if(cmnt==null || cmnt.nodeName=="IMG")
			{ 
				$(this).before('<span class="debug-warning">Credit Warning: NO&nbsp;COMMENT&nbsp;FOUND for <strong>'+this.nodeName+'</strong><br><a href="'+this.src+'">'+this.src+'</a></span>'); 
			} else { 
				$(this).before('<span class="debug-good">Note: <strong>'+this.nodeName+'</strong>  COMMENT&nbsp;FOUND: <br> [<b>'+cmnt.nodeValue+'</b>]</span>'); 
			} 
	});
}

function checkhardcode(){	
	var offenses = {'FONT tag':'font',
				 	'STYLE tag':'style',
				 	'CENTER tag':'center',
				 	'STYLE attribute':'[style]', 
				 	'HSPACE attribute':'[hspace]',
				 	'VSPACE attribute':'[vspace]', 
				 	'ALIGN attribute':'[align]',
				 	'BORDER attribute':'[border]' };

	jQuery.each(offenses, function(xname, select) 
	{
		var xamine=$(select);
		var xhits=xamine.size();
		if(xhits>0)
		{
			$("body").prepend('<span class="debug-warning">Hardcode Warning: '+xhits+' '+xname+'s found<br></span>');
			xamine.each(function(index) 
				{ 
				$(this).before('<span class="debug-warning">Hardcode Warning: '+xname+' detected</span>');
				$(this).addClass("debug-highlight"); 
				});
		} else {
//			$("body").prepend('<span class="debug-good">Note: No '+xname+'s found<br></span>');
		}
				
	});
 
	
	var sheets=$('link[rel="stylesheet"]').not('#debugger');
	var sheetcount = sheets.size();
	if(sheetcount>1)
	{
		$("body").prepend('<span class="debug-warning">Hardcode Warning: MULTIPLE ('+sheetcount+') STYLESHEETS LINKED</span>');
	} else if (sheetcount <1) {
		$("body").prepend('<span class="debug-warning">Hardcode Warning: NO&nbsp;LINKED&nbsp;STYLESHEET</span>');
	}
	sheets.each(function(index){
		$("body").prepend('<span class="debug-good">Note: STYLESHEET LINKED<br>[<a href="'+$(this).attr('href')+'">'+$(this).attr('href')+'</a>]</span>');
	});
}

function checkaccessibility()
{
	$('img').not('[alt]').each(function() {
		$(this).before('<span class="debug-warning">Accessibility Warning: Image '+this.src+' has no ALT attribute</span>');
		$(this).addClass("debug-highlight"); 
	});
}
	
checkhardcode();
checkcredits();	
checkaccessibility();