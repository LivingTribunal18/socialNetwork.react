export function encodeImageFile(element) {
  let filePath = "";
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    filePath = reader.result;
    localStorage.setItem("filePath", filePath);
  };
  reader.readAsDataURL(file);
}
