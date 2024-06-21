import { fetchData } from "./functions.js";

let sockPage = 0;

async function getData() {
  sockPage++;
  // Use fetch to retrieve data over the network from an API endpoint
  const [socks, error] = await fetchData(
    `https://ecs.the-sock-exchange.com/api/socks/${sockPage}/10`
  );
  console.log({ socks, error });
  if (!socks.length) {
    sockPage = 0;
    getData();
    alert("No more data to fetch! Starting over from the beginning.");
  }
  updateHTML(socks); // Update HTML after data is fetched
}

const updateHTML = (socks) => {
  const sockTable = document.querySelector("#table-body");
  sockTable.innerHTML = "";

  for (const sock of socks) {
    const tableRow = document.createElement("tr");
    const sockDetails = sock.sockDetails;
    tableRow.innerHTML = `
            <td>${sockDetails.size}</td>
            <td>${sockDetails.color}</td>
            <td>${sockDetails.pattern}</td>
            <td>${sockDetails.material}</td>
            <td>${sockDetails.condition}</td>
            <td>${sockDetails.forFoot}</td>
        `;
    sockTable.append(tableRow);
  }
  // for (let i = 0; i < socks.length; i++) {
  // 	let sock = socks[i];
  // 	let sockDiv = document.createElement('div');
  // 	sockDiv.innerHTML = `<div>Color: ${sock.color}</div><div>Size: ${sock.size}</div>`;
  // 	document.getElementById('data').appendChild(sockDiv);
  // }
};

// Call the function to fetch and update data
getData();

document.querySelector("#next-button").addEventListener("click", getData);
