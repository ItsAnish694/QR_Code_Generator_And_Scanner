const goto_generator_button = document.querySelector(".goto-generator"),
  goto_scanner_button = document.querySelector(".goto-scanner");

const qr_code_generator = document.querySelector(".qr-code-generator");
const get_data = document.querySelector(".generator-input-buttons input");
const image_data = document.querySelector(".generator-img img");
const generate = document.querySelector("#generate");
let count = false;

const input_area = document.querySelector(".inputs"),
  input_file = document.querySelector(".inputs input"),
  processing_text = document.querySelector(".inputs p"),
  qr_code_scanner = document.querySelector(".qr-code-scanner"),
  output_area = document.querySelector(".scanner-output-button"),
  close_button = document.querySelector("#close"),
  copy_button = document.querySelector("#copy"),
  text_area = document.querySelector(".output textarea"),
  imageSRC = document.querySelector(".inputs img");

goto_scanner_button.addEventListener("click", () => {
  qr_code_generator.classList.add("disabled");
  qr_code_scanner.classList.remove("disabled");
});

goto_generator_button.addEventListener("click", () => {
  qr_code_generator.classList.remove("disabled");
  qr_code_scanner.classList.add("disabled");
});
