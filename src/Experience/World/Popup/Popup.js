import Experience from "../../Experience";
import { JsonData } from "../Map/Data";
export default class Popup {
  constructor(id, data, character, updateId) {
    this.experience = new Experience();
    this.id = id;
    this.json = data;
    this.character = character;
    this.popup = false;
    this.setUtils();
    this.getData(this.id, updateId);
  }

  /**
   * Sets the utilities required for popup
   */

  setUtils() {
    this.camera = this.experience.camera;
    this.cameraControls = this.camera.controls;
    this.personImages = this.experience.images.personImages;
    this.flagImages = this.experience.images.flagImages;
  }

  /**
   * get Data of Elements
    @param {} id Required for fetching data on basis of id from array
   */

  getData(id, updateId) {
    this.countriesArray = [];
    this.newID = this.json[this.id].id;
    this.jsonData = JsonData;
    this.imagesData = this.experience.images.personImages;
    this.imagesArray = [];
    this.flagImagesData = this.experience.images.flagImages;
    this.flagImagesArray = [];
    for (const innerArray of this.jsonData) {
      const foundItem = innerArray.find((item) => item.id === this.newID);
      if (foundItem) {
        const index = this.jsonData.indexOf(innerArray);
        this.countriesArray = this.jsonData[index];
        this.imagesArray = this.imagesData[index];
        this.flagImagesArray = this.flagImagesData[index];
        break;
      }
    }

    this.body = document.body;
    this.canvas = document.getElementsByClassName("webgl");
    this.heading = this.json[id].popUpHeading;
    this.content = this.json[id].textContent;
    this.flag = this.json[id].flag;
    this.year = this.json[id].year;
    // Create the div element
    this.arrowsDiv = document.createElement("div");

    // Set the CSS class for styling
    this.arrowsDiv.className = "arrow-buttons";

    // Create the left arrow button
    this.leftButton = document.createElement("button");
    this.leftButton.innerHTML = "&larr;";
    this.leftButton.style.fontSize = "30px";
    this.leftButton.className = "arrow-button left-arrow";

    // Create the right arrow button
    this.rightButton = document.createElement("button");
    this.rightButton.innerHTML = "&rarr;";
    this.rightButton.style.fontSize = "30px";
    this.rightButton.className = "arrow-button right-arrow";
    // Append the buttons to the div
    this.arrowsDiv.appendChild(this.leftButton);
    this.arrowsDiv.appendChild(this.rightButton);

    // Append the div to the body of the HTML document
    document.body.appendChild(this.arrowsDiv);
    this.createPopup(this.flag);
    this.setEvents();
  }

  setEvents() {
    this.leftButton.addEventListener("click", () => {
      this.popup = false;
      document.body.removeChild(this.popupContainer);
      document.body.removeChild(this.arrowsDiv);
      if (this.id > 0) {
        this.getData(--this.id);
        this.updateCamera();
      } else this.arrowsDiv.removeChild(this.leftButton);
    });
    this.rightButton.addEventListener("click", () => {
      this.popup = false;
      document.body.removeChild(this.popupContainer);
      document.body.removeChild(this.arrowsDiv);
      if (this.id < this.json.length - 1) {
        this.getData(++this.id);
        this.updateCamera();
      } else this.arrowsDiv.removeChild(this.rightButton);
    });
    this.resetButton.addEventListener("click", (event) => {
      this.camera.resetCamera();
      this.popupContainer.classList.add("hide");
      document.body.style.cursor = "grab";
      event.stopPropagation(); // For Preventing Touches to be on Map
      document.body.removeChild(this.arrowsDiv);
      document.body.removeChild(this.popupContainer);
      this.popup = false;
    });
  }

  /**
   * Creates a Popup Containing information about the country
    @param {} imageSrc Source of Image
    @param {} name Name of the Person in image
    @param {} information Information or content about the person or country
    @param {} flag Name of Country flag
    @param {} flagImage Source of Country Flag Image
    @param {} yearValue Years person lived.
    @param {} updateId callback function that updates the ID
   */

  createPopup(flag) {
    // Create the popup content

    if (!this.popup) {
      this.popup = true;
      this.popupContainer = document.createElement("div");
      this.popupContainer.className = "popup-container";

      this.popupBody = document.createElement("div");
      this.popupBody.className = "popup-body";

      this.popupContent = document.createElement("div");
      this.popupContent.className = "popup-content";

      this.popupBody.appendChild(this.popupContent);
      this.popupContainer.appendChild(this.popupBody);

      const flagDiv = document.createElement("div");
      flagDiv.className = "countryDiv";

      const flagImg = this.flagImagesArray[0];
      flagImg.className = "countryFlag";
      flagImg.id = "countryFlag";
      flagImg.alt = flag + " Flag";
      flagDiv.appendChild(flagImg);

      const countryName = document.createElement("h3");
      countryName.className = "flag";
      countryName.textContent = flag;
      flagDiv.appendChild(countryName);

      this.popupContent.appendChild(flagDiv);

      for (let i = 0; i < this.countriesArray.length; i++) {
        const dataDiv = document.createElement("div");
        dataDiv.className = "dataDiv";
        dataDiv.style.width = "100%";
        const personImageDiv = document.createElement("div");
        personImageDiv.className = "personImageDiv";
        personImageDiv.style.width = "100%";

        const personImage = this.imagesArray[i];
        personImage.className = "personImage";
        personImage.id = "image";
        personImageDiv.appendChild(personImage);

        const personName = document.createElement("h2");
        personName.className = "heading";
        personName.textContent = this.countriesArray[i].popUpHeading;
        personImageDiv.appendChild(personName);

        const personAge = document.createElement("h4");
        personAge.className = "dates";
        personAge.textContent = this.countriesArray[i].year;
        personImageDiv.appendChild(personAge);

        dataDiv.appendChild(personImageDiv);

        const infoDiv = document.createElement("div");
        infoDiv.className = "info";
        infoDiv.innerHTML = this.countriesArray[i].textContent;

        dataDiv.appendChild(infoDiv);
        this.popupContent.appendChild(dataDiv);
      }
      this.resetButton = document.createElement("button");
      this.resetButton.textContent = "Reset";
      this.resetButton.className = "reset";
      this.resetButton.style.position = "relative";
      this.popupBody.appendChild(this.resetButton);
      document.body.appendChild(this.popupContainer);

      //   Create the close button
      const closeButton = document.createElement("button");
      closeButton.className = "close-button";
      closeButton.innerHTML = "&times;";

      // Close the popup when the close button is clicked
      closeButton.addEventListener("click", (event) => {
        this.popupContainer.classList.add("hide");
        document.body.style.cursor = "grab";
        event.stopPropagation(); // For Preventing Touches to be on Map
        document.body.removeChild(this.arrowsDiv);
        document.body.removeChild(this.popupContainer);
        this.popup = false;
      });
      this.hideButtons();
      this.popupContent.appendChild(closeButton);
    }
  }

  /**
   * Updates the Camera and orbit controls target when Popup's Data is changed
   */

  updateCamera() {
    this.cameraControls.target.set(
      this.json[this.id].x,
      this.json[this.id].y,
      this.json[this.id].z
    );
    this.camera.instance.position.set(
      this.json[this.id].x,
      this.json[this.id].y + 4,
      this.json[this.id].z + 4
    );
  }

  /**
   * Hide the Left and Right Buttons
   */

  hideButtons() {
    if (this.id === 0) {
      this.leftButton.style.pointerEvents = "none";
      this.leftButton.style.opacity = 0;
      // Hide the left button
    } else if (this.id === this.json.length - 1) {
      this.rightButton.style.pointerEvents = "none";
      this.rightButton.style.opacity = 0;
      // Hide the right button
    } else {
      this.leftButton.style.pointerEvents = "auto"; // Show the left button
      this.leftButton.style.opacity = 1;
      this.rightButton.style.pointerEvents = "auto"; // Show the right button
      this.rightButton.style.opacity = 1;
    }
  }
}
