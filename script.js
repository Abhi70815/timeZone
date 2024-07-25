// Constants
const apiKey = "fab8363b8ad84349bd47fea8b3407e0d";
let timezone = [];
let currId="currTimezone"
let newId="newTimezone"

// Variables
let lat;
let lon;

// Function to get user's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to handle user's location
async function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat, lon);

  // Fetch timezone from Geoapify API
  try {
    let res= await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=fab8363b8ad84349bd47fea8b3407e0d`)
 let res2=await res.json()  

console.log(res2);
      if (res2.results.length) {
        timezone = res2.results[0];
        console.log(timezone);
        displayTimezone(timezone ,currId);

      } else {
        console.log("No location found");
      }
  } 
catch (error) {
  console.error("Error fetching timezone:", error);
  
 }
  
}

// Call function to get user's location
getLocation();

function displayTimezone(timezone ,id) {
console.log(timezone,id);
  document.getElementById(id).innerHTML = `
  <p>Name of Time Zone :-  ${timezone.timezone.name}</p>
  <div>
    <p>lat :-  ${timezone.lat}</p>
    <p>Long :-  ${timezone.lon}</p>
  </div>
  <p>Offset STD :-  ${timezone.timezone.offset_STD}</p>
  <p>Offset STD Seconds:-  ${timezone.timezone.offset_STD_seconds}</p>
  <p>Offset DST :-  ${timezone.timezone.offset_DST}</p>

  <p> Offset DST Seconds :-  ${timezone.timezone.offset_DST_seconds}</p>
  <p>Country :-  ${timezone.country}</p>
  <p>Postcode :-  ${timezone.state_code}</p>
  <p>City :-  ${timezone.county}</p>
  `;

}

const address = document.getElementById('address');

// const address = 'Carrer del Pintor Navarro Llorens, 7, 46008 València, Valencia, Spain';

document.getElementById('btn').addEventListener('click',()=>{
  console.log("add",address.value);
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address.value)}&apiKey=${apiKey}`)
  .then(resp => resp.json())
  .then((geocodingResult) => {
    
    let timezone2 = geocodingResult.features[0].properties;
    console.log("newTimezon", timezone2);
    displayTimezone(timezone2,newId);
  });

})