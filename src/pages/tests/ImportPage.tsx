export default function ImportPage() {
  const readFile = async () => {
    // Open file picker and destructure the result the first handle

    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const body = await file.text();
    console.dir(body);
  };

  return (
    <>
      <h1>Import</h1>
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
