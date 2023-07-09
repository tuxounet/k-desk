export default function OPFSPage() {
  const readFile = async () => {
    // Get handle to draft file in OPFS
    const root = await navigator.storage.getDirectory();
    const draftHandle = await root.getFileHandle("draft.txt", { create: true });

    console.dir(draftHandle);
    const file = await draftHandle.getFile();
    const body = await file.text();

    console.info(body);
    // create a FileSystemWritableFileStream to write to
    const writableStream = await draftHandle.createWritable();

    // write our file
    await writableStream.write(` ceci est unn test " + ${Date.now()}) `);

    // close the file and write the contents to disk.
    await writableStream.close();

  };

  return (
    <>
      <h1>OPFS</h1>
      <div className="card"></div>
      <button
        onClick={() => {
          readFile().catch((e) => console.error(e));
        }}
      >
        Charger le fichier
      </button>
    </>
  );
}
