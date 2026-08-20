const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");

uploadButton.addEventListener("click", async () => {
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file");
    return;
  }

  const response = await fetch("/upload", {
    method: "POST",
    body: file,
  });

  const result = await response.text();

  console.log(result);
});
