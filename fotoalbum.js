$(document).ready(function() {
  $('#gallery img').each(function() {
    $(this).hover(
      function() {
        $(this).css('opacity','1');
      },
      function () {
        $(this).css('opacity','0.5');
    }); // end hover
  }); //end each

  var currentImgId = "";

  $('#gallery a').click(function(evt) {
    evt.preventDefault();
    var imgPath = $(this).attr('href');
    currentImgId = $(this).attr('id');
    setPicture(imgPath); 
  }); // end click
  $('#gallery a:first').click();
  $('.navMenu > li').bind('mouseover', openSubMenu);
  $('.navMenu > li').bind('mouseout', closeSubMenu);
  $(".button a").click(function(evt) {
    evt.preventDefault();
    if ($(this).attr("id") == "button_next") {
      if (currentImgId < 5) {
        var currentImgIdInt = parseInt(currentImgId)
        var nextImgId = currentImgIdInt += 1
        var nextImgSrc = $("#" + nextImgId).attr("href");
        setPicture(nextImgSrc);
        currentImgId = nextImgId;
      } else if (currentImgId == 5) {
        var currentImgIdInt = parseInt(currentImgId)
        var nextImgId = 1
        var nextImgSrc = $("#" + nextImgId).attr("href");
        setPicture(nextImgSrc);
        currentImgId = nextImgId;
      }
    }
    else if ($(this).attr("id") == "button_previous") {
      if (currentImgId > 1) {
        var currentImgIdInt = parseInt(currentImgId)
        var nextImgId = currentImgIdInt -= 1
        var nextImgSrc = $("#"+nextImgId).attr("href");
        setPicture(nextImgSrc);
        currentImgId = nextImgId;
      } else if (currentImgId == 1) {
        var currentImgIdInt = parseInt(currentImgId)
        var nextImgId = 5
        var nextImgSrc = $("#"+nextImgId).attr("href");
        setPicture(nextImgSrc);
        currentImgId = nextImgId;
      }
    }
  });
  $('.toolTip').hide();
  $('.trigger').mouseover(function() {
    var ttLeft,
      ttTop,
      $this = $(this),
      $tip = $($this.attr('data-tooltip')),
      triggerPos = $this.offset(),
    ttTop = triggerPos.top;
    ttLeft = triggerPos.left + 80;
    $tip.css({
      left: ttLeft,
      top: ttTop,
      position: 'absolute'
      }).fadeIn(200);
  }); // end mouseover
  $('.trigger').mouseout(function() {
    $('.toolTip').fadeOut(200);
  }); // end mouseout
}); // end ready

function setPicture(imgPath) {
  var oldImage = $('#photo img');
  var newImage = $('<img src="' + imgPath + '">');
  newImage.hide();
  $('#photo').prepend(newImage);
  newImage.fadeIn(1000);
  oldImage.fadeOut(1000, function() {
    $(this).remove();
  }); // end fade out 
}

function openSubMenu() {
  $(this).find('ul').css('visibility', 'visible');
}

function closeSubMenu() {
  $(this).find('ul').css('visibility', 'hidden');
}
