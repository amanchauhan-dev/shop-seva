
// Generate a UUID manually
export const generateUUID = (): string => {
  let dt = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};



export const dummyUsers = Array.from({ length: 10 }, (_, i) => ({
  id: generateUUID(),
  created_at: new Date().toISOString(),
  full_name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone_number: Math.random() > 0.1 ? `98765432${i}` : null,
  date_of_birth: Math.random() > 0.5 ? `199${i}-0${(i % 9) + 1}-15` : null,
  gender: ["male", "female","male", "female", "other"][Math.floor(Math.random() * 5)],
  avatar: Math.random() > 0.5 ? `https://example.com/avatar${i + 1}.jpg` : null,
  role: ["customer", "customer","customer","admin"][Math.floor(Math.random() * 4)],
  last_login: Math.random() > 0.5 ? new Date().toISOString() : null,
  last_password: null,
  email_verified: Math.random() > 0.5,
  email_verify_token: Math.random() > 0.5 ? generateUUID() : null,
  forgot_password_token: Math.random() > 0.5 ? generateUUID() : null,
}));

//console.log(dummyUsers);