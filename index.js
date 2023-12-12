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
  try {
    const response = await fetch(API_URL)
    const json = await response.json()

    state.parties = json.data
  } catch(error) {
    console.error(error)
  }
}

/**
 * Render artists from state
 */
function renderParties() {
  // TODO
  const parties = state.parties.map((party) => {
    const partyListed = document.createElement('li')
    partyListed.innerHTML = `
    <p>${party.name}</p>
    <p>${party.date}</p>
    <p>${party.time}</p>
    <p>${party.location}</p>
    <p>${party.description}</p>
    `;

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    partyListed.append(deleteButton)

    return partyListed
  })
  partyList.replaceChildren(...parties) // taking the parties out of the array 
}

/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */
function addParty(event) {
  event.preventDefault();

  // TODO
}


