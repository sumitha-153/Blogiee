interface User {
  id: string;
  email: string;
  password: string;
}

const users: User[] = [
  { id: '1', email: 'user@example.com', password: 'password123' },
  // Add more users as needed
];
console.log(users);

export default users;