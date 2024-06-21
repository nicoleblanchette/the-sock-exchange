import { fetchData } from "./functions.js";

const registerUser = async (e) => {
  const form = document.querySelector("#register-form");
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);

  const url = "https://ecs.the-sock-exchange.com/api/register";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObj),
  };

  const [response, error] = await fetchData(url, options);
  console.log({ response, error });
  document.querySelector("#status").textContent =
    response.message || error.message;
};

document
  .querySelector("#register-form")
  .addEventListener("submit", registerUser);
