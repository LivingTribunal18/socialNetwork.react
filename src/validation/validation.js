export function validationFile(type) {
  let valid = false;

  if (type === "image/jpg" || type === "image/jpeg" || type === "image/png") {
    valid = true;
    return valid;
  } else {
    return valid;
  }
}
