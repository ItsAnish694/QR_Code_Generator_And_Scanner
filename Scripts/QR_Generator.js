generate.addEventListener("click", () => {
  if (generate.innerHTML == "Generate") {
    generate_qr_code();
  } else if (generate.innerHTML == "Generating...") {
    return;
  } else {
    closeGenerator();
  }
});

function closeGenerator() {
  count = false;
  qr_code_generator.classList.remove("active");
  get_data.value = "";
  generate.innerHTML = "Generate";
  download.classList.remove("active");
}

get_data.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    generate.click();
  }
});

function generate_qr_code() {
  let the_input_value = get_data.value;
  the_input_value = the_input_value.trim();
  if (!the_input_value || the_input_value == "") {
    return;
  }

  generate.innerHTML = "Generating...";
  qr_code_generator.classList.add("pointerEvents");

  fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${the_input_value}`
  )
    .then((res) => res.blob())
    .then((url) => {
      url = URL.createObjectURL(url);
      image_data.src = url;
      download.classList.add("active");

      if (updateDownload) {
        download.removeEventListener("click", updateDownload);
      }

      updateDownload = () => {
        let aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = "QR Code";
        qr_code_generator.append(aTag);
        aTag.click();
        aTag.remove();
      };
      download.addEventListener("click", updateDownload);
    })
    .catch(() => {
      generate.innerHTML = "Network Error";
      get_data.value = "";
    });
  qr_code_generator.classList.remove("pointerEvents");
  if (imageLoad) {
    image_data.removeEventListener("load", imageLoad);
  }

  imageLoad = () => {
    generate.innerHTML = "Close";
    qr_code_generator.classList.add("active");
  };
  image_data.addEventListener("load", imageLoad);

  count = true;

  if (changeGenerate) {
    get_data.removeEventListener("keyup", changeGenerate);
  }

  changeGenerate = () => {
    let curr_input_value = get_data.value;
    curr_input_value = curr_input_value.trim();
    if (
      (curr_input_value == "" || curr_input_value == the_input_value) &&
      count
    ) {
      generate.innerHTML = "Close";
    } else {
      generate.innerHTML = "Generate";
    }
  };
  get_data.addEventListener("keyup", changeGenerate);
}
