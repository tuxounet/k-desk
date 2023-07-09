export default function ExportPage() {
  const writeFile = async () => {
    // create a new handle
    const newHandle = await window.showSaveFilePicker();

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write("ceci est unn test ");

    // close the file and write the contents to disk.
    await writableStream.close();
  };

  return (
    <>
      <h1>Export</h1>
      <div className="card"></div>
      <button
        onClick={() => {
          writeFile().catch((e) => console.error(e));
        }}
      >
        Sauvegarder le fichier
      </button>
    </>
  );
}
