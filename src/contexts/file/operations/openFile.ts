import { verifyWritePermissionOperation } from "./verifyFile";

export default async function openFileOperation() {
  const pickerOpts: OpenFilePickerOptions = {
    types: [
      {
        description: "k-desk files",
        accept: {
          "application/json": [".desk.json", ".json"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  // Open file picker and destructure the result the first handle
  const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  const grant = await verifyWritePermissionOperation(fileHandle, true);
  if (!grant) throw new Error("unauthorized to write file");

  return fileHandle;
}
