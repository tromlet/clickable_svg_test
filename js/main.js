// Test that this damn script works
console.log("Hello there!");

// Object containing the data for the content for the modals
// that appear on the front page map.
//
let mapModalContent = {

  az: {
    stateName: "Arizona",
    svgPath: "",
    cityList: [
      "Tucson"
    ]
  },

  ca: {
    stateName: "California",
    svgPath: "",
    cityList: [
      "Cupertino",
      "Elk Grove - Highway 99",
      "Elk Grove - Waterman",
      "Milpitas",
      "Sacramento - Expo",
      "Sacramento - South"
    ]
  },

  co: {
    stateName: "Colorado",
    svgPath: "",
    cityList: [
      "Aurora - Fitzsimons",
      "Aurora - Havana"
    ]
  },

  or: {
    stateName: "Oregon",
    svgPath: "",
    cityList: [
      "Salem"
    ]
  },

  tx: {
    stateName: "Texas",
    svgPath: "",
    cityList: [
      "Aubrey",
      "Fort Worth",
      "Plano",
      "Wylie"
    ]
  },

  ut: {
    stateName: "Utah",
    svgPath: "",
    cityList: [
      "Layton",
      "West Valley"
    ]
  },

  wa: {
    stateName: "Washington",
    svgPath: "",
    cityList: [
      "Burien"
    ]
  }
}


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