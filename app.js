document.addEventListener("DOMContentLoaded", () => {
  const formButton = document.querySelector("#nowa-tradycja-form-main .form-button");
  const addFileButton = document.querySelector("#nowa-tradycja-form-main .add-file-button");

  const formData = new FormData();
  let textInputvalidation, agreementValidation, emailValidation, numberValidation, audioValidation;

  addFileButton.addEventListener("click", (e) => {
    const mainContainer = document.querySelector(".nowa-tradycja-form_files");

    const addTextField = (id, className, label) => {
      const newInput = document.createElement("input");
      const newLabel = document.createElement("label");
      const container = document.createElement("div");
      container.classList.add("nowa-tradycja-form_field", "text-fields", className);
      const errorContainer = document.createElement("div");
      const errorEmpty = document.createElement("span");
      const errorShort = document.createElement("span");
      const errorLetters = document.createElement("span");
      errorLetters.classList.add("error-message", "letters");
      errorLetters.innerHTML = "Nie możesz używać liczb"
      errorShort.classList.add("error-message", "short");
      errorShort.innerHTML = "Musi zwierać conajmniej 3 znaki";
      errorEmpty.innerHTML = "Pole obowiązkowe";
      errorContainer.classList.add("error-container");
      errorEmpty.classList.add("error-message", "empty");
      errorContainer.append(errorEmpty, errorShort, errorLetters);
      newLabel.setAttribute("for", id);
      newLabel.innerHTML = label;
      newInput.setAttribute("id", id);
      newInput.setAttribute("type", "text");
      container.append(newLabel, newInput, errorContainer);
      mainContainer.append(container);

    };

    addTextField("title", "title", "Title");
    addTextField("artist", "artist", "Artysta");
    addTextField("author", "author", "Autor");

    const newMusicFileInput = document.createElement("input");
    const newMusicFileLabel = document.createElement("label");
    newMusicFileLabel.innerHTML = "Przeglądaj";
    newMusicFileInput.setAttribute("type", "file");
    newMusicFileInput.setAttribute("id", "music-file");
    newMusicFileLabel.setAttribute("for", "music-file");
    newMusicFileLabel.classList.add("file-field");

    mainContainer.append(newMusicFileLabel, newMusicFileInput);

  });

  const handleTextInput = (selector, key) => {

    const fieldContainers = document.querySelectorAll(selector);

    fieldContainers.forEach(container => {
      const input = container.querySelector(`${selector} input`);
      const value = input.value

      if (!value.length || value.length < 3 || value.length > 50 || !isNaN(value)) {
        input.classList.remove("valid");
        input.classList.add("invalid");
        if (!value.length) {
          const error = container.querySelector(".empty");
          error.style.display = "block";
        } else if (value.length && value.length < 3 && isNaN(value)) {
          const error = container.querySelector(".short");
          error.style.display = "block";
        } else if (value.length > 50 && isNaN(value)) {
          const error = container.querySelector(".long");
          error.style.display = "block";
        } else if (!isNaN(value)) {
          const error = container.querySelector(".letters");
          error.style.display = "block";
        }
        textInputvalidation = false;
      } else {
        const errors = container.querySelectorAll(".error-message");
        errors.forEach(error => {
          error.style.display = "none"
        });
        input.classList.remove("invalid");
        input.classList.add("valid");
        formData.append(key, value);
        textInputvalidation = true;
      }
    });

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

  //   audioValidation = true;
  //   for (let file of files) {
  //     formData.append(name, file);
  //   }

  // };

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

    const handleExtraTextInput = (selector, key) => {

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
        extraFields[key] = value;
        textInputvalidation = true;
      }
    };

    const handleExtraNumbers = (selector, key) => {
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
        extraFields[key] = value;
        numberValidation = true;
      }
    };

    const validateZipCode = (selector, key) => {
      const fieldContainer = document.querySelector(selector);
      const input = fieldContainer.querySelector(`${selector} input`);
      const value = input.value;
      numberValidation = false;

      if (value.length && value.length === 5 && !isNaN(value)) {
        const errors = fieldContainer.querySelectorAll(".error-message");
        errors.forEach(error => {
          error.style.display = "none"
        });
        input.classList.remove("invalid");
        input.classList.add("valid");
        extraFields[key] = value;
        numberValidation = true;
      } else {
        input.classList.remove("valid");
        input.classList.add("invalid");

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
      }

    };

    handleExtraTextInput(".street-name", "AddressStreet");
    handleExtraTextInput(".city-name", "AddressCity");
    handleExtraTextInput(".instruments", "UsedInstruments");
    handleExtraTextInput(".technical-needs", "TechnicalNeeds");
    handleExtraTextInput(".program", "ShortProgramDescribe");
    handleExtraTextInput(".biografia", "PerformerBiography");
    validateZipCode(".zip-code", "ZipCode");
    handleExtraNumbers(".phone", "Phone");
    handleExtraNumbers(".fax", "Fax");
    handleExtraNumbers(".band-count", "BandMembersCount");

    const extraFieldsJson = JSON.stringify(extraFields);
    formData.append("ExtraFieldsJSON", extraFieldsJson);

  };

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

    const audioFiles = document.querySelectorAll("#music-file");
    const songs = [];

    audioFiles.forEach(input => {
      audioValidation = false;;

      if (input) {
        handleTextInput("#nowa-tradycja-form-main .nowa-tradycja-form_files .title", "SongTitle");
        handleTextInput("#nowa-tradycja-form-main .nowa-tradycja-form_files .author", "SongAuthor");
        handleTextInput("#nowa-tradycja-form-main .nowa-tradycja-form_files .artist", "SongArtist");
      };
      if (input.files.length > 0) {
        const files = input.files;
        audioValidation = true;

        for (let file of files) {
          songs.push(file);

        }
        audioValidation = true;
      }
    });

    formData.append("audio-file", songs);

    handleTextInput(".firstName", "FirstName");
    handleTextInput(".lastName", "LastName");
    handleTextInput(".nick", "Nick");
    handleEmail(".e-mail", "Email");
    handleCheckbox("#agreement");
    handleExtraFields();

    for (let el of formData.entries()) {
      console.log(el);
    }
    e.preventDefault();

    if (textInputvalidation && agreementValidation && emailValidation && numberValidation && audioValidation) {
      axios({
        method: 'post',
        data: formData,
        url: 'http://localhost:55899/saveform'
      }).then(console.log("Validated"));
    }
  });

});