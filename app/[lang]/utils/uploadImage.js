"use server";
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import fs from "node:fs";

//? This function gets images one by one so for using this function should map on the images
//? and send single image to this function
//? Return: This function returns fileName

const uploadImage = async (
  formData, //?const formData = new FormData(); formData.append("file", file); files should be in this format
  category, //? category for folder name
  itemName, //? subfolder name in categoryFolder. ex:product name
  itemType, //? ex: productImages, guide-image,...
  index,
  width = 500,
  height = 500
) => {
  let result = null;

  try {
    if (!fs.existsSync(`./public/panotech/${category}/${itemName}`)) {
      try {
        await mkdir(`./public/panotech/${category}/${itemName}`);
        await mkdir(`./public/panotech/${category}/${itemName}/${itemType}`);
      } catch (err) {
        console.log("error creating temporary");
      }
    } else {
      if (
        !fs.existsSync(`./public/panotech/${category}/${itemName}/${itemType}`)
      ) {
        try {
          await mkdir(`./public/panotech/${category}/${itemName}/${itemType}`);
        } catch (err) {
          console.log("error creating temporary");
        }
      }
      // else {
      //   try {
      //     await rm(`./public/panotech/${category}/${itemName}/${itemType}`, {
      //       recursive: true,
      //       force: true,
      //     });
      //     await mkdir(`./public/panotech/${category}/${itemName}/${itemType}`);
      //   } catch (err) {
      //     console.log("error creating temporary");
      //   }
      // }
    }

    const file = await formData.get("file");
    const fileName = `${category}/${itemName}/${itemType}/${itemName}-${itemType}-${index}.jpg`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    //? compress the image and resize it
    await sharp(buffer)
      .toFormat("jpg")
      .resize({
        width: width === null ? null : width,
        height: height === null ? null : height,
        fit: "cover",
        quality: 100,
      })
      .toFile(`./public/panotech/${fileName}`)
      .then((res) => {
        result = { name: fileName, size: res.size };
      })
      .catch((err) => {
        // console.log(err);
        throw new Error("error");
      });
  } catch (err) {
    result = "error";
  }

  return result;
};

export default uploadImage;
