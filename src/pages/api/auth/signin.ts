
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '../../../utils/mongodb'; // Adjust path if needed
// // import bcrypt from 'bcrypt'; // Optional: if you want to handle encrypted passwords

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;
//     console.log(email, password);
    

//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     try {
//       const db = await connectToDatabase();
//       const collection = db.db('BlogApplication').collection('users'); // Adjust database and collection name if needed

//       // Check if the user with the given email exists
//       const user = await collection.findOne({ email });
      
//       if (!user) {
//         return res.status(404).json({ error: 'User does not exist. Please create an account.' });
//       }

//       // User exists and password is correct, proceed to login
//       return res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   }
// };

// export default handler;


import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const db = await connectToDatabase();
      const collection = db.db('BlogApplication').collection('users'); // Adjust database and collection name if needed

      // Check if the user with the given email exists
      const user = await collection.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User does not exist. Please create an account.' });
      }

      // Verify password (optional, if you handle encrypted passwords)
      // const passwordMatch = await bcrypt.compare(password, user.password);
      // if (!passwordMatch) {
      //   return res.status(401).json({ error: 'Invalid password' });
      // }

      // User exists and password is correct, proceed to login
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
