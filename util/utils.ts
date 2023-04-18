const fs = require("fs/promises");

export async function LectureFichier(filename: string) {
  try {
    const data: string = await fs.readFile(filename, { encoding: "utf8" });
    return data;
  } catch (err) {
    console.log(err);
    return "";
  }
}
