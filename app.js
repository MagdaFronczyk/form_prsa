document.addEventListener("DOMContentLoaded", () => {
  const formButton = document.querySelector(".button");

  const formData = new FormData();
  let extraFieldsvalidation;
  let textInputvalidation;
  let agreementValidation;
  let emailValidation;

  const handleTextInput = (selector, key) => {

    const input = document.querySelector(selector);
    const value = input.value;


    if (value.length < 0 || value.length < 3 || value.length > 50 || isNaN(value) === false) {
      input.classList.remove("valid");
      input.classList.add("invalid");

      if (value.length <= 0) {
        const error = document.querySelector(".error-message.empty");
        error.style.display = "block";
      } else if (value.length >= 1 && value.length < 3) {
        const error = document.querySelector(".error-message.short");
        error.style.display = "block";
      } else if (value.length > 50) {
        const error = document.querySelector(".error-message.long");
        error.style.display = "block";
      }

      textInputvalidation = false;

    } else {
      const errors = document.querySelectorAll(".error-message");

      errors.forEach(error => {
        error.style.display = "none"
      });

      input.classList.remove("invalid");
      input.classList.add("valid");
      formData.append(key, value);
      textInputvalidation = true;
    }
  }

  const handleCheckbox = (selector) => {
    const checkedBoolean = document.querySelector(selector).checked;
    if (!checkedBoolean) {
      agreementValidation = false;
    } else {
      agreementValidation = true;
    }
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

    console.log(extraFieldsJson);
    console.log(extraFields)

    formData.append("ExtraFieldsJSON", extraFields);

  }

  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleEmail = (selector, key) => {
    const emailInput = document.querySelector(selector);
    const emailValue = emailInput.value;

    if (validateEmail(emailValue)) {
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
      emailValidation = true;
      formData.append(key, emailValue);
    } else {
      emailValidation = false;
      emailInput.classList.remove("valid");
      emailInput.classList.add("invalid");
    }
  }

  formButton.addEventListener("click", e => {

    handleTextInput("#firstName", "FirstName");
    handleTextInput("#lastName", "LastName");
    handleTextInput("#nick", "Nick");
    handleEmail("#e-mail", "Email");

    handleCheckbox("#agreement");
    // handleFiles("#music-file", "audio-file");
    // handleFiles("#image-file", "image-file");
    // handleFiles("#document-file", "documents");
    handleExtraFields();

    for (let el of formData.entries()) {
      console.log(el);
    }
    e.preventDefault();

    if (textInputvalidation && extraFieldsvalidation && agreementValidation && emailValidation) {
      axios({
        method: 'post',
        data: formData,
        url: 'http://localhost:55899/saveform'
      }).then(console.log("Validated"));
    }
  });

});