import image from "./image.png";

// Load Image
export const loadImage = ({ url, width, height }) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve({ image, width, height }));
    image.addEventListener("error", (errorEvent) => reject(errorEvent));
    image.src = url;
  });

// Dom Sync
export const create = (image, width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, 3000, 3000, 0, 0, 3000, 3000);
  document.body.appendChild(canvas);
};

// Draw
export const draw = (width, height, image) => {
  loadImage({ url: image, width, height })
    .then(({ image, width, height }) => {
      create(image, width, height);
    })
    .catch((err) => console.log(err));
};

// Vec
const { width, height, image } = {
  image,
  width: 600,
  height: 400,
};

draw(width, height, image);
