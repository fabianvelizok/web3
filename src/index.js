import Web3 from "web3";

window.onload = function() {
  let from;
  const provider = Web3.givenProvider;
  const web3 = new Web3(provider);

  // Elements
  const connectEl = document.querySelector("#connect");
  const contentEl = document.querySelector("#content");
  const accountEl = document.querySelector("#account");
  const formEl = document.querySelector("#form");
  const sendEl = document.querySelector("#send");

  // Functions
  const hasProvider = function() {
    return typeof provider !== "undefined";
  }

  const connect = async function() {
    if (!hasProvider()) {
      return alert("You need a web3 provider!");
    }

    try {
      await provider.request({ method: 'eth_requestAccounts' });

      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      from = accounts[0];

      // Styles
      connectEl.style.display = "none";
      contentEl.style.display = "block";
      accountEl.innerHTML = from;

    } catch (e) {
      alert("You have rejected the connection.");
    }
  }

  const submitForm = function(e) {
    e.preventDefault();

    const formData = new FormData(formEl);

    const recipient = formData.get("recipient");
    const amount = Number(formData.get("amount"));

    // Validations
    if (Number.isNaN(amount) || amount <= 0) {
      return alert("Invalid amount!");
    }

    if (!web3.utils.isAddress(recipient)) {
      return alert("Invalid address!");
    }

    web3.eth.sendTransaction({
      from,
      to: recipient,
      value: amount,
    }, function(err, success) {
      if (err) {
        return alert("Hubo un error al enviar la transacción!");
      }

      console.log("Transaccion correcta.", success);
    })
  }

  // Listeners
  connectEl.addEventListener("click", connect);
  formEl.addEventListener("submit", submitForm);
}