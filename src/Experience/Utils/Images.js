import Experience from "../Experience";

export default class Images {
  constructor() {
    this.experience = new Experience();
    this.flagImages = this.addFlagImages();
    this.personImages = this.addPersonImages();
  }

  /**
   * Loads images based on provided image files
   * @param {Array} imageFiles - Array of image paths
   * @returns Promise that resolves to an array of loaded images
   */
  loadImages(imageFiles) {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    const loadedImages = [];
    for (let image of imageFiles) {
      const loadedImageArray = [];
      Promise.all(image.map(loadImage)).then((images) => {
        // All images have been loaded successfully
        loadedImageArray.push(...images);
        // Proceed with your game or other tasks that require the images
      });
      loadedImages.push(loadedImageArray);
    }
    return loadedImages;
  }

  /**
   * Loads all the Flag Images
   * @returns Array of Images of Flags
   */
  addFlagImages() {
    const imageFiles = [
      ["images/flags/Flag_of_Angola.png", "images/flags/Flag_of_Angola.png"],
      ["images/flags/Flag-Benin.png"],
      ["images/flags/Flag-Cameroon.png"],
      ["images/flags/Flag-Central-African-Republic.png"],
      ["images/flags/Flag-Chad.png"],
      ["images/flags/Flag-Comoros.png"],
      ["images/flags/Flag-Democratic-Republic-of-the-Congo.png"],
      [
        "images/flags/Flag_of_Egypt.png",
        "images/flags/Flag_of_Egypt.png",
        "images/flags/Flag_of_Egypt.png",
        "images/flags/Flag_of_Egypt.png",
        "images/flags/Flag_of_Egypt.png",
      ],
      ["images/flags/Flag_of_Eswatini.png"],
      ["images/flags/Flag-Ethiopia.png", "images/flags/Flag-Ethiopia.png"],
      [
        "images/flags/Flag-Ghana.png",
        "images/flags/Flag-Ghana.png",
        "images/flags/Flag-Ghana.png",
        "images/flags/Flag-Ghana.png",
      ],
      [
        "images/flags/Flag-Kenya.png",
        "images/flags/Flag-Kenya.png",
        "images/flags/Flag-Kenya.png",
      ],
      [
        "images/flags/Flag-Madagascar.png",
        "images/flags/Flag-Madagascar.png",
        "images/flags/Flag-Madagascar.png",
      ],
      ["images/flags/Flag-Malawi.png"],
      ["images/flags/Flag-Mozambique.png"],
      ["images/flags/Flag-Namibia.png"],
      [
        "images/flags/Flag-Nigeria.png",
        "images/flags/Flag-Nigeria.png",
        "images/flags/Flag-Nigeria.png",
        "images/flags/Flag-Nigeria.png",
        "images/flags/Flag-Nigeria.png",
      ],
      ["images/flags/Flag-Sierra-Leone.png"],
      [
        "images/flags/Flag-South-Africa.png",
        "images/flags/Flag-South-Africa.png",
        "images/flags/Flag-South-Africa.png",
      ],
      ["images/flags/Flag-Sudan.png"],
      ["images/flags/Flag-Zambia.png"],
      ["images/flags/Flag_of_Zimbabwe.png"],
      [
        "images/flags/Flag_of_the_United_States.png",
        "images/flags/Flag_of_the_United_States.png",
        "images/flags/Flag_of_the_United_States.png",
        "images/flags/Flag_of_the_United_States.png",
        "images/flags/Flag_of_the_United_States.png",
      ],
      ["images/flags/canada-flag.png", "images/flags/canada-flag.png"],
      [
        "images/flags/Flag_of_Brazil.png",
        "images/flags/Flag_of_Brazil.png",
        "images/flags/Flag_of_Brazil.png",
      ],
      ["images/flags/Flag_of_Colombia.png"],
      ["images/flags/Flag-Peru.png"],
      ["images/flags/Flag-Uruguay.png"],
      ["images/flags/Flag-Venezuela.png"],
      [
        "images/flags/Flag-England.png",
        "images/flags/Flag-England.png",
        "images/flags/Flag-England.png",
        "images/flags/Flag-England.png",
      ],
      ["images/flags/Flag_of_France.png"],
      ["images/flags/Flag-Norway.png"],
      ["images/flags/Flag-Switzerland.png"],
      ["images/flags/Flag-Antigua-and-Barbuda.png"],
      ["images/flags/Flag-of-The-Bahamas.png"],
      ["images/flags/Flag-Barbados.png"],
      ["images/flags/Flag-Cuba.png"],
      ["images/flags/Flag-Dominica.png"],
      ["images/flags/Flag_of_Grenada.png"],
      ["images/flags/Flag_of_Guadeloupe_(local)_variant.png"],
      [
        "images/flags/Flag_of_Haiti.png",
        "images/flags/Flag_of_Haiti.png",
        "images/flags/Flag_of_Haiti.png",
        "images/flags/Flag_of_Haiti.png",
      ],
      [
        "images/flags/Flag-Jamaica.png",
        "images/flags/Flag-Jamaica.png",
        "images/flags/Flag-Jamaica.png",
        "images/flags/Flag-Jamaica.png",
      ],
      ["images/flags/Flag-Trinidad-and-Tobago.png"],
      ["images/flags/Flag_of_Lebanon.png"],
      ["images/flags/Flag-Saudi-Arabia.png"],
    ];
    return this.loadImages(imageFiles);
  }

  /**
   * Loads all the persons Images
   * @returns Array of Images of persons
   */
  addPersonImages() {
    const imageFiles = [
      ["images/persons/1.png", "images/persons/2.png"],
      ["images/persons/3.png"],
      ["images/persons/4.png"],
      ["images/persons/6.png"],
      ["images/persons/7.png"],
      ["images/persons/8.png"],
      ["images/persons/9.png"],
      [
        "images/persons/10.png",
        "images/persons/11.png",
        "images/persons/12.png",
        "images/persons/88.png",
        "images/persons/13.png",
      ],
      ["images/persons/14.png"],
      ["images/persons/16.png", "images/persons/17.png"],
      [
        "images/persons/18.png",
        "images/persons/19.png",
        "images/persons/20.png",
        "images/persons/21.png",
      ],
      [
        "images/persons/22.png",
        "images/persons/23.png",
        "images/persons/24.png",
      ],
      [
        "images/persons/25.png",
        "images/persons/26.png",
        "images/persons/27.png",
      ],
      ["images/persons/28.png"],
      ["images/persons/30.png"],
      ["images/persons/31.png"],
      [
        "images/persons/32.png",
        "images/persons/33.png",
        "images/persons/34.png",
        "images/persons/35.png",
        "images/persons/36.png",
      ],
      ["images/persons/37.png"],
      [
        "images/persons/38.png",
        "images/persons/39.png",
        "images/persons/40.png",
      ],
      ["images/persons/41.png"],
      ["images/persons/42.png"],
      ["images/persons/43.png"],
      [
        "images/persons/44.png",
        "images/persons/45.png",
        "images/persons/46.png",
        "images/persons/47.png",
        "images/persons/48.png",
      ],
      ["images/persons/49.png", "images/persons/50.png"],
      [
        "images/persons/52.png",
        "images/persons/54.png",
        "images/persons/72.png",
      ],
      ["images/persons/55.png"],
      ["images/persons/56.png"],
      ["images/persons/57.png"],
      ["images/persons/58.png"],
      [
        "images/persons/59.png",
        "images/persons/60.png",
        "images/persons/61.png",
        "images/persons/62.png",
      ],
      ["images/persons/63.png"],
      ["images/persons/65.png"],
      ["images/persons/66.png"],
      ["images/persons/68.png"],
      ["images/persons/69.png"],
      ["images/persons/70.png"],
      ["images/persons/71.png"],
      ["images/persons/73.png"],
      ["images/persons/74.png"],
      ["images/persons/75.png"],
      [
        "images/persons/76.png",
        "images/persons/77.png",
        "images/persons/78.png",
        "images/persons/79.png",
      ],
      [
        "images/persons/80.png",
        "images/persons/81.png",
        "images/persons/82.png",
        "images/persons/83.png",
      ],
      ["images/persons/84.png"],
      ["images/persons/86.png"],
      ["images/persons/87.png"],
    ];
    return this.loadImages(imageFiles);
  }
}
