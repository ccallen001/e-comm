async function hasPassword(password: string) {
  const arrayButter = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password),
  );

  return Buffer.from(arrayButter).toString("base64");
}

export const isValidPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return (await hasPassword(password)) === hashedPassword;
};
