// // src/pages/api/auth/signup.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '../../../utils/mongodb'; // Adjust the import path if needed

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     try {
//       const db = await connectToDatabase();
//       const collection = db.collection('users'); // Adjust collection name if needed

//       // Insert the new user into the collection
//       const result = await collection.insertOne({ email, password });
      
//       return res.status(201).json(result);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   }
// };

// export default handler;



// src/pages/api/auth/signup.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '../../../utils/mongodb'; // Adjust the import path if needed

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     try {
//       const db = await connectToDatabase();
//       const collection = db.collection('users'); // Adjust collection name if needed

//       // Insert the new user into the collection
//       const result = await collection.insertOne({ email, password });
      
//       // Optionally return the inserted user data or a success message
//       const user = await collection.findOne({ _id: result.insertedId });
//       return res.status(201).json({ message: 'User created successfully', user });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   }
// };

// export default handler;





// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        try {
            const db = await connectToDatabase();

            // Check if user already exists
            const existingUser = await db.collection('users').findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password
            // const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            await db.collection('users').insertOne({
                email,
                password,
            });

            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error during signup:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

