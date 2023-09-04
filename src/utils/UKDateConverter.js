const convertDate = (inputDateString) => {
  let date = new Date(inputDateString);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric"
  };

  const ukFormattedDate = date.toLocaleString("en-GB", options);

  return ukFormattedDate;
};

export default convertDate;
