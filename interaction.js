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

$(document).ready(function () {
  var mask1 = $('#mask1 circle')[0];
  var sound = null;

  $('#about, #contact, #press').click(function() {
    $('.container').fadeOut(3000)  
  })

  $('#mute').click(function() {
    $('#mute i').toggleClass('fa-volume-up fa-volume-off')

    $('audio').prop('muted', !$('#ambience').prop('muted'))
  })

  // Fade in menu after some time
  setTimeout(function () {
    $('#nav').fadeIn(3000)  
  }, 1500);

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
            console.log("fading out "+sound);
            $("#"+sound).animate({volume: 0.0}, 1000);
          }
          if (newSound) {
            console.log("fading in "+newSound);
            $("#"+newSound).animate({volume: 1.0}, 1000);
          }
          sound = newSound;
        }
      }
  });
})