// Test that this damn script works
console.log("Hello there!");


// Object containing the data for the content for the modals
// that appear on the front page map.
//
let mapModalContent = {

  az: {
    stateName: "Arizona",
    svgPath: "img/modal-arizona.svg",
    cityList: [
      ["https://www.inselfstorage.com/az-tucson-north-travel-center-drive/", "Tucson"]
    ]
  },

  ca: {
    stateName: "California",
    svgPath: "img/modal-california.svg",
    cityList: [
      ["https://www.inselfstorage.com/cupertino/", "Cupertino"],
      ["https://www.inselfstorage.com/elk-grove-highway-99/", "Elk Grove", "Highway 99"],
      ["https://www.inselfstorage.com/elk-grove-waterman/", "Elk Grove", "Waterman"],
      ["https://www.inselfstorage.com/milpitas/", "Milpitas"],
      ["https://www.inselfstorage.com/expo/", "Sacramento", "Expo"],
      ["https://www.inselfstorage.com/south-sacramento/", "Sacramento", "South"]
    ]
  },

  co: {
    stateName: "Colorado",
    svgPath: "img/modal-colorado.svg",
    cityList: [
      ["https://www.inselfstorage.com/fitzsimons/", "Aurora", "Fitzsimons"],
      ["https://www.inselfstorage.com/aurora-havana/", "Aurora", "Havana"],
      ["https://www.inselfstorage.com/elizabeth/", "Elizabeth"],
      ["https://www.inselfstorage.com/estes-park/", "Estes Park"]
    ]
  },

  or: {
    stateName: "Oregon",
    svgPath: "img/modal-oregon.svg",
    cityList: [
      ["https://www.inselfstorage.com/salem/", "Salem"]
    ]
  },

  tx: {
    stateName: "Texas",
    svgPath: "img/modal-texas.svg",
    cityList: [
      ["https://www.inselfstorage.com/aubrey/", "Aubrey"],
      ["https://www.inselfstorage.com/fort-worth/", "Fort Worth"],
      ["https://www.inselfstorage.com/plano/", "Plano"],
      ["https://www.inselfstorage.com/wylie/", "Wylie"]
    ]
  },

  ut: {
    stateName: "Utah",
    svgPath: "img/modal-utah.svg",
    cityList: [
      ["https://www.inselfstorage.com/layton/", "Layton"],
      ["https://www.inselfstorage.com/westvalley/", "West Valley"]
    ]
  },

  wa: {
    stateName: "Washington",
    svgPath: "img/modal-washington.svg",
    cityList: [
      ["https://www.inselfstorage.com/burien/", "Burien"]
    ]
  },

  // This is a test/dummy location. As far as I'm aware, IN Self Storage
  // does not rent storage units out at the center of the galaxy. Be a 
  // lot cooler if we did...
  //
  mw: {
    stateName: "Sagittarius A",
    svgPath: "img/placeholder-square.svg",
    cityList: [
      ["https://en.wikipedia.org/wiki/S2_(star)", "S0-2"]
    ]
  }
}


// This makes the modal "X" close button close the modal.
//
$(document).ready(function() {
  $(".map-modal-close-button").click(function() {
    hideModal();
  });
});


// This prepares the page by hiding the modal and
// centering the map when the page loads
//
// $(document).ready(function() {
//   $(".map-modal-container").hide();
// });


// This was an attempt to make it to where clicking outside
// the modal would close it.
//
// $(document).ready(function() {
//   let object = event.target || event.srcElement;
// });


// Abstracting the modal show/hide functions
//
function showModal() {
  // This checks to see if the modal is currently hidden.
  //
  if ($( ".map-modal-container" ).css("display").toLowerCase() === "none") {
    // If it is, it will perform the slide animation.
    //
    $( ".map-modal-container, #map-modal-instructions" ).css("width", "0").show().animate({width: "30vw" }, {duration: 300} );
  } else {
    // If it isn't, and is presently displayed, it will simply fade to whatever state
    // gets clicked next.
    //
    $(".map-modal, #map-modal-instructions").fadeIn(300);
  }
}

function hideModal() {
  $( ".map-modal-container" ).animate({width: "0" }, {duration: 300, complete: function() {$(this).hide(); } } );
}


// This resets the modal so that if the user clicks a subsequent state, it doesn't get littered with
// irrelevant city names and the wrong state image. It does what is says -- resets the modal!
//
function resetModal(state = "mw") {
  $(".map-modal-location-list > ul > li").remove();
  $(".map-modal-state-image > img").attr("src", mapModalContent[state.toLowerCase()].svgPath);
}


// This basically just pulls info from the mapModalContent object upstairs
// and populates the map modal with appropriate content - for example so that
// when you click on Colorado on the map, the modal shows you Colorado stuff.
//
function writeModalContent(state) {
  // This part properly types the name of the state
  $(".state-name > span").text(mapModalContent[state.toLowerCase()].stateName);

  // This populates the modal with the correct image of the selected state :P
  $(".map-modal-state-image > img").attr("src", mapModalContent[state.toLowerCase()].svgPath);
  $('.map-modal-state-image').hide(0).show(0)

  // This behemoth of code makes the links look correct D:<
  mapModalContent[state.toLowerCase()].cityList.forEach(function(city) {
    if (city.length === 2) {
      cityName = city[1].replace(/ /g, "&nbsp;");
    } else if (city.length === 3) {
      cityName = `${city[1].replace(/ /g, "&nbsp;")} <span class="city-name-light">${city[2].replace(/ /g, "&nbsp;")}</span>`;
    }
    $(".map-modal-location-list > ul").append(`<li><a href="${city[0]}">${cityName}</a></li>`);
  });
}


// This is the meat and potatoes that actually programmatically
// updates the modal with the appropriate state's information.
//
$(document).ready(function() {
  $("#US-Map-Fill").click(function() {
    let states = ["AZ","CA","CO","OR","TX","UT","WA"];
    let state = event.target || event.srcElement;
    let stateID = state.id;
    console.log(`stateID: ${stateID}`);

    // If a user clicks on the text label of one of the states we do business in, rather than
    // the filled SVG shape of the state, the below IF statement fixes the "ID" that the above
    // event triggers pull so that it works with the subsequent IF statement and maintains a 
    // consistent user experience.
    //
    if (stateID.includes("-text")) {
      stateID = stateID.replace("-text", "");
    }

    // This checks to see if a state has more than one location.
    //
    if (states.includes(stateID) &&
      mapModalContent[stateID.toLowerCase()].cityList.length > 1) {
      // If it does, this block of the IF statement resets the modal, then writes the proper modal
      // content (based on which state the user clicked), and then displays the modal.
      // 
      resetModal();
      writeModalContent(stateID);
      showModal();
    } else if (states.includes(stateID) && mapModalContent[stateID.toLowerCase()].cityList.length === 1) {
      // If it doesn't, then... 

      $("#map-instructions").text("Redirecting to location...");
      hideModal();
      window.location.href = mapModalContent[stateID.toLowerCase()].cityList[0][0];
    } else if (!states.includes(stateID)) {
      console.log(stateID + " is not presently a valid state selection.")
    }
  });
});