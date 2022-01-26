// v1
async function loadIntoTable(url, table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const response = await fetch(url);
  const {headers, rows} = await response.json();

  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  for (const headerText of headers) {
    const headerElement = document.createElement("th");
    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement);
  }

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

//loadIntoTable("./data.json", document.querySelector("table"));

// v2
// TODO: https://www.youtube.com/watch?v=FN_ffvw_ksE
function fetchData(url) {
    fetch(url).then(response => {
        if(!response.ok) {
            throw Error("Response not ok!");
        }
        return response.json();
    }).then(data => {
        console.log(data);
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
        console.log(error);
    });
}

fetchData("https://reqres.in/api/users?page=2");

function postData(url) {
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: "morpheus",
            job: "leader"
        })
    }).then(response => {
        if(!response.ok) {
            throw Error("Response not ok!");
        }
        return response.json();
    }).then(data => {
        
    }).catch(error => {
        console.log(error);
    });
}

//postData("https://reqres.in/api/users");