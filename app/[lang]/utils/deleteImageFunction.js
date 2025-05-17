"use server";
import fsPromises from "node:fs/promises";
import fs from "node:fs";

const deleteImageFunction = async (image, state) => {
  await fsPromises.rm(`./public/${image.name}`, {
    recursive: true,
    force: true,
  });
  const newState = [...state].filter(
    (imageName) => imageName.name !== image.name
  );
  const files = await fsPromises.readdir(
    `./public/${image.name.split("/").slice(0, -1).join("/")}`
  );
  const images = files.filter(
    (file) =>
      file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")
  );

  images.forEach((imageItem, index) => {
    fs.renameSync(
      `./public/${image.name.split("/").slice(0, -1).join("/")}/${imageItem}`,
      `./public/${image.name.split("/").slice(0, -1).join("/")}/${imageItem
        .split(".")[0]
        .split("-")
        .slice(0, -1)
        .join("-")}-${index + 1}.${imageItem.split(".")[1]}`
    );
  });
  const newFiles = await fsPromises.readdir(
    `./public/${image.name.split("/").slice(0, -1).join("/")}`
  );

  console.log("newFiles", newFiles);
  const newImages = newFiles
    .filter(
      (file) =>
        file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")
    )
    .map((file, index) => ({
      name: `${image.name.split("/").slice(0, -1).join("/")}/${file}`,
      size: newState[index].size,
    }));
  return newImages;
};

export default deleteImageFunction;
