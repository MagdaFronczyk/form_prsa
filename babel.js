"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var formButton = document.querySelector("#nowa-tradycja-form-main .form-button");
  var addFileButton = document.querySelector("#nowa-tradycja-form-main .add-file-button");
  var formData = new FormData();
  var textInputvalidation;
  var agreementValidation;
  var emailValidation;
  var numberValidation;
  var audioValidation;
  addFileButton.addEventListener("click", function (e) {
    var mainContainer = document.querySelector(".nowa-tradycja-form_files");

    var addTextField = function addTextField(id, className, label) {
      var newInput = document.createElement("input");
      var newLabel = document.createElement("label");
      var container = document.createElement("div");
      container.classList.add("nowa-tradycja-form_field", "text-fields", className);
      var errorContainer = document.createElement("div");
      var errorEmpty = document.createElement("span");
      var errorShort = document.createElement("span");
      errorShort.classList.add("error-message", "short");
      errorShort.innerHTML = "Musi zwierać conajmniej 3 znaki";
      errorEmpty.innerHTML = "Pole obowiązkowe";
      errorContainer.classList.add("error-container");
      errorEmpty.classList.add("error-message", "empty");
      errorContainer.append(errorEmpty);
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
    var newMusicFileInput = document.createElement("input");
    var newMusicFileLabel = document.createElement("label");
    newMusicFileLabel.innerHTML = "Przeglądaj";
    newMusicFileInput.setAttribute("type", "file");
    newMusicFileInput.setAttribute("id", "music-file");
    newMusicFileLabel.setAttribute("for", "music-file");
    newMusicFileLabel.classList.add("file-field");
    mainContainer.append(newMusicFileLabel, newMusicFileInput);
  });

  var handleTextInput = function handleTextInput(selector, key) {
    var fieldContainers = document.querySelectorAll(selector);
    fieldContainers.forEach(function (container) {
      var input = container.querySelector("".concat(selector, " input"));
      var value = input.value;

      if (!value.length || value.length < 3 || value.length > 50 || !isNaN(value)) {
        input.classList.remove("valid");
        input.classList.add("invalid");

        if (!value.length) {
          var error = container.querySelector(".empty");
          error.style.display = "block";
        } else if (value.length && value.length < 3 && isNaN(value)) {
          var _error = container.querySelector(".short");

          _error.style.display = "block";
        } else if (value.length > 50 && isNaN(value)) {
          var _error2 = container.querySelector(".long");

          _error2.style.display = "block";
        } else if (!isNaN(value)) {
          var _error3 = container.querySelector(".letters");

          _error3.style.display = "block";
        }

        textInputvalidation = false;
      } else {
        var errors = container.querySelectorAll(".error-message");
        errors.forEach(function (error) {
          error.style.display = "none";
        });
        input.classList.remove("invalid");
        input.classList.add("valid");
        formData.append(key, value);
        textInputvalidation = true;
      }
    });
  };

  var handleCheckbox = function handleCheckbox(selector) {
    var checkedBoolean = document.querySelector(selector).checked;
    agreementValidation = checkedBoolean;
    var rulesJson = JSON.stringify({
      IsAcceptedGeneralRules: checkedBoolean
    });
    formData.append("rulesJson", rulesJson);
  };

  var handleFiles = function handleFiles(selector, name) {
    var files = document.querySelector(selector).files;
    audioValidation = true;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var file = _step.value;
        formData.append(name, file);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var handleExtraFields = function handleExtraFields() {
    var extraFields = {
      AddressStreet: "",
      AddressCity: "",
      ZipCode: "",
      Phone: "",
      Fax: "",
      BandMembersCount: "",
      UsedInstruments: "",
      TechnicalNeeds: "",
      ShortProgramDescribe: "",
      PerformerBiography: ""
    };

    var handleExtraTextInput = function handleExtraTextInput(selector, key) {
      var fieldContainer = document.querySelector(selector);
      var input = fieldContainer.querySelector("".concat(selector, " input"));
      var value = input.value;

      if (!value.length || value.length < 3 || value.length > 50 || !isNaN(value)) {
        input.classList.remove("valid");
        input.classList.add("invalid");

        if (!value.length) {
          var error = fieldContainer.querySelector(".empty");
          error.style.display = "block";
        } else if (value.length && value.length < 3 && isNaN(value)) {
          var _error4 = fieldContainer.querySelector(".short");

          _error4.style.display = "block";
        } else if (value.length > 50 && isNaN(value)) {
          var _error5 = fieldContainer.querySelector(".long");

          _error5.style.display = "block";
        } else if (!isNaN(value)) {
          var _error6 = fieldContainer.querySelector(".letters");

          _error6.style.display = "block";
        }

        textInputvalidation = false;
      } else {
        var errors = fieldContainer.querySelectorAll(".error-message");
        errors.forEach(function (error) {
          error.style.display = "none";
        });
        input.classList.remove("invalid");
        input.classList.add("valid");
        extraFields[key] = value;
        textInputvalidation = true;
      }
    };

    var handleExtraNumbers = function handleExtraNumbers(selector, key) {
      var fieldContainer = document.querySelector(selector);
      var input = fieldContainer.querySelector("".concat(selector, " input"));
      var value = input.value;

      if (!value.length || isNaN(value)) {
        input.classList.remove("valid");
        input.classList.add("invalid");
        numberValidation = false;

        if (!value.length) {
          var error = fieldContainer.querySelector(".empty");
          error.style.display = "block";
        } else if (isNaN(value)) {
          var _error7 = fieldContainer.querySelector(".letters");

          _error7.style.display = "block";
        }
      } else {
        var errors = fieldContainer.querySelectorAll(".error-message");
        errors.forEach(function (error) {
          error.style.display = "none";
        });
        input.classList.remove("invalid");
        input.classList.add("valid");
        extraFields[key] = value;
        numberValidation = true;
      }
    };

    var validateZipCode = function validateZipCode(selector, key) {
      var fieldContainer = document.querySelector(selector);
      var input = fieldContainer.querySelector("".concat(selector, " input"));
      var value = input.value;

      if (!value.length || value.length !== 5 || isNaN(value)) {
        input.classList.remove("valid");
        input.classList.add("invalid");
        numberValidation = false;

        if (!value.length) {
          var error = fieldContainer.querySelector(".empty");
          error.style.display = "block";
        } else if (value.length && value.length < 4 && !isNaN(value)) {
          var _error8 = fieldContainer.querySelector(".short");

          _error8.style.display = "block";
        } else if (isNaN(value)) {
          var _error9 = fieldContainer.querySelector(".letters");

          _error9.style.display = "block";
        } else if (value.length && value.length > 4 && !isNaN(value)) {
          var _error10 = fieldContainer.querySelector(".long");

          _error10.style.display = "block";
        }
      } else {
        var errors = fieldContainer.querySelectorAll(".error-message");
        errors.forEach(function (error) {
          error.style.display = "none";
        });
        input.classList.remove("invalid");
        input.classList.add("valid");
        extraFields[key] = value;
        numberValidation = true;
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
    var extraFieldsJson = JSON.stringify(extraFields);
    formData.append("ExtraFieldsJSON", extraFieldsJson);
  };

  var handleEmail = function handleEmail(selector, key) {
    var fieldContainer = document.querySelector(selector);
    var input = fieldContainer.querySelector("".concat(selector, " input"));
    var value = input.value;

    if (value.indexOf("@") > -1) {
      var errors = fieldContainer.querySelectorAll(".error-message");

      if (errors) {
        errors.forEach(function (error) {
          return error.style.display = "none";
        });
      }

      input.classList.remove("invalid");
      input.classList.add("valid");
      emailValidation = true;
      formData.append(key, value);
    } else {
      if (!value.length) {
        var error = fieldContainer.querySelector(".empty");
        error.style.display = "block";
      } else if (value.length) {
        var _error11 = fieldContainer.querySelector(".symbols");

        _error11.style.display = "block";
      }

      emailValidation = false;
      input.classList.remove("valid");
      input.classList.add("invalid");
    }
  };

  formButton.addEventListener("click", function (e) {
    var audioFiles = document.querySelectorAll("#music-file");
    audioFiles.forEach(function (input) {
      if (input) {
        handleTextInput(".title", "SongTitle");
        handleTextInput(".author", "SongAuthor");
        handleTextInput(".artist", "SongArtist");
      }

      ;

      if (input.files.length > 0) {
        handleFiles(input.id, "audio-file");
      }
    });
    handleTextInput(".firstName", "FirstName");
    handleTextInput(".lastName", "LastName");
    handleTextInput(".nick", "Nick");
    handleEmail(".e-mail", "Email");
    handleCheckbox("#agreement");
    handleExtraFields();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = formData.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var el = _step2.value;
        console.log(el);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
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