function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll(".img")];
  //target
  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.imageName = getElement(".image-name");
  this.modalImages = getElement(".modal-images");
  this.closeBtn = getElement(".close-btn");
  this.prevBtn = getElement(".prev-btn");
  this.nextBtn = getElement(".next-btn");
  // self referrence -  let self = this;
  //bind functions

  this.container.addEventListener(
    "click",
    function (e) {
      if (e.target.classList.contains("img")) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage, list) {
  this.setMainImage(selectedImage);
  this.modalImages.innerHTML = list
    .map((image) => {
      return `
    <img src="${image.src}" title="${image.title}" data-id="${
        image.dataset.id
      }" class="${
        selectedImage.dataset.id === image.dataset.id
          ? "modal-img selected"
          : "modal-img"
      }"/> `;
    })
    .join("");
  this.modal.classList.add("open");
  this.closeBtn.addEventListener("click", this.closeModal.bind(this));
  this.nextBtn.addEventListener("click", this.nextImage.bind(this));
  this.prevBtn.addEventListener("click", this.prevImage.bind(this));
  this.modalImages.addEventListener("click", this.chooseImage.bind(this));
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  this.closeBtn.removeEventListener("click", this.closeModal.bind(this));
  this.nextBtn.removeEventListener("click", this.nextImage.bind(this));
  this.prevBtn.removeEventListener("click", this.prevImage.bind(this));
  this.modalImages.removeEventListener("click", this.chooseImage.bind(this));
};

Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove("selected");
  next.classList.add("selected");
  this.setMainImage(next);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove("selected");
  prev.classList.add("selected");
  this.setMainImage(prev);
};

Gallery.prototype.chooseImage = function (e) {
  if (e.target.classList.contains("modal-img")) {
    const selected = this.modalImages.querySelector(".selected");
    selected.classList.remove("selected");
    e.target.classList.add("selected");
    this.setMainImage(e.target);
  }
};

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
