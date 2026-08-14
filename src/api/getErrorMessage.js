// The backend responds inconsistently: auth/profile routes send
// res.status(400).send("Error: " + err.message) (plain text), while
// request/user routes send res.status(400).json({ message }). This
// normalizes both shapes into one readable string for the UI.
export function getErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  const data = err?.response?.data;

  if (typeof data === "string") {
    return data.replace(/^Error:\s*/i, "");
  }
  if (data?.message) return data.message;
  if (err?.message) return err.message;
  return fallback;
}
