document.addEventListener("DOMContentLoaded", () => {
  const formButton = document.querySelector(".button");

  const formData = new FormData();
  let textInputvalidation;
  let agreementValidation;
  let emailValidation;
  let numberValidation;

  const handleTextInput = (selector, key) => {

    const fieldContainer = document.querySelector(selector);
    const input = fieldContainer.querySelector(`${selector} input`);
    const value = input.value;

    if (!value.length || value.length < 3 || value.length > 50 || !isNaN(value)) {
      input.classList.remove("valid");
      input.classList.add("invalid");
      if (!value.length) {
        const error = fieldContainer.querySelector(".empty");
        error.style.display = "block";
      } else if (value.length && value.length < 3 && isNaN(value)) {
        const error = fieldContainer.querySelector(".short");
        error.style.display = "block";
      } else if (value.length > 50 && isNaN(value)) {
        const error = fieldContainer.querySelector(".long");
        error.style.display = "block";
      } else if (!isNaN(value)) {
        const error = fieldContainer.querySelector(".letters");
        error.style.display = "block";
      }
      textInputvalidation = false;
    } else {
      const errors = fieldContainer.querySelectorAll(".error-message");
      errors.forEach(error => {
        error.style.display = "none"
      });
      input.classList.remove("invalid");
      input.classList.add("valid");
      formData.append(key, value);
      textInputvalidation = true;
    }
  };

  const handleCheckbox = (selector) => {
    const checkedBoolean = document.querySelector(selector).checked;
    agreementValidation = checkedBoolean;
    const rulesJson = JSON.stringify({
      IsAcceptedGeneralRules: checkedBoolean
    });
    formData.append("rulesJson", rulesJson);
  };



  // const handleFiles = (selector, name) => {
  //   const files = document.querySelector(selector).files;
  //   console.log(files);
  //   for (let file of files) {
  //     formData.append(name, file);
  //   }
  // }

  const validateZipCode = (selector, key) => {
    const fieldContainer = document.querySelector(selector);
    const input = fieldContainer.querySelector(`${selector} input`);
    const value = input.value;

    if (!value.length || value.length !== 4 || isNaN(value)) {
      input.classList.remove("valid");
      input.classList.add("invalid");
      numberValidation = false;
      if (!value.length) {
        const error = fieldContainer.querySelector(".empty");
        error.style.display = "block";
      } else if (value.length && value.length < 4 && !isNaN(value)) {
        const error = fieldContainer.querySelector(".short");
        error.style.display = "block";
      } else if (isNaN(value)) {
        const error = fieldContainer.querySelector(".letters");
        error.style.display = "block";
      } else if (value.length && value.length > 4 && !isNaN(value)) {
        const error = fieldContainer.querySelector(".long");
        error.style.display = "block";
      }
    } else {
      const errors = fieldContainer.querySelectorAll(".error-message");
      errors.forEach(error => {
        error.style.display = "none"
      });
      input.classList.remove("invalid");
      input.classList.add("valid");
      formData.append(key, value);
      numberValidation = true;
    }

  };

  const handleNumbers = (selector, key) => {
    const fieldContainer = document.querySelector(selector);
    const input = fieldContainer.querySelector(`${selector} input`);
    const value = input.value;

    if (!value.length || isNaN(value)) {
      input.classList.remove("valid");
      input.classList.add("invalid");
      numberValidation = false;
      if (!value.length) {
        const error = fieldContainer.querySelector(".empty");
        error.style.display = "block";
      } else if (isNaN(value)) {
        const error = fieldContainer.querySelector(".letters");
        error.style.display = "block";
      }

    } else {
      const errors = fieldContainer.querySelectorAll(".error-message");
      errors.forEach(error => {
        error.style.display = "none"
      });
      input.classList.remove("invalid");
      input.classList.add("valid");
      formData.append(key, value);
      numberValidation = true;
    }
  }
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
    };

    handleTextInput(".street-name", "AddressStreet");
    handleTextInput(".city-name", "AddressCity");
    handleTextInput(".instruments", "UsedInstruments");
    handleTextInput(".technical-needs", "TechnicalNeeds");
    handleTextInput(".program", "ShortProgramDescribe");
    handleTextInput(".biografia", "PerformerBiography");
    validateZipCode(".zip-code", "ZipCode");
    handleNumbers(".phone", "Phone");
    handleNumbers(".fax", "Fax");
    handleNumbers(".band-count", "BandMembersCount");

    const extraFieldsJson = JSON.stringify(extraFields);
    formData.append("ExtraFieldsJSON", extraFieldsJson);

  };

  // const validateEmail = (email) => {
  //   let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // };

  const handleEmail = (selector, key) => {
    const fieldContainer = document.querySelector(selector);
    const input = fieldContainer.querySelector(`${selector} input`);
    const value = input.value;

    if (value.indexOf("@") > -1) {
      const errors = fieldContainer.querySelectorAll(".error-message");
      if (errors) {
        errors.forEach(error => error.style.display = "none");
      }
      input.classList.remove("invalid");
      input.classList.add("valid");
      emailValidation = true;
      formData.append(key, value);
    } else {
      if (!value.length) {
        const error = fieldContainer.querySelector(".empty");
        error.style.display = "block";
      } else if (value.length) {
        const error = fieldContainer.querySelector(".symbols");
        error.style.display = "block";
      }
      emailValidation = false;
      input.classList.remove("valid");
      input.classList.add("invalid");
    }
  };

  formButton.addEventListener("click", e => {

    handleTextInput(".firstName", "FirstName");
    handleTextInput(".lastName", "LastName");
    handleTextInput(".nick", "Nick");
    handleEmail(".e-mail", "Email");

    handleCheckbox("#agreement");
    // handleFiles("#music-file", "audio-file");
    // handleFiles("#image-file", "image-file");
    // handleFiles("#document-file", "documents");
    handleExtraFields();

    // for (let el of formData.entries()) {
    //   console.log(el);
    // }
    e.preventDefault();

    if (textInputvalidation && agreementValidation && emailValidation && numberValidation) {
      axios({
        method: 'post',
        data: formData,
        url: 'http://localhost:55899/saveform'
      }).then(console.log("Validated"));
    }
  });

});