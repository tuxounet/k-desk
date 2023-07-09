import { IDataStore } from "../../datastore/types/IDataStore";
import { showSaveFilePicker } from "file-system-access";

export default async function createFileOperation() {
  const pickerOpts: SaveFilePickerOptions = {
    suggestedName: "new-desk.desk.json",
    types: [
      {
        description: "k-desk files",
        accept: {
          "application/json": [".desk.json", ".json"],
        },
      },
    ],
  };

  // create a new handle
  const newHandle = await showSaveFilePicker(pickerOpts);

  const newData: IDataStore = { topics: [], activities: [] };

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write(JSON.stringify(newData, null, 1));

  // close the file and write the contents to disk.
  await writableStream.close();

  return newHandle;
}
