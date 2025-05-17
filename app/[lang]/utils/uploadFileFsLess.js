"use server";
import { writeFile } from "node:fs/promises";

//? This function gets files one by one so for using this function should map on the files
//? and send single file to this function
//? Return: This function returns fileName

const uploadFileFsLess = async (
  formData, //?const formData = new FormData(); formData.append("file", file); files should be in this format
  site,
  category, //? category for folder name
  itemName, //? subfolder name in categoryFolder. ex:product name
  itemType, //? ex: productImages, guide-image,...
  index,
  folderNumber = "0", //? folder number
  rename = true
) => {
  let result = null;
  let fileName;
  try {
    const file = await formData.get("file");
    if (+folderNumber === 0) {
      if (rename) {
        fileName = `${site}/${category}/${itemName}/${itemType}/${itemName}-${itemType}-${index}.pdf`;
      } else {
        fileName = `${site}/${category}/${itemName}/${itemType}/${file.name}`;
      }
    } else {
      if (rename) {
        fileName = `${site}/${category}/${itemName}/${folderNumber}/${itemType}/${itemName}-${itemType}-${index}.pdf`;
      } else {
        fileName = `${site}/${category}/${itemName}/${folderNumber}/${itemType}/${file.name}`;
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await writeFile(`./public/${fileName}`, buffer);
    result = { name: fileName, size: file.size };
  } catch (err) {
    result = "error";
  }

  return result;
};

export default uploadFileFsLess;
