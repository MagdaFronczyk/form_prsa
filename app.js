document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const formData = new FormData();

  const handleInput = (selector, formDataKey) => {
    const value = document.querySelector(selector).value;
    formData.append(formDataKey, value);
  }

  const handleCheckbox = (selector) => {
    const checkedBoolean = document.querySelector(selector).checked;
    const rulesJson = JSON.stringify({
      IsAcceptedGeneralRules: checkedBoolean
    });
    console.log(rulesJson);
    formData.append("rulesJson", rulesJson);
  }

  const handleFiles = (selector, name) => {
    const files = document.querySelector(selector).files;
    console.log(files);
    for (let file of files) {
      formData.append(name, file);
    }
  }

  form.addEventListener("submit", e => {

    handleInput("#firstName", "FirstName");
    handleInput("#lastName", "LastName");
    handleInput("#nick", "Nick");
    handleInput("#e-mail", "Email");
    handleCheckbox("#agreement");
    handleFiles("#music-file", "audio-file");
    handleFiles("#image-file", "image-file");
    handleFiles("#document-file", "documents");

    for (let el of formData.entries()) {
      console.log(el);
    }
    e.preventDefault();

    fetch("http://localhost:55899/saveform", {
      method: 'POST',
      body: formData
    }).then(console.log("hhhh"));

  });


});