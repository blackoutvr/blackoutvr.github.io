function updateScroll() {
  var st = $(window).scrollTop();

  var nav = 100;
  var img = 200;

  $('#content-logo').css({opacity: Math.max(0, (1 - st/img))});
  $('#nav').css({opacity: Math.max(0, (1 - st/nav))});
}

$(window).on('scroll', updateScroll);

function getSound(x, y) {
  if (x === 0 && y === 1) {
    return "light";
  }
  if (x === 1 && y === 2) {
    return "drips";
  }
  if (x === 2 && y === 2) {
    return "rats";
  }
  if (x === 3 && y === 1) {
    return "door";
  }
  if (x === 4 && y === 1) {
    return "chains";
  }
  return null;
}

var moveFlicker = true;

function spotlight() {
  var mask = $('#mask-flicker circle')[0];
  if (moveFlicker) {
    var x = $(window).width()/2 + Math.random()*450;
    var y = $(window).height()/2 + Math.random()*188;
    mask.setAttribute("cx", x + 'px');
    mask.setAttribute("cy", y + 'px');

    mask.style.opacity = 1;
  }
  else {
    mask.style.opacity = 0;
  }

  setTimeout(spotlight, Math.random()*(moveFlicker ? 200 : 900) + 200);

  moveFlicker = !moveFlicker;
}

function flicker() {
  var opacity = Math.random()*0.15 + 0.05;

  $('#flickering-logo').css({opacity: Math.max(0, opacity)});

  setTimeout(flicker, Math.random()*300 + 300);
}

$(document).ready(function () {
  updateScroll();
  flicker();
  spotlight();

  $('#sub-submit').click(function(e) {
    var email = $('input#email').val();
    if (email.length === 0) {
      return;
    }

    $('#subicon').removeClass("fa-arrow-right").addClass("fa-circle-o-notch fa-spin");

    $.post("https://script.google.com/macros/s/AKfycbwBZTjQsL7t3YIUWR4piPQB5f2n29-JQ4eFof7o388giKT0CHO9/exec",
      {
        email: email
      }
    ).done(function(data)
      {
        $('#subicon').removeClass("fa-circle-o-notch fa-spin").addClass("fa-check");
        $('input#email').val("we'll be in touch. listen closely.").prop("disabled", true);
        $('input#email').css({
          "text-align": "center",
          "letter-spacing": "0px",
          "font-size": "18px",
        });
        $('#sub-submit').prop("disabled", true);
      }
    ).fail(function() {
    });
  });
  
  var mask1 = $('#mask1 circle')[0];
  var sound = null;

  $('#mute').click(function(e) {
    e.preventDefault();
    $('#mute i').toggleClass('fa-volume-up fa-volume-off');
    $('audio').prop('muted', !$('#ambience').prop('muted'));
  });

  // Fade in menu after some time
  if (window.location.pathname === '/') {
    setTimeout(function () {
      $('#nav').fadeIn(1500);
    }, 1000);  

    setTimeout(function () {
      $('#subscribe').fadeIn(2000);
    }, 2000);  
  }
  else {
    $('#nav').show();
    $('#subscribe').show();
  }
  
  // Mute everything but ambience
  $('audio:not(#ambience)').prop("volume", 0)

  $('.container').mousemove(function (event) {
      event.preventDefault();

      // Mask
      var x = event.clientX;
      var y = event.clientY;
      mask1.setAttribute("cx", x + 'px');
      mask1.setAttribute("cy", y + 'px');

      // Calculate grid position
      var wVid = 1440;
      var hVid = 811;

      var wWin = $(window).width();
      var hWin = $(window).height();

      var xGrid = 0;
      var yGrid = 0;
      var wGrid = 0;
      var hGrid = 0;

      if (wWin/hWin > wVid/hVid) {
        hGrid = hWin;
        wGrid = hGrid * (wVid / hVid);
      } else {
        wGrid = wWin;
        hGrid = wGrid * (hVid / wVid);
      }

      xGrid = (wWin - wGrid)/2;
      yGrid = (hWin - hGrid)/2;

      x -= xGrid;
      y -= yGrid;

      if (x >= 0 && x <= wGrid &&
          y >= 0 && y <= hGrid) {

        var wCol = wGrid/5;
        var hRow = hGrid/3;

        var col = Math.floor(x / wCol);
        var row = Math.floor(y / hRow);

        var newSound = getSound(col, row);

        if (sound !== newSound) {
          if (sound) {
            $("#"+sound).animate({volume: 0.0}, 1000);
          }
          if (newSound) {
            $("#"+newSound).animate({volume: 1.0}, 1000);
          }
          sound = newSound;
        }
      }
  });
})