import * as dat from "lil-gui";

export default class Debug {
  constructor() {
    this.checkForGUI();
  }
  checkForGUI() {
    this.active = window.location.hash === "#debug";
    if (this.active) this.ui = new dat.GUI();
  }
}
