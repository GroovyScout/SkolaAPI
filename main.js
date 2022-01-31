// v1
async function loadIntoTable(url, table) {
  // izvēlas tabulas elementus
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  // sagaidam datus/atbildi no faila vai saites
  const response = await fetch(url);
  const {headers, rows} = await response.json();

  // iztīrām tabulu
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  // aizpildam tabulas galveni
  for (const headerText of headers) {
    const headerElement = document.createElement("th");
    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement);
  }

  // aizpildam tabulas rindas
  for (const row of rows) {
    const rowElement = document.createElement("tr");
    for (const cellText of row) {
      const cellElement = document.createElement("td");
      cellElement.textContent = cellText;
      rowElement.appendChild(cellElement);
    }
    tableBody.appendChild(rowElement);
  }
}

// izsaucam funkciju
loadIntoTable("./data.json", document.querySelector("table"));

// v2
// https://www.youtube.com/watch?v=FN_ffvw_ksE
function fetchData(url) {
  // iegūstam datus/atbildi no faila vai saites
  fetch(url).then(response => {
    // ja atbilde nav laba, tad izmetam kļūdu
    if(!response.ok) {
        throw Error("Response not ok!");
    }
    return response.json();
  }).then(data => {
    console.log(data);
    // ja atbilde ir laba, tad datus ieliekam html lapā
    const html = data.data.map(user => {
        return `
            <div class="user">
            <p><img src="${user.avatar}" alt="${user.first_name}"/></p>
            <p>Name: ${user.first_name}</p>
            <p>Email: ${user.email}</p>
            </div>
            `;
    }).join("");
    console.log(html);
    document.querySelector("#v2").innerHTML = html;
  }).catch(error => {
    // ja kaut kas noiet greizi, tad izmetam kļūdu
    console.log(error);
  });
}

// izsaucam funkciju
fetchData("https://reqres.in/api/users?page=2");

function postData(url) {
  fetch(url, {
    // sūtam(POST) datus uz servera, lai izveidotu jaunu lietotāju
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        name: "morpheus",
        job: "leader"
    })
  }).then(response => {
    // ja atbilde nav laba, tad izmetam kļūdu
    if(!response.ok) {
        throw Error("Response not ok!");
    }
    return response.json();
  }).then(data => {
    // ja atbilde ir laba, tad izprintējam atbildi konsolē
    console.log(data);
  }).catch(error => {
    // ja kaut kas noiet greizi, tad izmetam kļūdu
    console.log(error);
  });
}

// izsaucam funkciju
//postData("https://reqres.in/api/users");