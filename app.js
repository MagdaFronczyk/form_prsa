document.addEventListener("DOMContentLoaded", () => {
  const formButton = document.querySelector(".button");

  const formData = new FormData();
  let extraFieldsvalidation;
  let textInputvalidation;

  const handleTextInput = (selector, key) => {

    const input = document.querySelector(selector);
    const value = input.value;

    if (value === "" || value.length < 3 || value.length > 50 || isNaN(value) === false) {
      input.classList.remove("valid");
      input.classList.add("invalid");
      textInputvalidation = false;
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
      formData.append(key, value);
      textInputvalidation = true;
    }
  }

  const handleCheckbox = (selector) => {
    const checkedBoolean = document.querySelector(selector).checked;
    const rulesJson = JSON.stringify({
      IsAcceptedGeneralRules: checkedBoolean
    });
    formData.append("rulesJson", rulesJson);
  }

  // const handleFiles = (selector, name) => {
  //   const files = document.querySelector(selector).files;
  //   console.log(files);
  //   for (let file of files) {
  //     formData.append(name, file);
  //   }
  // }

  const handleExtraFields = () => {

    const extraFields = {
      AddressStreet: "",
      AddressCity: "",
      ZipCode: "",
      Phone: "",
      Fax: "",
      BandMembersCount: "",
      UsedInstruments: "",
      TechnicalNeeds: "",
      ShortProgramDescribe: "",
      PerformerBiography: "",
    }

    const validateTextExtraFields = (selector, key) => {
      const input = document.querySelector(selector);
      const value = input.value;

      if (value === "" || value.length < 3 || value.length > 50 || isNaN(value) === false) {
        input.classList.remove("valid");
        input.classList.add("invalid");
        extraFieldsvalidation = false;
      } else {
        extraFields[key] = value;
        input.classList.remove("invalid");
        input.classList.add("valid");
        extraFieldsvalidation = true;
      }
    }

    const validateNumberExtraFields = (selector, key) => {
      const input = document.querySelector(selector);
      const value = input.value;

      if (value === "" || isNaN(value)) {
        input.classList.remove("valid");
        input.classList.add("invalid");
        extraFieldsvalidation = false;
      } else {
        extraFields[key] = value;
        input.classList.remove("invalid");
        input.classList.add("valid");
        extraFieldsvalidation = true;
      }

    }


    validateTextExtraFields("#street-name", "AddressStreet");
    validateTextExtraFields("#city-name", "AddressCity");
    validateTextExtraFields("#instruments", "UsedInstruments");
    validateTextExtraFields("#technical-needs", "TechnicalNeeds");
    validateTextExtraFields("#program", "ShortProgramDescribe");
    validateTextExtraFields("#biografia", "PerformerBiography");
    validateNumberExtraFields("#zip-code", "ZipCode");
    validateNumberExtraFields("#phone", "Phone");
    validateNumberExtraFields("#fax", "Fax");
    validateNumberExtraFields("#band-count", "BandMembersCount");

    const extraFieldsJson = JSON.stringify(extraFields);

    formData.append("ExtraFieldsJSON", extraFieldsJson);

  }

  formButton.addEventListener("click", e => {

    handleTextInput("#firstName", "FirstName");
    handleTextInput("#lastName", "LastName");
    handleTextInput("#nick", "Nick");
    // handleInputText("#e-mail", "Email");
    handleCheckbox("#agreement");
    // handleFiles("#music-file", "audio-file");
    // handleFiles("#image-file", "image-file");
    // handleFiles("#document-file", "documents");
    handleExtraFields();

    for (let el of formData.entries()) {
      console.log(el);
    }
    e.preventDefault();

    if (textInputvalidation && extraFieldsvalidation) {
      axios({
        method: 'post',
        data: formData,
        url: 'http://localhost:55899/saveform'
      }).then(console.log("Validated"));
    }
  });

});