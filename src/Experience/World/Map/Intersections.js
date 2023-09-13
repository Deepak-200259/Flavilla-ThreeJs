import Experience from "../../Experience";
import Popup from "../Popup/Popup";
import { gsap } from "gsap";
export default class Intersections {
  constructor(data) {
    this.experience = new Experience();
    this.dataArray = data;
    this.shipTooltip = document.getElementById("shipToolTip");
    this.setUtils();
    this.setEvents();
  }

  setUtils() {
    this.raycaster = this.experience.raycaster;
    this.mouse = this.experience.mouse;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.id = 0;
    document.body.style.cursor = "grab";
    this.isDragging = false;
    this.duration = null;
    this.isCountryIntersected = [];
    this.isCharacterIntersected = [];
  }
  /**
   * Callback Function which updates id
   * @param {*} id id of the country selected
   */

  updateId = (id) => {
    this.id = id;
  };

  /**
   * Sets Click Events for Positioning the Character
   */

  setEvents() {
    //For Windows
    this.canvas.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        document.body.style.cursor = "grabbing";
        this.isDragging = true;
        this.checkIntersections(e);
      }
    });
    this.canvas.addEventListener("mouseup", () => {
      document.body.style.cursor = "grab";
      this.isDragging = false;
    });
    this.canvas.addEventListener("mousemove", (e) => {
      this.mousemove(e);
      this.touchmove = true;
    });

    //For Mobile Phones
    this.canvas.addEventListener("touchend", (e) => {
      this.checkIntersections(e);
    });
  }

  /**
   * Setting the mouse position from center of the screen
   * @param {*} event mouse event
   */

  mousemove = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.checkIntersections(event);
  };

  /**
   * Checks with which character or country has been the intersection done
   */

  checkIntersections(eventType) {
    this.newcharacter = this.character;
    if (
      (this.isCharacterIntersected.length > 0 &&
        eventType.type == "mousedown") ||
      eventType.type == "touchend"
    ) {
      this.checkIntersectedCountries(this.isCharacterIntersected);
      return;
    } else if (
      this.isCharacterIntersected.length > 0 &&
      eventType.type == "mousemove"
    ) {
      this.checkIntersectedCountriesHover(
        this.isCharacterIntersected,
        eventType
      );
      return;
    } else {
      this.clearPopup();
    }
    if (
      this.touchmove ||
      this.isCountryIntersected.length === 0 ||
      this.id === null
    ) {
      this.clearPopup();
      return;
    }
    if (eventType.type == "mousedown" || eventType.type == "touchend") {
      this.checkIntersectedCountries(this.isCharacterIntersected);
      return;
    } else if (eventType.type == "mousemove") {
      this.checkIntersectedCountriesHover(
        this.isCharacterIntersected,
        eventType
      );
      return;
    }
  }

  checkIntersectedCountries(intersectedList) {
    for (const intersected of intersectedList) {
      const countryName =
        intersected.object.userData.countryName || intersected.object.name;
      const countryIndex = this.dataArray.findIndex(
        (country) => country.countryName === countryName
      );
      if (countryIndex !== -1) {
        this.updateId(countryIndex);
        this.cameraAnimation(this.newcharacter);
        return;
      }
    }
  }
  setPopup(event) {
    this.isToolTipVisible = true;
    this.shipTooltip.style.display = "block";
    this.shipTooltip.style.position = "absolute";
    this.shipTooltip.style.left = event.clientX + 10 + "px";
    this.shipTooltip.style.top = event.clientY + 10 + "px";
  }
  clearPopup() {
    this.isToolTipVisible = false;

    this.shipTooltip.style.display = "none";
    this.shipTooltip.style.position = "relative";
  }

  checkIntersectedCountriesHover(intersectedList, event) {
    for (const intersected of intersectedList) {
      const countryName =
        intersected.object.userData.countryName || intersected.object.name;
      const countryIndex = this.dataArray.findIndex(
        (country) => country.countryName === countryName
      );

      if (countryIndex != -1) {
        this.shipTooltip.innerHTML = countryName;
        if (!this.isToolTipVisible) {
          this.setPopup(event);
          return;
        }
      }
    }
  }

  /**
   * Camera Animation when country is selected
   */

  cameraAnimation(character, newData) {
    if (
      this.camera.controls.target.x === this.dataArray[this.id].x &&
      this.camera.controls.target.y === this.dataArray[this.id].y &&
      this.camera.controls.target.z === this.dataArray[this.id].z
    ) {
      this.duration = 0.001;
    }
    gsap
      .to(this.camera.instance.position, {
        duration: this.duration,
        onStart: () => {
          this.camera.controls.enabled = false;
        },
        x: this.dataArray[this.id].x,
        y: this.dataArray[this.id].y + 4,
        z: this.dataArray[this.id].z + 4,
      })
      .then(() => {
        if (!this.camera.controls.enabled) {
          this.camera.controls.enabled = true;
          this.camera.controls.target.set(
            this.dataArray[this.id].x,
            this.dataArray[this.id].y,
            this.dataArray[this.id].z
          );
          this.popup = new Popup(this.id, this.dataArray, character, (id) =>
            this.updateId(id)
          );
        }
      });
  }

  /**
   * Update function rendered on every next frame
   */

  update() {
    this.touchmove = false;
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    this.isCharacterIntersected = this.raycaster.intersectObjects(
      this.experience.characterIntersections
    );
    this.isCountryIntersected = this.raycaster.intersectObjects(
      this.experience.countryIntersections
    );
    if (this.camera.controls.enabled)
      this.duration = this.camera.controls.getDistance() > 12 ? 2 : 1;
    if (!this.camera.controls.enabled && this.dataArray[this.id]) {
      const { x, y, z } = this.dataArray[this.id];
      this.camera.instance.lookAt(x, y, z);
    }
  }
}
