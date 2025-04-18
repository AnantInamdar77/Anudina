import bcrypt from 'bcryptjs';

const password = 'Abhay@179'; // Replace with your desired password

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);
});
