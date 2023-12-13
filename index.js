const COHORT = "2309-FTB-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    parties: [],
};

const partyList = document.querySelector("#parties");

const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

/**
 * Sync state with the API and rerender
 */
async function render() {
    await getParties();
    renderParties();
}
render();

/**
 * Update state with artists from API
 */
async function getParties() {
    // TODO
    try { // i actually deleted all of the listings, so the array will remain empty until the user can post a new event. but the post method isn't working
        const response = await fetch(API_URL)
        const json = await response.json()
        console.log(json)
        
        state.parties = json.data
        console.log(state.parties)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Render artists from state
 */
function renderParties() {
    // TODO
    if(!state.parties.length) {
        partyList.innerHTML = "<li>No events available</li>"
        return;
    }
    
    const parties = state.parties.map((party) => {
        const partyListed = document.createElement('li')
        partyListed.innerHTML = `
            <p>${party.name}</p>
            <p>${party.date}</p>
            <p>${party.location}</p>
            <p>${party.description}</p>
        `;

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        partyListed.append(deleteButton)
        deleteButton.addEventListener('click', () => { deleteParty(party.id) })

        return partyListed;
    });
    partyList.replaceChildren(...parties); // taking the parties out of the array 
}

/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */
async function addParty(event) {
    event.preventDefault(); 

    // TODO
    try { // 500 internal server error even when the date is entered correctly
        const response = await fetch(API_URL, {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: addPartyForm.name.value,
                date: addPartyForm.date.value,
                location: addPartyForm.location.value,
                description: addPartyForm.description.value
            }),
        });
        console.log(response)

        const json = await response.json();
        console.log(json)

        if (json.error) {
            throw new Error(json.message);
        }

        render();
    } catch (error) {
        console.error(error)
    }
}

async function deleteParty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Could not delete party')
        }

        render();
    } catch (error) {
        console.error(error)
    }
}


