import { verifyFileAccessOperation } from "./verifyFile";
import { showOpenFilePicker } from "file-system-access";
export default async function openFileOperation(readonly: boolean) {
  const pickerOpts: OpenFilePickerOptions = {
    types: [
      {
        description: "k-desk files",
        accept: {
          "text/yaml": [".desk.yaml", ".yaml"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  // Open file picker and destructure the result the first handle
  const [fileHandle] = await showOpenFilePicker(pickerOpts);
  const grant = await verifyFileAccessOperation(
    fileHandle,
    readonly ? false : true
  );
  if (!grant) throw new Error("unauthorized to access file");

  return fileHandle;
}
