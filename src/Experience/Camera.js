import { PerspectiveCamera } from "three";
import Experience from "./Experience.js";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import { gsap } from "gsap";
export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.setInstance();
    this.setControls();
  }

  /**
   * Sets the instance of the camera to use this instance wherever needed.
   */

  setInstance() {
    this.instance = new PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(-8, 16, 14);
    this.scene.add(this.instance);
  }

  /**
   * Initial Camera Aniamtion
   */

  cameraAnimation() {
    return new Promise((res, rej) => {
      gsap.to(this.instance.position, {
        duration: 2,
        x: 0,
        y: 17.5,
        z: 13,
        onComplete: () => {
          this.setOrbitControlProperties();
          res();
        },
      });
    });
  }
  /**
   * Reset Camera
   */
  resetCamera() {
    this.instance.position.set(0, 17.5, 13);
    this.controls.target.set(0, 0, 0);
  }
  /**
   * Sets the orbit Controls
   */

  setControls() {
    this.controls = new MapControls(this.instance, this.canvas);
  }

  /**
   * Sets the properties of orbit Controls
   */

  setOrbitControlProperties() {
    //Damping
    this.controls.enableDamping = true;
    //Damping factor
    this.controls.dampingFactor = 0.05;
    //Zoom Speed
    this.controls.zoomSpeed = 1.12;
    //Set Rotation Angle
    this.limitViewAngle(30, 50);
    // Minimum azimuth angle (in radians) - minimum rotation angle around target
    this.controls.minAzimuthAngle = (-Math.PI / 180) * 45;
    // Maximum azimuth angle (in radians) - maximum rotation angle around target
    this.controls.maxAzimuthAngle = (Math.PI / 180) * 45;
    //Maximum camera Distance from target
    this.controls.maxDistance = 22;
    //Minimum camera Distance from target
    this.controls.minDistance = 2.5;
  }

  /**
   * If away from origin, limit view angle.
   * @param {*} minAngle  sets the minimum angle
   * @param {*} maxAngle  sets the maximum angle
   */

  limitViewAngle(minAngle, maxAngle) {
    this.controls.minPolarAngle = (Math.PI / 180) * minAngle;
    this.controls.maxPolarAngle = (Math.PI / 180) * maxAngle;
  }

  /**
   * Called when Browser window in resized
   */

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
  /**
   * Updated on each next render
   */
  update() {
    if (this.controls.enabled) {
      this.controls.update();
      const distance = this.controls.getDistance();
      if (distance < 8) this.limitViewAngle(15, 75);
      if (distance < 13) this.limitViewAngle(30, 60);
      if (distance < 18) this.limitViewAngle(30, 50);
    }
  }
}
