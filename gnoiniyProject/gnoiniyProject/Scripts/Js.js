$(document).ready(function(){

var popupStatus = 0; 
function loadPopup(){  
  if(popupStatus==0){  
    $("#backgroundPopup").css({  
      "opacity": "0.7"  
    });  
    $("#backgroundPopup").fadeIn("slow");  
    $("#popupContact").fadeIn("slow");  
    popupStatus = 1;  
  }  
}
function disablePopup(){  
  if(popupStatus==1){  
    $("#backgroundPopup").fadeOut("slow");  
    $("#popupContact").fadeOut("slow");  
    popupStatus = 0;  
  }  
} 
function centerPopup(){  
 
  var windowWidth = document.documentElement.clientWidth;  
  var windowHeight = document.documentElement.clientHeight;  
  var popupHeight = $("#popupContact").height();  
  var popupWidth = $("#popupContact").width();  
  
  $("#popupContact").css({  
    "position": "absolute",  
    "top": windowHeight/2-popupHeight/2,  
    "left": windowWidth/2-popupWidth/2  
  });  
  // только для MS IE 6   
  $("#backgroundPopup").css({  
    "height": windowHeight  
  });  
}


$(document).ready(function(){

  $("#go").click(function(){  
    centerPopup();
    loadPopup();
  });
                
 
  $("#backgroundPopup").click(function(){
    disablePopup();
  });
  });



  
});
