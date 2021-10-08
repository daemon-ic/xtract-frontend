import FileSaver from "file-saver";
import { QUIZLET_DEFAULT_TARGET } from "../../misc/constants";

export const formatData = (dataObject) => {
  console.log("FORMATTING DATA...");
  //------------------------------------------------------------------------- FOR IMAGE URL

  const data = dataObject.result.text || dataObject.result.images;
  console.log("text", dataObject.result.text);
  console.log("images", dataObject.result.images);
  //------------------------------------------------------------------------- FOR IMAGE URL
  //------------------------------------------------------------------------- FOR IMAGE ZIP DOWNLOAD
  // const data = dataObject.result.text;
  //------------------------------------------------------------------------- FOR IMAGE ZIP DOWNLOAD

  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += data[i] + `\r\n\r\n`;
  }
  return result;
};

export const downloadFile = (data) => {
  console.log("DOWNLOADING TEXT FILE...");
  const blob = new Blob([data], {
    type: "text/plain;charset=utf-8",
  });
  FileSaver.saveAs(blob, "xtract.txt");
};

export const modifySelector = (stateCopy, elementSelector) => {
  switch (elementSelector) {
    case "Quizlet":
      return quizletMode(stateCopy);
    case "Class":
      return classMode(stateCopy);
    case "Id":
      return idMode(stateCopy);
    case "Tag":
      return tagMode(stateCopy);
    case "Images":
      return imageMode(stateCopy);
    default:
      return stateCopy;
  }
};

const quizletMode = (stateCopy) => {
  stateCopy.target = QUIZLET_DEFAULT_TARGET;
  return stateCopy;
};

const classMode = (stateCopy) => {
  // make classes seperated by space or comma
  // turn all commas into spaces
  // make sure theres only one space between everything
  //split, loop, add dots, join
};

const idMode = (stateCopy) => {
  // make classes seperated by space or comma
  // turn all commas into spaces
  // make sure theres only one space between everything
  //split, loop, add hash, join
};

const imageMode = (stateCopy) => {
  stateCopy.target = "img";
  return stateCopy;
};

const tagMode = (stateCopy) => {
  // make sure only one tag
};
