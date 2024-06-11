const generator = document.querySelector(".qr-generator-btn"),
  scanner = document.querySelector(".qr-scanner-btn"),
  generatorSrc = "Scripts/QR_Generator.js",
  generatorId = "qr-generator",
  scannerSrc = "Scripts/QR_Scanner.js",
  scannerId = "qr-scanner";

generator.addEventListener("click", () => {
  removeElement();
  document.body.classList.add("Generator");
  const elementObj = createElements(generatorSrc, generatorId);
  document.head.appendChild(elementObj);
});

scanner.addEventListener("click", () => {
  removeElement();
  document.body.classList.add("Scanner");
  const elementObj = createElements(scannerSrc, scannerId);
  document.head.appendChild(elementObj);
});

function createElements(src, id) {
  const newScr = document.createElement("script");
  newScr.src = src;
  newScr.id = id;
  newScr.setAttribute("defer", "");
  return newScr;
}

function removeElement() {
  const generator = document.getElementById(generatorId),
    scanner = document.getElementById(scannerId);
  if (generator == null && scanner == null) {
    return;
  } else if (generator == null) {
    document.head.removeChild(scanner);
    document.body.classList.remove("Scanner");
    return;
  }
  document.head.removeChild(generator);
  document.body.classList.remove("Generator");
  return;
}
