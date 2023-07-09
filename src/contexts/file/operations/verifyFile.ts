export async function verifyFileAccessOperation(
  fileHandle: FileSystemFileHandle,
  readwrite = false
) {
  if (!readwrite) return true;
  // Check if permission was already granted. If so, return true.
  if (
    (await fileHandle.queryPermission({
      mode: readwrite ? "readwrite" : "read",
    })) === "granted"
  ) {
    return true;
  }
  // Request permission. If the user grants permission, return true.
  if (
    (await fileHandle.requestPermission({
      mode: readwrite ? "readwrite" : "read",
    })) === "granted"
  ) {
    return true;
  }
  // The user didn't grant permission, so return false.
  return false;
}
