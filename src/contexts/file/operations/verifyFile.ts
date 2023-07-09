export async function verifyWritePermissionOperation(
  fileHandle: FileSystemFileHandle,
  readwrite = false
) {
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
