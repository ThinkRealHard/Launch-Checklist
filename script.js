window.addEventListener("load", function(){

   const form = document.getElementById("launchInfo");
   let missionTarget = document.querySelector("#missionTarget");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {
               let counter = Math.floor(Math.random()*json.length);
               missionTarget.innerHTML = `<h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[counter].name}</li>
                     <li>Diameter: ${json[counter].diameter}</li>
                     <li>Star: ${json[counter].star}</li>
                     <li>Distance from Earth: ${json[counter].distance}</li>
                     <li>Number of Moons: ${json[counter].moons}</li>
                  </ol>
               <img src="${json[counter].image}"></img>`;
      });
   });

   form.addEventListener('submit', function(event){
      event.preventDefault();
      let astro1 = document.querySelector("input[name=pilotName]");
      let astro2 = document.querySelector("input[name=copilotName]");
      let fuel1 = document.querySelector("input[name=fuelLevel]");
      let cargo1 = document.querySelector("input[name=cargoMass]");
      let faulty = document.querySelector("#faultyItems");
      let banner = document.querySelector("#launchStatusCheck");
      let bannersub = document.querySelector("#launchStatus");

      if (astro1.value === "" || astro2.value === "" || fuel1.value === "" || cargo1.value === "") {
         window.alert("All fields are required!");
      } else if (isNaN(astro1.value) === false || isNaN(astro2.value) === false || isNaN(fuel1.value) || isNaN(cargo1.value)) {
         window.alert("Wrong type of data!");
      } else {
         if (Number(fuel1.value) < 10000 && Number(cargo1.value) > 10000){
         faulty.style.visibility = "visible";
         bannersub.innerHTML = "Shuttle not ready for launch";
         banner.style.backgroundColor = "#CC4C4C";
         faulty.innerHTML = `
                <ol>
                    <li id="pilotStatus">Pilot ${astro1.value} Ready</li>
                    <li id="copilotStatus">Co-pilot ${astro2.value} Ready</li>
                    <li id="fuelStatus">Fuel level insufficient: ${fuel1.value} liters loaded</li>
                    <li id="cargoStatus">Cargo mass excceds load limit: ${cargo1.value} kilograms loaded</li>
                </ol>`;
         } else if (Number(fuel1.value) < 10000){
            faulty.style.visibility = "visible";
            bannersub.innerHTML = "Shuttle not ready for launch";
            banner.style.backgroundColor = "#CC4C4C";
            faulty.innerHTML = `
                   <ol>
                       <li id="pilotStatus">Pilot ${astro1.value} Ready</li>
                       <li id="copilotStatus">Co-pilot ${astro2.value} Ready</li>
                       <li id="fuelStatus">Fuel level insufficient: ${fuel1.value} liters loaded</li>
                       <li id="cargoStatus">Cargo mass ${cargo1.value} kilograms loaded</li>
                   </ol>`;
         } else if (Number(cargo1.value) > 10000){
            faulty.style.visibility = "visible";
            bannersub.innerHTML = "Shuttle not ready for launch";
            banner.style.backgroundColor = "#CC4C4C";
            faulty.innerHTML = `
                <ol>
                    <li id="pilotStatus">Pilot ${astro1.value} Ready</li>
                    <li id="copilotStatus">Co-pilot ${astro2.value} Ready</li>
                    <li id="fuelStatus">Fuel level ${fuel1.value} liters loaded</li>
                    <li id="cargoStatus">Cargo mass excceds load limit: ${cargo1.value} kilograms loaded</li>
                    </ol>`;
         } else {
            faulty.style.visibility = "visible";
            bannersub.innerHTML = "Launch Ready!";
            banner.style.backgroundColor = "#228B22";
            faulty.innerHTML = `
                <ol>
                    <li id="pilotStatus">Pilot ${astro1.value} Ready</li>
                    <li id="copilotStatus">Co-pilot ${astro2.value} Ready</li>
                    <li id="fuelStatus">Fuel level ${fuel1.value} liters loaded</li>
                    <li id="cargoStatus">Cargo mass ${cargo1.value} kilograms loaded</li>
                    </ol>`;
         }
      };
  });
});