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

        const newMusicFileInput = document.createElement("input");
        const newMusicFileLabel = document.createElement("label");
        newMusicFileLabel.innerHTML = "Przeglądaj";
        newMusicFileInput.setAttribute("type", "file");
        newMusicFileInput.setAttribute("id", `music-file${counter}`);
        newMusicFileLabel.setAttribute("for", `music-file${counter}`);
        newMusicFileLabel.classList.add("file-field");

        mainContainer.append(newMusicFileLabel, newMusicFileInput);

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

    // const handleFiles = (selector, name) => {
    //     const file = document.querySelector(selector).value;
    //     formData.append(name, file);
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

            if (value.length && value.length === 5 && !isNaN(value)) {
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

    formButton.addEventListener("click", e => {

        const files = document.querySelectorAll("[type=\"file\"]");
        const songs = [];

        files.forEach((input, index) => {
            console.log(index);
            if (input) {
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .title${index}`, `SongTitle${index}`);
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .author${index}`, `SongAuthor${index}`);
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .artist${index}`, `SongArtist${index}`);
            }

            if (input.value) {
                songs.push(input.value)
                audioValidation = true
            };
        });

        formData.append("audio-files", songs);
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
        console.log(textValidation, agreementValidation, emailValidation, numberValidation, audioValidation);
        if (textValidation && agreementValidation && emailValidation && numberValidation && audioValidation) {
            console.log(formData);
            axios({
                method: "post",
                data: formData,
                url: "http://localhost:55899/saveform"
            }).then(console.log("Validated"));
        }
    });

});