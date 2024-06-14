input_area.addEventListener("click", () => {
  processing_text.innerHTML = "Click Here To Upload";
  input_file.click();
});

input_file.addEventListener("change", (e) => {
  qr_code_scanner.classList.remove("active");
  const file = e.target.files[0];
  if (!file) return;
  getResult(file);
});

closeScanner = () => {
  processing_text.innerHTML = "Click Here To Upload";
  text_area.innerHTML = "";
  output_area.classList.remove("active");
  qr_code_scanner.classList.remove("active");
  input_file.value = "";
};

async function getResult(file) {
  processing_text.innerHTML = "Scanning QR Code...";
  const formData = new FormData();
  formData.append("file", file);
  let result = await fetch("https://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  }).catch(() => {
    processing_text.innerHTML = "Can't Scan The QR Code";
  });
  result = await result.json();
  result = result[0].symbol[0].data;

  if (result == null) {
    processing_text.innerHTML = "Can't Scan The QR Code";
    return;
  }

  imageSRC.src = URL.createObjectURL(file);
  output_area.classList.add("active");
  qr_code_scanner.classList.add("active");
  text_area.innerHTML = result;

  if (closeScanner) {
    close_button.removeEventListener("click", closeScanner);
  }

  close_button.addEventListener("click", closeScanner);

  if (copyText) {
    copy_button.removeEventListener("click", copyText);
  }
  copyText = () => {
    navigator.clipboard.writeText(result);
  };
  copy_button.addEventListener("click", copyText);
}
