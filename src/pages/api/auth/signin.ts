
// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// // import clientPromise from '../../../lib/mongodb'; // Adjust this path if necessary

// interface User {
//   _id: string;
//   email: string;
//   password: string;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     // Check for missing fields
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Please provide both email and password' });
//     }

//     try {
//       // Connect to MongoDB
//       const client = await clientPromise;
//       const db = client.db("your-database-name");

//       // Find user by email
//       const user: User | null = await db.collection('users').findOne({ email });

//       // If user does not exist
//       if (!user) {
//         return res.status(401).json({ error: 'User already exists' });
//       }

//       // Compare provided password with the stored hashed password
//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//       }

//       // If authentication succeeds, return success message
//       return res.status(200).json({ message: 'Login successful' });

//     } catch (error) {
//       console.error('Error during authentication:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     // Handle any other HTTP method
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }



// import type { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs'; 
// import { connectToDatabase } from '../../../utils/mongodb';  

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' }); 
//   }
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   try {
//     // Connect to the MongoDB database
//     const { db } = await connectToDatabase();

//     // Check if the user exists in the 'users' collection
//     const user = await db.collection('users').findOne({ email });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // If password is correct, create a session or JWT (for session handling or token-based auth)
//     // Here, we'll just send a success response for simplicity
//     return res.status(200).json({ message: 'Sign-in successful' });

//   } catch (error) {
//     console.error('Error during authentication:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '../../../utils/mongodb'; // Your MongoDB connection utility
// import bcrypt from 'bcryptjs';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
//     }

//     const { email, password } = req.body;

//     try {
//         const db = await connectToDatabase(); // Connect to MongoDB
//         const usersCollection = db.collection('users'); // Access 'users' collection in the 'BlogApplication' database

//         // Check if user exists
//         const user = await usersCollection.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         // Verify password using bcrypt
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         // If user exists and password is correct, respond with success
//         return res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         console.error('Error during sign in:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb'; // Adjust path if needed
// import bcrypt from 'bcrypt'; // Optional: if you want to handle encrypted passwords

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
