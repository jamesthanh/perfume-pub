import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Thanh Nguyen',
    email: 'thanh@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Phuoc Do',
    email: 'phuoc@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
