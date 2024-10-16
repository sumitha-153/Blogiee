// // pages/api/auth/signup.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '../../../utils/mongodb'; 

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { email, password } = req.body;

//         // Validate input
//         if (!email || !password) {
//             return res.status(400).json({ error: 'Email and password are required' });
//         }

//         try {
//             const db = await connectToDatabase();

//             // Check if user already exists
//             const database = db.db(); // Access the database
//             const existingUser = await database.collection('users').findOne({ email });
//             if (existingUser) {
//                 return res.status(400).json({ error: 'User already exists' });
//             }

//             // Hash the password
//             // const hashedPassword = await bcrypt.hash(password, 10);

//             await database.collection('users').insertOne({
//                 email,
//                 password,
//             });

//             return res.status(201).json({ message: 'User created successfully' });
//         } catch (error) {
//             console.error('Error during signup:', error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }


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
            const database = db.db(); // Access the database

            // Check if user already exists
            const existingUser = await database.collection('users').findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password (optional, if you want to handle encrypted passwords)
            // const hashedPassword = await bcrypt.hash(password, 10);

            await database.collection('users').insertOne({
                email,
                password, // or hashedPassword if you hash the password
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
