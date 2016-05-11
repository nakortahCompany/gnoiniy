$(document).ready(function(){

var popupStatus = 0; 
function loadPopup(){  
  if(popupStatus==0){  
    $("#backgroundPopup1").css({  
      "opacity": "0.7"  
    });  
    $("#backgroundPopup1").fadeIn("slow");  
    $("#popupContact1").fadeIn("slow");  
    popupStatus = 1;  
  }  
}
function disablePopup(){  
  if(popupStatus==1){  
    $("#backgroundPopup1").fadeOut("slow");  
    $("#popupContact1").fadeOut("slow");  
    popupStatus = 0;  
  }  
} 
function centerPopup(){  
 
  var windowWidth = document.documentElement.clientWidth;  
  var windowHeight = document.documentElement.clientHeight;  
  var popupHeight = $("#popupContact1").height();  
  var popupWidth = $("#popupContact1").width();  
  
  $("#popupContact1").css({  
    "position": "absolute",  
    "top": windowHeight/2-popupHeight/2,  
    "left": windowWidth/2-popupWidth/2  
  });  
  // только для MS IE 6   
  $("#backgroundPopup1").css({  
    "height": windowHeight  
  });  
}


$(document).ready(function(){

  $("#rega").click(function(){  
    centerPopup();
    loadPopup();
  });
                
 
  $("#backgroundPopup1").click(function(){
    disablePopup();
  });
  });



  
});
