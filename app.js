document.addEventListener("DOMContentLoaded", () => {
    const formButton = document.querySelector("#nowa-tradycja-form-main .form-button");
    const addFileButton = document.querySelector("#nowa-tradycja-form-main .add-file-button");

    const formData = new FormData();
    let textValidation, agreementValidation, emailValidation, numberValidation, audioValidation;

    addFileButton.addEventListener("click", () => {
        const mainContainer = document.querySelector(".nowa-tradycja-form_files");

        let counter = document.querySelectorAll(`#nowa-tradycja-form-main .nowa-tradycja-form_files input[type="file"]`).length;

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
            errorLetters.innerHTML = "Nie możesz używać liczb";
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

        addTextField(`title${counter}`, `title${counter}`, "Title");
        addTextField(`artist${counter}`, `artist${counter}`, "Artysta");
        addTextField(`author${counter}`, `author${counter}`, "Autor");

        const fileContainer = document.createElement("div");
        const newFileInput = document.createElement("input");
        const newFileLabel = document.createElement("label");
        const sentFileTitle = document.createElement("p");
        fileContainer.classList.add("file-container");
        sentFileTitle.classList.add(`sent-file-title${counter}`);
        newFileLabel.innerHTML = "Przeglądaj";
        newFileInput.setAttribute("type", "file");
        newFileInput.setAttribute("id", `music-file${counter}`);
        newFileLabel.setAttribute("for", `music-file${counter}`);
        newFileLabel.classList.add("file-field");
        newFileInput.addEventListener("change", () => {
            if (newFileInput.files.length > 0) {
                sentFileTitle.innerHTML = newFileInput.files[0].name;
            };
        });
        fileContainer.append(newFileInput, newFileLabel, sentFileTitle)

        mainContainer.append(fileContainer);

    });

    const handleTextInput = (selector, key) => {

        const fieldContainers = document.querySelectorAll(selector);

        fieldContainers.forEach(container => {
            const input = container.querySelector(`${selector} input`);
            const value = input.value;

            if (!value.length || value.length < 3 || value.length > 50 || !isNaN(value)) {
                textValidation = false;
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

            } else {
                const errors = container.querySelectorAll(".error-message");
                errors.forEach(error => {
                    error.style.display = "none";
                });
                input.classList.remove("invalid");
                input.classList.add("valid");
                formData.append(key, value);
                textValidation = true;
            }
        });

    };

    const handleCheckbox = (selector) => {
        const checkedBoolean = document.querySelector(selector).checked;
        agreementValidation = checkedBoolean;

        if (agreementValidation) {
            const rulesJson = JSON.stringify({
                IsAcceptedGeneralRules: checkedBoolean
            });
            formData.append("rulesJson", rulesJson);
        }
    };

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
                textValidation = false;
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
            } else {
                const errors = fieldContainer.querySelectorAll(".error-message");
                errors.forEach(error => {
                    error.style.display = "none";
                });
                input.classList.remove("invalid");
                input.classList.add("valid");
                extraFields[key] = value;
                textValidation = true;
            }
        };

        const handleExtraNumbers = (selector, key) => {
            const fieldContainer = document.querySelector(selector);
            const input = fieldContainer.querySelector(`${selector} input`);
            const value = input.value;

            if (!value.length || isNaN(value)) {
                numberValidation = false;
                input.classList.remove("valid");
                input.classList.add("invalid");
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
                    error.style.display = "none";
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

            console.log(value[2])

            if (value.length && value.length === 6 && value[2].indexOf("-") > -1) {
                const errors = fieldContainer.querySelectorAll(".error-message");
                errors.forEach(error => {
                    error.style.display = "none";
                });
                input.classList.remove("invalid");
                input.classList.add("valid");
                extraFields[key] = value;
                numberValidation = true;
            } else {
                numberValidation = false;
                input.classList.remove("valid");
                input.classList.add("invalid");

                if (!value.length) {
                    const error = fieldContainer.querySelector(".empty");
                    error.style.display = "block";
                } else if (value.length && value.length < 4) {
                    const error = fieldContainer.querySelector(".short");
                    error.style.display = "block";
                } else if (value.length && value.length > 4) {
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

        if (numberValidation && textValidation) {
            const extraFieldsJson = JSON.stringify(extraFields);
            formData.append("ExtraFieldsJSON", extraFieldsJson);
        }

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
            emailValidation = false;
            if (!value.length) {
                const error = fieldContainer.querySelector(".empty");
                error.style.display = "block";
            } else if (value.length) {
                const error = fieldContainer.querySelector(".symbols");
                error.style.display = "block";
            }
            input.classList.remove("valid");
            input.classList.add("invalid");
        }
    };

    function clearForm() {
        var inputsToClear = document.querySelectorAll('.nowa-tradycja-form_field input');
        inputsToClear.forEach(function (el) {
            el.value = null;
            el.classList.remove('valid');
        });
    }

    formButton.addEventListener("click", e => {

        const files = document.querySelectorAll("[type='file']");
        files.forEach((input, index) => {

            const sentFileTitle = document.querySelector(`#nowa-tradycja-form-main .nowa-tradycja-form_files .sent-file-title${index}`);

            if (input) {
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .title${index}`, `SongTitle${index}`);
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .author${index}`, `SongAuthor${index}`);
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .artist${index}`, `SongArtist${index}`);
            }

            if (input.files.length > 0) {
                ;
                audioValidation = true;
                sentFileTitle.style.display = "block";
                sentFileTitle.innerHTML = input.files[0].name;
                formData.append(`audio-file${index}`, input.files[0]);
            };
        });


        handleTextInput(".firstName", "FirstName");
        handleTextInput(".lastName", "LastName");
        handleTextInput(".nick", "Nick");
        handleEmail(".e-mail", "Email");
        handleCheckbox("#agreement");
        handleExtraFields();

        for (let el of formData.entries()) {
            console.log(el);
        }
        if (textValidation && agreementValidation && emailValidation && numberValidation && audioValidation) {
            console.log(textValidation, agreementValidation, emailValidation, numberValidation, audioValidation)
            axios({
                method: "post",
                data: formData,
                url: "http://localhost:55899/saveform"
            }).then(clearForm(), console.log("Validated"))
        }

    });

});