let data, numResults, character;

async function getAPIResponse(requestModifier) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://superheroapi.com/api/1abf66a7ad0edf8281007dde18937207/";
    const url = proxyUrl + apiUrl + requestModifier;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return json;

    } catch (error) {
        console.error(error.message);
        return null; // Return null if there is an error
    }
}

async function loadDefaultCharacter() {
    const defaultId = "70";
    const characterData = await getAPIResponse(defaultId);

    if (characterData && characterData.name && characterData.image && characterData.powerstats && characterData.biography) {
        character = characterData;
        displayCharacter(-1);
    } else {
        document.getElementById("characterInfo").innerHTML = "Incomplete superhero data. Please try again.";
    }
}

async function getData() {
    const searchInput = document.getElementById("search").value.trim();

    // Empty Input Validation
    if (searchInput === "") {
        document.getElementById("searchResults").innerHTML = "Please enter a superhero name!";
        return;
    }

    // Invalid Characters Validation
    const validInput = /^[a-zA-Z0-9\s]*$/;
    if (!validInput.test(searchInput)) {
        document.getElementById("searchResults").innerHTML = "Please enter a valid superhero name!";
        return;
    }

    data = await getAPIResponse("search/" + searchInput);

    // API Response Validation
    if (!data) {
        document.getElementById("searchResults").innerHTML = "There was an issue fetching data.";
        return;
    }

    if (data.response === "error") {
        document.getElementById("searchResults").innerHTML = `No results found for ${searchInput}. Please try again.`;
        return;
    }

    numResults = data.results.length;

    // No Results Validation
    if (numResults === 0) {
        document.getElementById("searchResults").innerHTML = `No results found for ${searchInput}. Please try again.`;
        return;
    }

    let html = "<ul id='searchResultsList'>";

    for (let i = 0; i < numResults; i++) {
        html += "<li data-id='" + i + "' id = 'searchResultItem'>" + data.results[i].name + " (" + data.results[i].biography["full-name"] + ")</li>";
    }

    html += "</ul>";

    document.getElementById("searchResults").innerHTML = html;

    const listItems = document.querySelectorAll("#searchResultsList li");
    listItems.forEach(item => {
        item.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-id");
            displayCharacter(index);
        });
    });
}

function displayCharacter(index) {
    if (index != -1) {
        character = data.results[index];
    }

    // Incomplete Data Validation
    if (!character.name || !character.image || !character.powerstats || !character.biography) {
        document.getElementById("characterInfo").innerHTML = "Incomplete superhero data. Please try again.";
        return;
    }

    const characterInfo = `
        <h2 id="name">${character.name}</h2>
        <img id="heroImage" src="${character.image["url"]}">
        <div id="textContent">
            <h3 class="sectionTitle">Biography</h3>
            <hr>
            <p id="biography">
                <ul>
                    <li>Full Name: ${character.biography["full-name"]}</li>
                    <li>Alter Egos: ${character.biography["alter-egos"]}</li>
                    <li>Aliases: ${character.biography["aliases"]}</li>
                    <li>Birthplace: ${character.biography["place-of-birth"]}</li>
                    <li>First Appearance: ${character.biography["first-appearance"]}</li>
                    <li>Publisher: ${character.biography["publisher"]}</li>
                    <li>Alignment: ${character.biography["alignment"]}</li>
                </ul>
            </p>

            <h3 class="sectionTitle">Powerstats</h3>
            <hr>
            <p id="powerstats">
                <ul>
                    <li>Intelligence: ${character.powerstats["intelligence"]}</li>
                    <li>Strength: ${character.powerstats["strength"]}</li>
                    <li>Speed: ${character.powerstats["speed"]}</li>
                    <li>Durability: ${character.powerstats["durability"]}</li>
                    <li>Power: ${character.powerstats["power"]}</li>
                    <li>Combat: ${character.powerstats["combat"]}</li>
                </ul>
            </p>

            <h3 class="sectionTitle">Appearance</h3>
            <hr>
            <p id="appearance">
                <ul>
                    <li>Gender: ${character.appearance["gender"]}</li>
                    <li>Race: ${character.appearance["race"]}</li>
                    <li>Height: ${character.appearance["height"]}</li>
                    <li>Weight: ${character.appearance["weight"]}</li>
                    <li>Eye Color: ${character.appearance["eye-color"]}</li>
                    <li>Hair Colors: ${character.appearance["hair-color"]}</li>
                </ul>
            </p>

            <h3 class="sectionTitle">Work</h3>
            <hr>
            <p id="work">
                <ul>
                    <li>Occupation: ${character.work["occupation"]}</li>
                    <li>Base: <ul><li>${character.work["base"].split(", ").join("</li><li>")}</li></ul></li>
                </ul>
            </p>

            <h3 class="sectionTitle">Connections</h3>
            <hr>
            <p id="connections">
                <ul>
                    <li>Group Affiliations: <ul><li>${character.connections["group-affiliation"].split(", ").join("</li><li>")}</li></ul></li>
                    <li>Relatives: <ul><li>${character.connections["relatives"].split(", ").join("</li><li>")}</li></ul></li>
                </ul>
            </p>
        </div>
    `;

    document.getElementById("characterInfo").innerHTML = characterInfo;
}