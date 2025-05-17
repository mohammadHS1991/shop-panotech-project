const capitalizeText = (text) => {
  return text
    .split(" ")
    .map((item) => {
      return `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
    })
    .join(" ");
};

export default capitalizeText;
