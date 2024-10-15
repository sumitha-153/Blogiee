import { NextApiRequest, NextApiResponse } from 'next';

const blogs = [
  {
    id: 1,
    title: 'Blog 1',
    author: 'Author 1',
    date: '2023-01-01',
    content: 'Content of blog 1',
    tags: ['tag1', 'tag2'],
    profileImage: '/path/to/profileImage1.jpg',
    blogImage: '/path/to/blogImage1.jpg',
  },
  {
    id: 2,
    title: 'Blog 2',
    author: 'Author 2',
    date: '2023-02-01',
    content: 'Content of blog 2',
    tags: ['tag3', 'tag4'],
    profileImage: '/path/to/profileImage2.jpg',
    blogImage: '/path/to/blogImage2.jpg',
  },
  // Add more blogs as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const blog = blogs.find((b) => b.id === parseInt(id as string));

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  return res.status(200).json(blog);
}