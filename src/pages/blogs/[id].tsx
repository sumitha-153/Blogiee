import React from 'react';

import styles from './blog.module.css';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

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

const BlogDetails = ({ blog }: { blog: Blog }) => {
  return (
    <div className={styles.blogdetails}>
      <div style={{display:'flex' ,flexDirection:'row' , gap:'10px'}}>
              <Image className={styles.image} src={blog.profileImage} alt={`${blog.author}'s profile`}  width={400} height={400}/>
               <p> By {blog.author} on {blog.date}</p>
              </div> 
               <Image className={styles.blogimages} src={blog.blogImage} alt={`${blog.title}`}  width={400} height={400}/>
               <br />

      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <h5>Tags: {blog.tags.join(', ')}</h5>

     
      
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  try {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.statusText}`);
    }
    const blog: Blog = await res.json();
    return {
      props: { blog },
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return {
      notFound: true,
    };
  }
};

export default BlogDetails;