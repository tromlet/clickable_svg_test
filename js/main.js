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
      ["Tucson", "https://www.inselfstorage.com/tucson"]
    ]
  },

  ca: {
    stateName: "California",
    svgPath: "img/modal-california.svg",
    cityList: [
      ["Cupertino", "https://www.inselfstorage.com/cupertino/"],
      ["Elk Grove - Highway 99", "https://www.inselfstorage.com/elk-grove-highway-99/"],
      ["Elk Grove - Waterman", "https://www.inselfstorage.com/elk-grove-waterman/"],
      ["Milpitas", "https://www.inselfstorage.com/milpitas/"],
      ["Sacramento - Expo", "https://www.inselfstorage.com/expo/"],
      ["Sacramento - South", "https://www.inselfstorage.com/south-sacramento/"]
    ]
  },

  co: {
    stateName: "Colorado",
    svgPath: "img/modal-colorado.svg",
    cityList: [
      ["Aurora - Fitzsimons", "https://www.inselfstorage.com/fitzsimons/"],
      ["Aurora - Havana", "https://www.inselfstorage.com/aurora-havana/"],
      ["Elizabeth", "https://www.inselfstorage.com/elizabeth/"],
      ["Estes Park", "https://www.inselfstorage.com/estes-park/"]
    ]
  },

  or: {
    stateName: "Oregon",
    svgPath: "img/modal-oregon.svg",
    cityList: [
      ["Salem", "https://www.inselfstorage.com/salem/"]
    ]
  },

  tx: {
    stateName: "Texas",
    svgPath: "img/modal-texas.svg",
    cityList: [
      ["Aubrey","https://www.inselfstorage.com/aubrey/"],
      ["Fort Worth", "https://www.inselfstorage.com/fort-worth/"],
      ["Plano", "https://www.inselfstorage.com/plano/"],
      ["Wylie", "https://www.inselfstorage.com/wylie/"]
    ]
  },

  ut: {
    stateName: "Utah",
    svgPath: "img/modal-utah.svg",
    cityList: [
      ["Layton", "https://www.inselfstorage.com/layton/"],
      ["West Valley", "https://www.inselfstorage.com/westvalley/"]
    ]
  },

  wa: {
    stateName: "Washington",
    svgPath: "img/modal-washington.svg",
    cityList: [
      ["Burien", "https://www.inselfstorage.com/burien/"]
    ]
  }
}


// More programmatic show/hide function
//
// function showHideModal(stateID) {
//   $("#" + stateID).click(function() {
      
  
//     $(".map-modal").fadeToggle("fast");
//     $("#modal-instructions").fadeToggle("fast");
//   });
// }

// Working show/hide function (for California)
//
// $(document).ready(function() {
//   $("#CA").click(function() {
    

//     $(".map-modal").fadeToggle("fast");
//     $("#modal-instructions").fadeToggle("fast");
//   });
// });

// This makes the modal "X" close button close the modal.
//
$(document).ready(function() {
  $(".modal-close-button").click(function() {
    hideModal();
  });
});

// Abstracting the modal show/hide functions
//
function showModal() {
  $(".map-modal, #modal-instructions").fadeIn("fast");
}

function hideModal() {
  $(".map-modal, #modal-instructions").fadeOut("fast");
}

// This resets the modal so that if the user clicks a
// subsequent state, it doesn't get littered with irrelevant
// city names or the wrong state image.
//
function resetModal() {
  $(".modal-location-list > ul > li").remove();
  $(".modal-state-image").attr("src","img/modal-colorado.svg");
}

// This basically just pulls info from the mapModalContent variable upstairs
// and populates the map modal with appropriate content - for example so that
// when you click on Colorado on the map, the modal shows you Colorado stuff.
//
function writeModalContent(state) {
  $(".state-name > span").text(mapModalContent[state.toLowerCase()].stateName);

  if (mapModalContent[state.toLowerCase()].cityList.length > 1) {
    mapModalContent[state.toLowerCase()].cityList.forEach(function(city) {
      $(".modal-location-list > ul").append(`<li><a href="${city[1]}">${city[0].replace(" ","&nbsp;")}</a></li>`)
    });
  }

  $(".modal-state-image > img").attr("src",mapModalContent[state.toLowerCase()].svgPath);
}

// This is the meat and potatoes that actually programmatically
// updates the modal with the appropriate state's information.
//
$(document).ready(function() {
  $("#US-Map-Fill").click(function() {
    let states = ["AZ","CA","CO","OR","TX","UT","WA"];
    let state = event.target || event.srcElement;
    let stateID = state.id;

    if (states.includes(stateID) && mapModalContent[stateID.toLowerCase()].cityList.length > 1) {
      resetModal();
      writeModalContent(stateID);
      showModal();
    } else {
      window.location.href = mapModalContent[stateID.toLowerCase()].cityList[0][1];
    }

    $(`#${stateID}`).click(function() {
      hideModal();
    });
  });
});