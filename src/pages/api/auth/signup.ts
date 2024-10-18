
// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        try{
            const db = await connectToDatabase();
            const database = db.db('BlogApplication');
            const users = await database.collection('users').find().toArray();
            return res.status(200).json(users);
        }catch(error){
            console.error('Error during fetching signup data :', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log(email+" "+password);
        

        console.log("Received request with body:", req.body);

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        try {
            const db = await connectToDatabase();
            const database=db.db('BlogApplication');

            // Check if user already exists
            const existingUser = await database.collection('users').findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password
            // const hashedPassword = await bcrypt.hash(password, 10);

            await database.collection('users').insertOne({
                email,
                password,
            });

            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error during signup:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET','POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
