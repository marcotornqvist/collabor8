import { v4 as uuidv4 } from "uuid";
import path from "path";

export const uuidFilenameTransform = (filename = "") => {
  const fileExtension = path.extname(filename);

  return `${uuidv4()}${fileExtension}`;
};
