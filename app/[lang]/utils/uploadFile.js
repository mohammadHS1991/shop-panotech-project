"use server";
import { mkdir, rm, writeFile } from "node:fs/promises";
import fs from "node:fs";

//? This function gets files one by one so for using this function should map on the files
//? and send single file to this function
//? Return: This function returns fileName

const uploadFile = async (
  formData, //?const formData = new FormData(); formData.append("file", file); files should be in this format
  category, //? category for folder name
  itemName, //? subfolder name in categoryFolder. ex:product name
  itemType, //? ex: productImages, guide-image,...
  index
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
    const fileName = `${category}/${itemName}/${itemType}/${itemName}-${itemType}-${index}.pdf`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await writeFile(`./public/panotech/${fileName}`, buffer);
    result = { name: fileName, size: file.size };
  } catch (err) {
    result = "error";
  }

  return result;
};

export default uploadFile;
