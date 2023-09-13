import Experience from "../../Experience";

export default class StartingScreen {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
  }
  showStartingPopup() {
    this.Popup = document.getElementById("start-popup");
    this.logo = document.getElementById("start-logo");
    this.logo.addEventListener("click", () => {
      window.open("https://theblackwomenintech.com/");
    });
    this.logo_UN_Women = document.getElementById("start-logo-UNWomen");
    this.logo_UN_Women.addEventListener("click", () => {
      window.open("https://bit.ly/unwomenSDGs");
    });
    this.Popup.style.display = "flex";
    this.Popup.style.position = "absolute";
    this.okButton = document.getElementById("hide-start-popup");
    this.registerEvent();
  }

  registerEvent() {
    this.okButton.addEventListener("click", () => this.onOKClick());
  }

  onOKClick() {
    this.Popup.style.display = "none";
    this.experience.world.map.addMapHud();
    document.body.style.cursor = "grab";
    document.body.removeChild(this.Popup);

    //Stopping to remove black women in tech logo
    // this.logo.style.display = "none";
    // document.body.removeChild(this.logo);
  }
}
