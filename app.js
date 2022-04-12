document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

// Routing page
function changePage() {
  window.location.assign("./signup.html");
}
function changePagetoCandidae() {
  window.location.assign("./employeCards.html");
}
function changePageToJob() {
  window.location.assign("./employ.html");
}

// api integeration

fetch("https://www.superadmin.shop/api/v1/user")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.result);

    let names = document.getElementsByClassName("name");
    let description = document.getElementsByClassName("description");
    let job = document.getElementsByClassName("job");
    let img = document.getElementsByClassName("img");
    for (let i = 0; i < names.length; i++) {
      names[i].innerText = data.result[i].name;
      description[i].innerText = data.result[i].description;
      job[i].innerText = data.result[i].job;
      // img[i].src = data.result[i].img;
    }
  })
  .catch((err) => console.log(err));

//add candidate
const addCandidate = async () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let userName = document.getElementById("userName").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let image = document.getElementById("image").value;
  let resume = document.getElementById("resume").value;
  let password = document.getElementById("password").value;
  console.log(name, email, password, userName, phoneNumber, image, resume);

  let formData = {
    name,
    email,
    userName,
    phoneNumber,
    image,
    resume,
    password,
  };

  const res = await axios.post("https://www.superadmin.shop/api/v1/" + "user", {
    email: email,
    password: password,
    // phoneNumber: phoneNumber,
  });
  console.log(res);
  if (res.data.msg === "user added") {
    alert("User Signup Successfully !!!");
    window.location.assign("./employeCards.html");
  }
};
