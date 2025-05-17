import Fuse from "fuse.js";

const customTagInputSearchFunction = (searchText, data) => {
  const fuseOptions = {
    includeMatches: true,
    minMatchCharLength: 1,
    useExtendedSearch: true,
    keys: [
      { name: "keywords.fa", weight: 1 },
      { name: "keywords.en", weight: 1 },
      { name: "keywords.ar", weight: 1 },
    ],
  };

  const fuse = new Fuse(data, fuseOptions);

  // const items = fuse.search(`=${searchText}`);
  const items = fuse.search(`'${searchText}`);
  const normalItems = new Set();
  if (items.length > 0) {
    items.map((item) => {
      normalItems.add(item?.matches[0].value);
    });
  }
  return [...normalItems];
};

export default customTagInputSearchFunction;
