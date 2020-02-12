import forge from "node-forge";

function Secure() {}

Secure.encrypt = (publicKey, plainText) => {
  let publicKeyFromPem = forge.pki.publicKeyFromPem(publicKey);
  let encrypted = publicKeyFromPem.encrypt(plainText, "RSA-OAEP");
  let encoded_encryted = forge.util.encode64(encrypted);
  return encoded_encryted;
};

export default Secure;
