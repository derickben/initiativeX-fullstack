const Category = require("./Category");
const Tag = require("./Tag");
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const isCategory = (file) => {
  if (file["cat_name"]) return true;
};

const isTag = (file) => {
  if (file["tag_name"]) return true;
};

const loadData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "category.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isCategory(data)) {
          saveCategory(data);
        }
        if (isTag(data)) {
          saveTag(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const categories = await getAllCategories();
        const tags = await getAllTags();
        console.log(
          `${categories.length} categories found!\n${tags.length} tags found!`
        );
        resolve();
      });
  });
};

const getAllCategories = async () => {
  return await Category.find();
};

const getAllTags = async () => {
  return await Tag.find();
};

const saveCategory = async (file) => {
  try {
    await Category.updateOne(
      { category: file.cat_name },
      { category: file.cat_name },
      { upsert: true }
    );
  } catch (error) {
    console.log(`Could not save category ${error}`);
  }
};

const saveTag = async (file) => {
  try {
    await Tag.updateOne(
      { tag: file.tag_name },
      { tag: file.tag_name },
      { upsert: true }
    );
  } catch (error) {
    console.log(`Could not save tag ${error}`);
  }
};

module.exports = { loadData, getAllCategories, getAllTags };
