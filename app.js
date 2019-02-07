document.addEventListener("DOMContentLoaded", () => {
  const formButton = document.querySelector(".button");

  const formData = new FormData();

  const handleInput = (selector, formDataKey) => {
    const value = document.querySelector(selector).value;
    formData.append(formDataKey, value);
  }

  const handleCheckbox = (selector) => {
    const checkedBoolean = document.querySelector(selector).checked;
    const rulesJson = JSON.stringify({
      IsAcceptedGeneralRules: checkedBoolean
    });
    console.log(rulesJson);
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

    const streetValue = document.querySelector("#street-name").value;
    extraFields.AddressStreet = streetValue;

    const cityValue = document.querySelector("#city-name").value;
    extraFields.AddressCity = cityValue;

    const zipCodeValue = document.querySelector("#zip-code").value;
    extraFields.AddressCity = zipCodeValue;

    const phoneValue = document.querySelector("#phone").value;
    extraFields.Phone = phoneValue;

    const faxValue = document.querySelector("#fax").value;
    extraFields.Fax = faxValue;

    const bandMembersCountValue = document.querySelector("#band-count").value;
    extraFields.BandMembersCount = bandMembersCountValue;

    const instrumentsValue = document.querySelector("#instruments").value;
    extraFields.UsedInstruments = instrumentsValue;

    const technicalNeedsValue = document.querySelector("#technical-needs").value;
    extraFields.TechnicalNeeds = technicalNeedsValue;

    const programValue = document.querySelector("#program");
    extraFields.ShortProgramDescribe = programValue;

    const biographyValue = document.querySelector("#biografia");
    extraFields.PerformerBiography = biographyValue;

    const extraFieldsJson = JSON.stringify(extraFields);

    formData.append("ExtraFieldsJson", extraFieldsJson);

    console.log(extraFields);
    console.log(extraFieldsJson);
  }

  formButton.addEventListener("click", e => {

    handleInput("#firstName", "FirstName");
    handleInput("#lastName", "LastName");
    handleInput("#nick", "Nick");
    handleInput("#e-mail", "Email");
    handleCheckbox("#agreement");
    // handleFiles("#music-file", "audio-file");
    // handleFiles("#image-file", "image-file");
    // handleFiles("#document-file", "documents");
    handleExtraFields();

    for (let el of formData.entries()) {
      console.log(el);
    }
    e.preventDefault();

    axios({
      method: 'post',
      data: formData,
      url: 'http://localhost:55899/saveform'
    }).then(console.log("hhhh"));

  });


});