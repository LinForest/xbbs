$(function() {//When the Dom is ready

	$('.load_more').live("click",function() {//If user clicks on hyperlink with class name = load_more
	var last_comment_time = $(this).attr("id");
	//Get the id of this hyperlink 
	//this id indicate the row id in the database 
	if(last_comment_time!='end'){
    //if  the hyperlink id is not equal to "end"
	$.ajax({//Make the Ajax Request
	type: "POST",
	url: "morepost.php",
	data: "last_comment_time="+ last_comment_time, 
	beforeSend:  function() {
	$('a.load_more').html('<img src="loading.gif" />');//Loading image during the Ajax Request
  
	},
	success: function(html){//html = the server response html code
    $("#more").remove();//Remove the div with id=more 
	$("#mainbody").append(html);//Append the html returned by the server .

	}
	});
  
	}
	return false;
	});
	});
