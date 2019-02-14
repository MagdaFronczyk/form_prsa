document.addEventListener("DOMContentLoaded", () => {
    const formButton = document.querySelector("#nowa-tradycja-form-main .form-button");
    const addFileButton = document.querySelector("#nowa-tradycja-form-main .add-file-button");
    const addImageButton = document.querySelector("#nowa-tradycja-form-main .add-image-button");
    const formData = new FormData();
    let textValidation, agreementValidation, emailValidation, numberValidation, audioValidation;

    addImageButton.addEventListener("click", () => {
        let counter = document.querySelectorAll(`#nowa-tradycja-form-main .nowa-tradycja-form_images input[type="file"]`).length;

        const deleteButton = document.createElement("button");
        const minus = document.createElement("i");
        minus.classList.add("fas");
        minus.classList.add("fa-minus");
        deleteButton.classList.add("remove-image-button");
        deleteButton.appendChild(minus);
        deleteButton.addEventListener("click", function () {
            this.previousElementSibling.remove();
            this.remove();
        });
        const sentImageTitle = document.createElement("p");
        const mainContainer = document.querySelector(".nowa-tradycja-form_images");
        const newInput = document.createElement("input");
        const newLabel = document.createElement("label");
        const imagesContainer = document.createElement("div");
        sentImageTitle.classList.add(`sent-image-title${counter}`);
        newLabel.classList.add("file-field");
        newLabel.innerHTML = "Przeglądaj";
        imagesContainer.classList.add("file-container");
        imagesContainer.classList.add("image");
        newInput.setAttribute("id", `image${counter}`);
        newInput.setAttribute("type", "file");
        newLabel.setAttribute("for", `image${counter}`);
        newInput.addEventListener("change", () => {
            if (newInput.files.length > 0) {
                sentImageTitle.innerHTML = newInput.files[0].name;
            }
        });

        imagesContainer.appendChild(newInput);
        imagesContainer.appendChild(newLabel);
        imagesContainer.appendChild(sentImageTitle);
        mainContainer.appendChild(imagesContainer);
        mainContainer.appendChild(deleteButton);
    });

    addFileButton.addEventListener("click", () => {
        const mainContainer = document.querySelector(".nowa-tradycja-form_files");
        const fieldsContainer = document.createElement("div");
        fieldsContainer.classList.add("fields-container");
        const deleteButton = document.createElement("button");
        const minus = document.createElement("i");
        minus.classList.add("fas");
        minus.classList.add("fa-minus");
        deleteButton.classList.add("remove-file-button");
        deleteButton.appendChild(minus);
        deleteButton.addEventListener("click", function () {
            this.parentNode.remove();
        });

        let counter = document.querySelectorAll(`#nowa-tradycja-form-main .nowa-tradycja-form_files input[type="file"]`).length;

        const addTextField = (id, className, label) => {
            const newInput = document.createElement("input");
            const newLabel = document.createElement("label");
            const textInputContainer = document.createElement("div");
            const errorContainer = document.createElement("div");
            const errorEmpty = document.createElement("span");
            const errorShort = document.createElement("span");
            const errorLetters = document.createElement("span");

            textInputContainer.classList.add("nowa-tradycja-form_field");
            textInputContainer.classList.add("text-fields");
            textInputContainer.classList.add(className);
            errorLetters.classList.add("error-message");
            errorLetters.classList.add("letters");
            errorLetters.innerHTML = "Nie możesz używać liczb";
            errorShort.classList.add("error-message");
            errorShort.classList.add("short");
            errorShort.innerHTML = "Musi zwierać conajmniej 3 znaki";
            errorEmpty.innerHTML = "Pole obowiązkowe";
            errorContainer.classList.add("error-container");
            errorEmpty.classList.add("error-message");
            errorEmpty.classList.add("empty");
            errorContainer.appendChild(errorEmpty);
            errorContainer.appendChild(errorShort);
            errorContainer.appendChild(errorLetters);
            newLabel.setAttribute("for", id);
            newLabel.innerHTML = label;
            newInput.setAttribute("id", id);
            newInput.setAttribute("type", "text");
            textInputContainer.appendChild(newLabel);
            textInputContainer.appendChild(newInput);
            textInputContainer.appendChild(errorContainer);
            fieldsContainer.appendChild(textInputContainer);
        };

        addTextField(`title${counter}`, `title${counter}`, "Title");
        addTextField(`artist${counter}`, `artist${counter}`, "Artysta");
        addTextField(`author${counter}`, `author${counter}`, "Autor");


        const audioFileContainer = document.createElement("div");
        const newFileInput = document.createElement("input");
        const newFileLabel = document.createElement("label");
        const sentFileTitle = document.createElement("p");
        audioFileContainer.classList.add("file-container");
        audioFileContainer.classList.add("audio");
        sentFileTitle.classList.add(`sent-file-title${counter}`);
        newFileLabel.innerHTML = "Przeglądaj";
        newFileInput.setAttribute("type", "file");
        newFileInput.setAttribute("id", `music-file${counter}`);
        newFileLabel.setAttribute("for", `music-file${counter}`);
        newFileLabel.classList.add("file-field");
        newFileInput.addEventListener("change", () => {
            if (newFileInput.files.length > 0) {
                sentFileTitle.innerHTML = newFileInput.files[0].name;
            }
        });
        audioFileContainer.appendChild(newFileInput);
        audioFileContainer.appendChild(newFileLabel);
        audioFileContainer.appendChild(sentFileTitle);
        fieldsContainer.appendChild(audioFileContainer);
        fieldsContainer.appendChild(deleteButton);
        mainContainer.appendChild(fieldsContainer);

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

    const clearForm = () => {
        const inputsToClear = document.querySelectorAll(".nowa-tradycja-form_field input");
        const filesToClear = document.querySelectorAll("[type='file']");
        inputsToClear.forEach(el => {
            el.value = null;
            el.classList.remove("valid");
        });

        filesToClear.forEach(file => {
            file.value = null;
        });
    };

    const clearFormData = () => {
        for (let pair of formData.entries()) {
            formData.delete(pair[0]);
        }
        // for (let key of formData.keys()) {
        //     formData.delete(key);
        // }
    };

    const removeAllFilesContainers = () => {
        const fileContainer = document.querySelectorAll("#nowa-tradycja-form-main .fields-container");
        fileContainer.forEach(conatiner => conatiner.remove());
    };

    formButton.addEventListener("click", () => {
        audioValidation = false;
        const files = document.querySelectorAll("[type='file']");
        files.forEach((input, index) => {

            if (input.parentElement.classList.contains("audio") && input) {
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .title${index}`, `SongTitle${index}`);
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .author${index}`, `SongAuthor${index}`);
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .artist${index}`, `SongArtist${index}`);
            }

            if (input.parentElement.classList.contains("audio") && input.files.length > 0) {
                audioValidation = true;
                formData.append(`audio-file${index}`, input.files[0]);
            }

            if (input && input.parentElement.classList.contains("audio")) {
                audioValidation = true;
                formData.append(`image-file${index}`, input.files[0]);
            }
        });


        handleTextInput(".firstName", "FirstName");
        handleTextInput(".lastName", "LastName");
        handleTextInput(".nick", "Nick");
        handleEmail(".e-mail", "Email");
        handleCheckbox("#agreement");
        handleExtraFields();

        // for (let el of formData.entries()) {
        //     console.log(el);
        // }
        if (textValidation && agreementValidation && emailValidation && numberValidation && audioValidation) {
            console.log(textValidation, agreementValidation, emailValidation, numberValidation, audioValidation);
            axios({
                    method: "post",
                    data: formData,
                    url: "http://localhost:55899/saveform"
                })
                .then(clearForm(), clearFormData(), removeAllFilesContainers(), console.log("Validated"));
        }
    });

});