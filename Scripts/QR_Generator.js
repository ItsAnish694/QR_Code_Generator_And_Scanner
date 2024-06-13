get_data.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    generate.click();
  }
});

generate.addEventListener("click", () => {
  if (generate.innerHTML == "Generate") {
    generate_qr_code();
  } else {
    count = false;
    qr_code_generator.classList.remove("active");
    get_data.value = "";
    generate.innerHTML = "Generate";
  }
});

function generate_qr_code() {
  const the_input_value = get_data.value;
  if (!the_input_value) {
    return;
  }
  image_data.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${the_input_value}`;
  generate.innerHTML = "Generating...";
  image_data.addEventListener("load", () => {
    generate.innerHTML = "Close";
    qr_code_generator.classList.add("active");
  });

  count = true;
  get_data.addEventListener("keyup", (e) => {
    console.log(e.key);

    if ((get_data.value == "" || get_data.value == the_input_value) && count) {
      generate.innerHTML = "Close";
    } else if (get_data.value != the_input_value) {
      generate.innerHTML = "Generate";
    }
  });
}
