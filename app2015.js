"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var formButton = document.querySelector(".button");
  var formData = new FormData();
  var textInputvalidation;
  var agreementValidation;
  var emailValidation;
  var numberValidation;

  var handleTextInput = function handleTextInput(selector, key) {
    var fieldContainer = document.querySelector(selector);
    var input = fieldContainer.querySelector(selector + " input");
    var value = input.value;

    if (
      !value.length ||
      value.length < 3 ||
      value.length > 50 ||
      !isNaN(value)
    ) {
      input.classList.remove("valid");
      input.classList.add("invalid");

      if (!value.length) {
        var error = fieldContainer.querySelector(".empty");
        error.style.display = "block";
      } else if (value.length && value.length < 3 && isNaN(value)) {
        var _error = fieldContainer.querySelector(".short");

        _error.style.display = "block";
      } else if (value.length > 50 && isNaN(value)) {
        var _error2 = fieldContainer.querySelector(".long");

        _error2.style.display = "block";
      } else if (!isNaN(value)) {
        var _error3 = fieldContainer.querySelector(".letters");

        _error3.style.display = "block";
      }

      textInputvalidation = false;
    } else {
      var errors = fieldContainer.querySelectorAll(".error-message");
      errors.forEach(function (error) {
        error.style.display = "none";
      });
      input.classList.remove("invalid");
      input.classList.add("valid");
      formData.append(key, value);
      textInputvalidation = true;
    }
  };

  var handleCheckbox = function handleCheckbox(selector) {
    var checkedBoolean = document.querySelector(selector).checked;
    agreementValidation = checkedBoolean;
    var rulesJson = JSON.stringify({
      IsAcceptedGeneralRules: checkedBoolean
    });
    formData.append("rulesJson", rulesJson);
  };

  var validateZipCode = function validateZipCode(selector, key) {
    var fieldContainer = document.querySelector(selector);
    var input = fieldContainer.querySelector(selector + " input");
    var value = input.value;

    if (!value.length || value.length !== 4 || isNaN(value)) {
      input.classList.remove("valid");
      input.classList.add("invalid");
      numberValidation = false;

      if (!value.length) {
        var error = fieldContainer.querySelector(".empty");
        error.style.display = "block";
      } else if (value.length && value.length < 4 && !isNaN(value)) {
        var _error4 = fieldContainer.querySelector(".short");

        _error4.style.display = "block";
      } else if (isNaN(value)) {
        var _error5 = fieldContainer.querySelector(".letters");

        _error5.style.display = "block";
      } else if (value.length && value.length > 4 && !isNaN(value)) {
        var _error6 = fieldContainer.querySelector(".long");

        _error6.style.display = "block";
      }
    } else {
      var errors = fieldContainer.querySelectorAll(".error-message");
      errors.forEach(function (error) {
        error.style.display = "none";
      });
      input.classList.remove("invalid");
      input.classList.add("valid");
      formData.append(key, value);
      numberValidation = true;
    }
  };

  var handleNumbers = function handleNumbers(selector, key) {
    var fieldContainer = document.querySelector(selector);
    var input = fieldContainer.querySelector(selector + " input");
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
      formData.append(key, value);
      numberValidation = true;
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
    var extraFieldsJson = JSON.stringify(extraFields);
    formData.append("ExtraFieldsJSON", extraFieldsJson);
  };

  var handleEmail = function handleEmail(selector, key) {
    var fieldContainer = document.querySelector(selector);
    var input = fieldContainer.querySelector(selector + " input");
    var value = input.value;

    if (value.indexOf("@") > -1) {
      var errors = fieldContainer.querySelectorAll(".error-message");

      if (errors) {
        errors.forEach(function (error) {
          return (error.style.display = "none");
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
        var _error8 = fieldContainer.querySelector(".symbols");

        _error8.style.display = "block";
      }

      emailValidation = false;
      input.classList.remove("valid");
      input.classList.add("invalid");
    }
  };

  formButton.addEventListener("click", function (e) {
    handleTextInput(".firstName", "FirstName");
    handleTextInput(".lastName", "LastName");
    handleTextInput(".nick", "Nick");
    handleEmail(".e-mail", "Email");
    handleCheckbox("#agreement");
    handleExtraFields();
    e.preventDefault();

    if (
      textInputvalidation &&
      agreementValidation &&
      emailValidation &&
      numberValidation
    ) {
      axios({
        method: "post",
        data: formData,
        url: "http://localhost:55899/saveform"
      }).then(console.log("Validated"));
    }
  });
});