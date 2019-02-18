document.addEventListener("DOMContentLoaded", () => {
    const formButton = document.querySelector("#nowa-tradycja-form-main .form-button");
    const addFileButton = document.querySelector("#nowa-tradycja-form-main .add-file-button");
    const addImageButton = document.querySelector("#nowa-tradycja-form-main .add-image-button");

    //initate validation flags

    let textValidation, agreementValidation, emailValidation, numberValidation, audioValidation, imageValidation;

    //dynamically add image containers & images

    addImageButton.addEventListener("click", event => {
        let counter = document.querySelectorAll(`#nowa-tradycja-form-main .nowa-tradycja-form_images input[type="file"]`).length;

        const deleteButton = document.createElement("button");
        const minus = document.createElement("i");
        const sentImageTitle = document.createElement("p");
        const mainContainer = document.querySelector(".nowa-tradycja-form_images");
        const newInput = document.createElement("input");
        const newLabel = document.createElement("label");
        const imagesContainer = document.createElement("div");
        const imageFieldContainer = document.createElement("div");
        imageFieldContainer.classList.add("image-fields-container");
        minus.classList.add("fas");
        minus.classList.add("fa-minus");
        deleteButton.classList.add("remove-image-button");
        deleteButton.appendChild(minus);
        deleteButton.addEventListener("click", function () {
            this.parentNode.remove();
        });
        sentImageTitle.classList.add(`sent-image-title${counter}`);
        newLabel.classList.add("file-field");
        newLabel.innerHTML = "Przeglądaj";
        imagesContainer.classList.add("file-container");
        imagesContainer.classList.add("image");
        newInput.setAttribute("id", `image${counter}`);
        newInput.setAttribute("type", "file");
        newInput.setAttribute("accept", "image/*");
        newLabel.setAttribute("for", `image${counter}`);
        newInput.addEventListener("change", () => {
            if (newInput.files.length > 0) {
                sentImageTitle.innerHTML = newInput.files[0].name;
            }
        });

        imagesContainer.appendChild(newInput);
        imagesContainer.appendChild(newLabel);
        imagesContainer.appendChild(sentImageTitle);
        imageFieldContainer.append(imagesContainer);
        imageFieldContainer.append(deleteButton);
        mainContainer.appendChild(imageFieldContainer);

        event.preventDefault();
    });

    //dynamically add audio containers & audio

    addFileButton.addEventListener("click", event => {
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

        addTextField(`title${counter}`, `title${counter}`, "Tytuł");
        addTextField(`artist${counter}`, `artist${counter}`, "Autor");
        addTextField(`author${counter}`, `author${counter}`, "Wykonawca");


        const audioFileContainer = document.createElement("div");
        const newFileInput = document.createElement("input");
        const newFileLabel = document.createElement("label");
        const sentFileTitle = document.createElement("p");
        audioFileContainer.classList.add("file-container");
        audioFileContainer.classList.add("audio");
        sentFileTitle.classList.add(`sent-file-title${counter}`);
        newFileLabel.innerHTML = "Przeglądaj";
        newFileInput.setAttribute("type", "file");
        newFileInput.setAttribute("accept", "audio/*");
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

        event.preventDefault();

    });

    //clear form on correct submit

    const clearForm = () => {
        const inputsToClear = document.querySelectorAll(".nowa-tradycja-form_field input");
        const filesToClear = document.querySelectorAll("[type='file']");

        if (inputsToClear) {
            inputsToClear.forEach(el => {
                el.value = null;
                el.classList.remove("valid");
            });
        }

        if (filesToClear) {
            filesToClear.forEach(file => {
                file.value = null;
            });
        }
    };

    // remove file containers on correct submit

    const removeFilesContainers = () => {
        const audioFileContainers = document.querySelectorAll("#nowa-tradycja-form-main .fields-container");
        const imageFileContainers = document.querySelectorAll("#nowa-tradycja-form-main .image-fields-container");
        audioFileContainers.forEach(conatiner => conatiner.remove());
        imageFileContainers.forEach(container => container.remove());
    };

    //on submit do following

    formButton.addEventListener("click", event => {

        //create new FormData object

        const formData = new FormData();

        //validate and append inputs type text

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

        //validate and append inputs type checkbox

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

        //validate and append inputs from extraFieldsJson

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

            // validate extra text inputs

            const handleExtraTextInput = (selector, key) => {

                const fieldContainer = document.querySelector(selector);
                const input = fieldContainer.querySelector(`${selector} input`);
                const value = input.value;

                if (!value.length || value.length < 3 || value.length > 50) {
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

            // validate extra number inputs

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

            // validate zip code

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
                    } else if (value.length && value[2].indexOf("-")) {
                        const error = fieldContainer.querySelector(".letters");
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

        // validate and append email

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

        // validate and append audio & image files

        const files = document.querySelectorAll("[type='file']");
        const audioFiles = document.querySelectorAll(".audio [type='file']");
        const imageFiles = document.querySelectorAll(".image [type='file']");

        audioValidation = imageValidation = false;

        files.forEach((input, index) => {

            console.log(input.files.length, input, imageFiles.files);

            if (audioFiles.length > 0) {
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .title${index}`, `SongTitle${index}`);
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .author${index}`, `SongAuthor${index}`);
                handleTextInput(`#nowa-tradycja-form-main .nowa-tradycja-form_files .artist${index}`, `SongArtist${index}`);
            }
            // if (input.files.length === 0) {
            //     const error = document.querySelector(".nowa-tradycja-form_files .empty");
            //     error.style.display = "block";
            // }

            if (audioFiles.length > 5) {
                const error = document.querySelector(".nowa-tradycja-form_files .long");
                error.style.display = "block";
            } else if (audioFiles.length > 0 && audioFiles.length < 3) {
                const error = document.querySelector(".nowa-tradycja-form_files .short");
                error.style.display = "block";
            } else if (audioFiles.length > 2 && audioFiles.length < 6 && input.files[0].size > 0) {
                const errors = document.querySelectorAll(".nowa-tradycja-form_files .error-message");
                errors.forEach(error => {
                    error.style.display = "none";
                });
                formData.append(`audio-file${index}`, input.files[0]);
                audioValidation = true;
            }

            if (input.parentNode.classList.contains("image") && input.files.length > 0 && input.files[0].size > 0) {
                formData.append(`image-file${index}`, input.files[0]);
                imageValidation = true;
            }

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

        event.preventDefault();

        console.log(textValidation, agreementValidation, emailValidation, numberValidation, audioValidation, imageValidation);

        if (textValidation && agreementValidation && emailValidation && numberValidation && imageValidation && audioValidation) {

            console.log(textValidation, agreementValidation, emailValidation, numberValidation, audioValidation, imageValidation);
            axios({
                    method: "post",
                    data: formData,
                    url: "//localhost:55899/saveform"
                })
                // .then(removeFilesContainers(), console.log("Validated"))
                .then(res => console.log(
                    res
                ))
                .catch(err => console.log(err))
        }
    });

});