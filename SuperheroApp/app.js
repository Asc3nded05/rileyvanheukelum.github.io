async function getAPIResponse(requestModifier) {
    /*const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://superheroapi.com/api/1abf66a7ad0edf8281007dde18937207/search/";
    const url = proxyUrl + apiUrl + requestModifier;*/

    const url = "https://superheroapi.com/api/1abf66a7ad0edf8281007dde18937207/search/";

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
    }
}

async function getData() {
    const searchInput = document.getElementById("search").value;
    let data = await getAPIResponse(searchInput);
}
