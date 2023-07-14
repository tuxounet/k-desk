import { IDataStore, defaultDataStore } from "../../datastore/types/IDataStore";
import { showSaveFilePicker } from "file-system-access";
import serializeFileOperation from "./serializeFile";

export default async function createFileOperation() {
  const pickerOpts: SaveFilePickerOptions = {
    suggestedName: "new-desk.desk.yaml",
    types: [
      {
        description: "k-desk files",
        accept: {
          "text/yaml": [".desk.yaml", ".yaml"],
        },
      },
    ],
  };

  const newData: IDataStore = defaultDataStore;

  newData.events.items.push({
    date: new Date(),
    event: "FILE_CREATED",
    label: "Création du fichier",
    sequence: newData.events.lastSequence + 1,
  });
  newData.events.lastSequence = newData.events.lastSequence + 1;

  const newBody = await serializeFileOperation(newData);
  const newHandle = await showSaveFilePicker(pickerOpts);
  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write(newBody);

  // close the file and write the contents to disk.
  await writableStream.close();

  return newHandle;
}
