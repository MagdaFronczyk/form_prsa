document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#form");
  const nowaTradycjaPostJSON = {};


  fetch("//api.myjson.com/bins/h1bd0")
    .then(response => response.json())
    .then(response => {
      const nowaTradycjaFields = response;

      // Object.keys(nowaTradycjaFields)
      //   .filter(key => typeof response[key] === 'string' && key !== "ExtraFieldsJson" && key !== "RulesJson" && response[key] !== "")
      //   .forEach(key => {
      //     const newInput = document.createElement("input");
      //     newInput.setAttribute("placeholder", key);
      //     form.appendChild(newInput);
      //     nowaTradycjaPostJSON[key] = property;
      //   })

      Object.keys(nowaTradycjaFields).forEach(key => {

        const property = nowaTradycjaFields[key];

        if (typeof property === 'string' && key !== "ExtraFieldsJson" && key !== "RulesJson" && property !== "") {
          const newInput = document.createElement("input");
          newInput.setAttribute("placeholder", key);
          form.appendChild(newInput);
          nowaTradycjaPostJSON[key] = property;
        } else if (property instanceof Array) {
          const newInput = document.createElement("input");
          newInput.setAttribute("placeholder", key);
          nowaTradycjaPostJSON[key] = property;
          nowaTradycjaFields[key].forEach((key, index, array) => {
            array.push(key)
          })
        } else if (key === "ExtraFieldsJson" && property !== "") {
          const nowaTradycjaExtraFields = JSON.parse(property);

          Object.keys(nowaTradycjaExtraFields).forEach(key => {
            const newInput = document.createElement("input");
            newInput.setAttribute("placeholder", key);
            form.appendChild(newInput);

          });

        } else if (key === "RulesJson" && property !== "") {
          const nowaTradycjaRules = JSON.parse(property);
          const newCheckBox = document.createElement("input");
          newCheckBox.setAttribute("type", "checkbox");
          form.appendChild(newCheckBox);
        }

      })

    })
  console.log(nowaTradycjaPostJSON)


});