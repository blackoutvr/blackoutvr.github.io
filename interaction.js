$(document).ready(function () {
  var mask1 = $('#mask1 circle')[0];

  $('#pic').mousemove(function (event) {
      event.preventDefault();
      var upX = event.clientX;
      var upY = event.clientY;

      mask1.setAttribute("cy", upY + 'px');
      mask1.setAttribute("cx", upX + 'px');
  });
})