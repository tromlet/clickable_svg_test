function test() {
  
  function innerTest() {
    console.log("You've reached the inner test.");
  }
}


function content(contentID) {


  function map(input) {

    let content = {
      az: {
        stateName: "Arizona",
        population: 7171646,
        cities: [
          "Phoenix",
          "Tucson"
        ],
        allCities: function() {
          return content.az.cities;
        }
      }
    }

    return content[location];
  }

  function employees() {
    let content = {
      ts: {
        firstName: "Tom",
        lastName: "Spettigue",
        age: 31
      },

      kd: {
        firstName: "Kevin",
        lastName: "Day",
        age: 69
      },

      ab: {
        firstName: "Allicyn",
        lastName: "Bowles",
        age: 23
      }
    }
  }
}
