import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../navbar/Navbar';
import styles from './blog.module.css';
import { GetServerSideProps } from 'next';
import Footer from '../footer/Footer';
import Image from 'next/image';
import BlogDetails from './[id]';

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


interface BlogsProps {
  blogs:Blog[];
}

// const BlogDetails = ({ blog }: { blog: Blog }) => {
//   return (
//     <div className={styles.blogdetails}>
//       <div style={{display:'flex' ,flexDirection:'row' , gap:'10px'}}>
//               <Image className={styles.image} src={blog.profileImage} alt={`${blog.author}'s profile`}  width={400} height={400}/>
//                <p> By {blog.author} on {blog.date}</p>
//               </div> 
//                <Image className={styles.blogimages} src={blog.blogImage} alt={`${blog.title}`}  width={400} height={400}/>
//                <br />

//       <h2>{blog.title}</h2>
//       <p>{blog.content}</p>
//       <h5>Tags: {blog.tags.join(', ')}</h5>

     
      
//     </div>
//   );
// };

const Blogs = ({ blogs }: BlogsProps) => {
  const router = useRouter();
  const { query } = router;
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);



  useEffect(() => {
    if (query.id) {
      const foundBlog = blogs.find((b) => b.id === parseInt(query.id as string));
      setSelectedBlog(foundBlog || null);
    }
  }, [query, blogs]);

  


  const handleReadMore = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div>
      <Navbar>
      
      {selectedBlog ? (
        <BlogDetails blog={selectedBlog} />
      ) : (
        <ul className={styles.blogcard}>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <div style={{display:'flex' ,flexDirection:'row' , gap:'10px'}}>
              <Image className={styles.image} src={blog.profileImage} alt={`${blog.author}'s profile`}  width={40} height={40}/>
               <p> By {blog.author} on {blog.date}</p>
               

              </div> <hr /> <br />
             
               
               <Image className={styles.blogimage} src={blog.blogImage} alt={`${blog.title}`}  width={400} height={400}/>

               <br />
              <div className={styles.container}>
               <h2 className={styles.title}> {blog.title}</h2>
                <p>Tags: {blog.tags.join(', ')}</p>

                <button 
                  onClick={() => handleReadMore(blog)}    
                  className={styles.buttons}              
                  // className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {selectedBlog && (selectedBlog as Blog).id === blog.id ? 'Show less' : 'Read more...'}
                </button>
                
                
                {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.content}</p> */}
               
              </div>
            

            </li>
          ))}
        </ul>
      )}
      </Navbar>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/blogs`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.statusText}`);
    }
    
    const blogs: Blog[] = await res.json();

    return {
      props: { blogs },
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      props: { blogs: [] },
    };
  }
};


export default Blogs;





