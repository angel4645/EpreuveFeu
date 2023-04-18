import fs from "fs/promises";

export async function LectureFichier(filename: string) {
  const data: string = await fs.readFile(filename, { encoding: "utf8" });
  return data;
}
