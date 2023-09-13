import {
  Skeleton,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  AnimationMixer,
  SRGBColorSpace,
  MeshStandardMaterial,
  Color,
} from "three";
import Experience from "../../Experience.js";
export default class Character {
  constructor(data) {
    this.experience = new Experience();
    this.dataArray = data;
    this.setUtils();
    this.setMultipleCharacters();
  }

  // Function to randomly shuffle the elements in the array
  randomAnimation(arr) {
    for (const i of arr) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    for (const element of arr) {
      return element;
    }
  }

  // Sets the utilities required for character

  setUtils() {
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.model = this.resources.items.CharacterFlavilla;
    // this.model = this.resources.items["Character_Test"];
    this.model.scene.traverse((node) => {
      if (node.isMesh) {
        const material = node.material;
        material.roughness = 1;
        material.metalness = 0;

        material.emissive = new Color(0x000000);
      }
    });

    // this.resources.items.CharacterAnim2.scene.scale.set(0.1, 0.1, 0.1);
    // this.resources.items.CharacterAnim3.scene.scale.set(0.1, 0.1, 0.1);
    // const charactersArray = [
    //   this.resources.items.CharacterAnim2.animations[0],
    //   this.resources.items.CharacterAnim3.animations[0],
    // ];
    // this.combineAnimationsInSingleModel(charactersArray);
    this.pointer = this.resources.items.Pointer;
    this.mixer = [];
    this.pointers = [];
  }

  /**
   * Combines Animations of all three models in one model
   */
  combineAnimationsInSingleModel(charactersArray) {
    this.modelAnimation1 = charactersArray[0];
    this.modelAnimation2 = charactersArray[1];
    this.model.animations.push(this.modelAnimation1);
    this.model.animations.push(this.modelAnimation2);
  }

  /**
   * Creates a Clone of Skinned Mesh and Bones.
   * @returns Cloned Model
   */

  cloneGLTFHavingSkinnedMesh = () => {
    const clone = {
      animations: this.model.animations,
      scene: this.model.scene.clone(true),
    };
    const skinnedMeshes = {};
    this.model.scene.traverse((child) => {
      if (child.isSkinnedMesh) skinnedMeshes[child.name] = child;
    });
    const cloneBones = {};
    const cloneSkinnedMeshes = {};
    clone.scene.traverse((node) => {
      if (node.isBone) cloneBones[node.name] = node;
      if (node.isSkinnedMesh) cloneSkinnedMeshes[node.name] = node;
      node.castShadow = true;
    });

    for (let name in skinnedMeshes) {
      const skinnedMesh = skinnedMeshes[name];
      const skeleton = skinnedMesh.skeleton;
      const cloneSkinnedMesh = cloneSkinnedMeshes[name];
      const orderedCloneBones = [];
      for (const i of skeleton.bones) {
        const cloneBone = cloneBones[i.name];
        orderedCloneBones.push(cloneBone);
      }
      cloneSkinnedMesh.bind(
        new Skeleton(orderedCloneBones, skeleton.boneInverses),
        cloneSkinnedMesh.matrixWorld
      );
    }
    return clone;
  };

  /**
   * Sets Multiple Characters on Map
   */

  setMultipleCharacters() {
    const pointerGeometry = new PlaneGeometry(0.6, 0.3, 10, 10);
    const pointerMaterial = new MeshBasicMaterial({
      color: 0xff0000,
      map: this.pointer,
      transparent: true,
      alphaTest: 0.5,
    });
    const characterNewGeometry = new PlaneGeometry(0.1, 0.25, 10, 10);
    const characterNewMaterial = new MeshStandardMaterial({
      visible: false,
    });
    // Create an array with 3 elements
    const AnimationsArray = [0, 1, 2];
    for (const i of this.dataArray) {
      if (i.visible === true) {
        const clone = this.cloneGLTFHavingSkinnedMesh();

        clone.scene.scale.set(0.2, 0.2, 0.2);
        clone.scene.position.set(i.x, i.y, i.z);
        const characterMesh = new Mesh(
          characterNewGeometry,
          characterNewMaterial
        );
        characterMesh.position.set(i.x, i.y + 0.2, i.z);

        characterMesh.userData = i;
        this.experience.characterIntersections.push(characterMesh);
        const pointer = new Mesh(pointerGeometry, pointerMaterial);
        this.pointers.push(pointer);
        pointer.position.set(i.x, i.y + 0.6, i.z);
        this.scene.add(clone.scene, pointer, characterMesh);
        const animation = this.randomAnimation(AnimationsArray);
        this.playAllAnimations(clone, animation);
      }
    }
  }

  /**
   * play Animations of each Character Individually
   * @param {*} clone Cloned Model
   */

  playAllAnimations(clone, animation) {
    const mixer = new AnimationMixer(clone.scene);
    this.mixer.push(mixer);
    const action = mixer.clipAction(clone.animations[animation]);
    action.timeScale = 0.5 + Math.random() * 0.8;
    action.play();
  }

  //Updates the animation on each frame
  update() {
    const deltaTime = this.time.delta / 1000; //Time in seconds
    //Updating Multiple Mixers
    for (const i of this.mixer) {
      if (i) i.update(deltaTime / 2);
    }
    for (const i in this.pointers) {
      this.pointers[i].lookAt(this.camera.instance.position);
      if (this.camera.controls.getDistance() < 14) {
        this.pointers[i].visible = false;
      } else this.pointers[i].visible = true;
    }
  }
}
