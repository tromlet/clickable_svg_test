// Test that this damn script works
console.log("Hello there!");

// First attempt at making the fadeToggle() work
//
$(document).ready(function() {
  $("#CA").click(function() {
    $(".map-modal").fadeToggle("fast");
  });
});

// (function($) {
// 	$(function() {
// 		$("#CA").click(function() {
// 			$(".map-modal").fadeToggle(500);
// 		});
// 	});
// })(jQuery);