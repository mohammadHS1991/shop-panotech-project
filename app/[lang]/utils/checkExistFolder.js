"use server";
import { mkdir, rm, writeFile } from "node:fs/promises";
import fs from "node:fs";

const checkExistFolder = async (
  site, //? site
  category, //? category for folder name ex: products, custom-products
  itemName, //? subfolder name in categoryFolder. ex:product name
  itemType, //? ex: productImages, guide-image,...
  needToClearFolder, //? need to clear the folder
  folderNumber = "0" //? folder number. if needToClearFolder was false there is no need to set folder number
) => {
  try {
    if (!fs.existsSync(`./public/${site}/${category}/${itemName}`)) {
      //   try {
      await mkdir(`./public/${site}/${category}/${itemName}`);
      if (+folderNumber !== 0) {
        await mkdir(`./public/${site}/${category}/${itemName}/${folderNumber}`);
        await mkdir(
          `./public/${site}/${category}/${itemName}/${folderNumber}/${itemType}`
        );
      }
      if (+folderNumber === 0) {
        await mkdir(`./public/${site}/${category}/${itemName}/${itemType}`);
      }
    } else {
      if (needToClearFolder && +folderNumber === 0) {
        if (
          !fs.existsSync(`./public/${site}/${category}/${itemName}/${itemType}`)
        ) {
          await mkdir(`./public/${site}/${category}/${itemName}/${itemType}`);
        }

        if (
          fs.existsSync(`./public/${site}/${category}/${itemName}/${itemType}`)
        ) {
          await rm(`./public/${site}/${category}/${itemName}/${itemType}`, {
            recursive: true,
            force: true,
          });
          await mkdir(`./public/${site}/${category}/${itemName}/${itemType}`);
        }
      }
      if (!needToClearFolder && +folderNumber === 0) {
        if (
          !fs.existsSync(`./public/${site}/${category}/${itemName}/${itemType}`)
        ) {
          await mkdir(`./public/${site}/${category}/${itemName}/${itemType}`);
        }
      }
      if (!needToClearFolder && +folderNumber !== 0) {
        if (
          fs.existsSync(
            `./public/${site}/${category}/${itemName}/${folderNumber}`
          )
        ) {
          if (
            !fs.existsSync(
              `./public/${site}/${category}/${itemName}/${folderNumber}/${itemType}`
            )
          ) {
            await mkdir(
              `./public/${site}/${category}/${itemName}/${folderNumber}/${itemType}`
            );
          }
        }

        if (
          !fs.existsSync(
            `./public/${site}/${category}/${itemName}/${folderNumber}`
          )
        ) {
          await mkdir(
            `./public/${site}/${category}/${itemName}/${folderNumber}`
          );

          await mkdir(
            `./public/${site}/${category}/${itemName}/${folderNumber}/${itemType}`
          );
        }
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export default checkExistFolder;
