"use server";
import sharp from "sharp";

//? This function gets images one by one so for using this function should map on the images
//? and send single image to this function
//? Return: This function returns fileName

const uploadImageFsLess = async (
  formData, //?const formData = new FormData(); formData.append("file", file); files should be in this format
  site,
  category, //? category for folder name
  itemName, //? subfolder name in categoryFolder. ex:product name
  itemType, //? ex: productImages, guide-image,...
  index,
  width = 500,
  height = 500,
  folderNumber = "0" //? folder number
) => {
  let result = null;
  let fileName;
  try {
    const file = await formData.get("file");

    if (+folderNumber === 0) {
      fileName = `${site}/${category}/${itemName}/${itemType}/${itemName}-${itemType}-${index}.jpg`;
    } else {
      fileName = `${site}/${category}/${itemName}/${folderNumber}/${itemType}/${itemName}-${itemType}-${index}.jpg`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    //? compress the image and resize it
    await sharp(buffer)
      .toFormat("jpg")
      .resize({
        width: width === null ? null : width,
        height: height === null ? null : height,
        fit: "contain",
        quality: 100,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .withMetadata()
      .toFile(`./public/${fileName}`)
      .then((res) => {
        result = { name: fileName, size: res.size };
      })
      .catch((err) => {
        throw new Error("error");
      });
  } catch (err) {
    result = "error";
  }

  return result;
};

export default uploadImageFsLess;
