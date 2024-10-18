import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { connectToDatabase } from '../../utils/mongodb';
// Disable Next.js body parser to handle the form data with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

console.log("entered into api/blogs.ts");

interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  profileImage: string;
  blogImage: string;
}

const blogs: Blog[] = [
  // Pre-existing blog entries
  {
    id: 1,
    title: 'Understanding JavaScript Closures',
    author: 'Jane Doe',
    date: '2023-10-01',
    content: 'A closure is a feature in JavaScript where...',
    tags: ['JavaScript', 'Programming', 'Closures'],
    profileImage: '/men1.jpeg',
    blogImage: '/javascript.png',
  },
  {
    id: 2,
    title: 'A Guide to Responsive Web Design',
    author: 'John Smith',
    date: '2023-09-25',
    content: 'Responsive web design is essential in today’s...',
    tags: ['Web Design', 'CSS', 'Responsive'],
    profileImage: '/profile.webp',
    blogImage: '/webdesign.webp',
  },
  {
    id: 3,
    title: "Introduction to Machine Learning",
    author: "Alice Johnson",
    date: "2023-09-20",
    content: "Machine learning is a powerful tool that is transforming various industries by enabling computers to learn from data and make intelligent decisions. Understanding the basics of machine learning, including its key concepts, common algorithms, and applications, is essential for leveraging its potential to solve real-world problems.",
    tags: ["Machine Learning", "AI", "Data Science"],
    profileImage: "/men1.jpeg",
    blogImage: "/machinelearning.jpg"
},
{
    id: 4,
    title: "Top 10 Python Libraries for Data Science",
    author: "Bob Brown",
    date: "2023-09-15",
    content: "Python is a popular language for data science due to its simplicity and the availability of powerful libraries...",
    tags: ["Python", "Data Science", "Libraries"],
    profileImage: "/men1.jpeg",
    blogImage: "/python.png"
},
{
    id: 5,
    title: "Understanding RESTful APIs",
    author: "Carol White",
    date: "2023-09-10",
    content: "RESTful APIs are a key component of modern web development...",
    tags: ["APIs", "REST", "Web Development"],
    profileImage: "/profile.webp",
    blogImage: "/rest-api.png"
}
];
 const handler =async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("entered into handler");
  
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const database = db.db('BlogApplication'); // Replace 'yourDatabaseName' with the actual database name
      const blogs = await database.collection('blogs').find().toArray();
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs from database:', error);
      res.status(500).json({ error: 'Error fetching blogs from database' });
    }
  }
  else if (req.method === 'POST') {
    console.log("before formidable");

    const form = formidable();

    form.parse(req, async (err: Error | null, fields: { title: string; author: string; date: string; content: string; tags: string; }, files: { profileImage: formidable.File[]; blogImage: formidable.File[]; }) => {
      if (err) {
        console.log('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const { title, author, date, content, tags } = fields;
      const profileImage = Array.isArray(files.profileImage) ? files.profileImage[0] : files.profileImage; // Uploaded profile image
      const blogImage = Array.isArray(files.blogImage) ? files.blogImage[0] : files.blogImage; // Uploaded blog image

      console.log('Form fields:', fields);
      console.log('Form files:', files);

      // Validation: Check for required fields
      if (!title || !author || !date || !content || !tags || !profileImage || !blogImage) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Process images if necessary (e.g., save them to the filesystem or cloud storage)
      // Example:
      const profileImagePath = saveImage(profileImage as formidable.File);
      const blogImagePath = saveImage(blogImage as formidable.File);

      // Create a new blog post
      console.log(typeof(tags));
      console.log(tags);
      
      
      const newBlog: Blog = {
        id: blogs.length + 1, // Assign a new id
        title: Array.isArray(title) ? title[0] : title,
        author: Array.isArray(author) ? author[0] : author,
        date: Array.isArray(date) ? date[0] : date,
        content: Array.isArray(content) ? content[0] : content,
        tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags into an array
        profileImage: profileImagePath, // Save the file path or URL
        blogImage: blogImagePath,
      };      

      const db = await connectToDatabase();
      const database = db.db('BlogApplication'); // Replace 'BlogApplication' with your actual database name
      const result = await database.collection('blogs').insertOne(newBlog);
      console.log(result);
      

      // Respond with the newly created blog post
      return res.status(201).json(newBlog);
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Helper function to save image (can be customized for local storage or cloud)
const saveImage = (file: formidable.File): string => {
  const data = fs.readFileSync(file.filepath);
  const filePath = `/uploads/${file.newFilename}`; // Define path
  fs.writeFileSync(`./public${filePath}`, data); // Save the file in the public folder
  return filePath; // Return the file path to use in the blog post
};

export default handler