
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { ParsedUrlQueryInput } from 'querystring';
// // import Link from 'next/link';

// interface FormData {
//     title: string;
//     content: string;
//     image: string;
//     profile: string;
//     date: string;
// }

// const HomePage: React.FC = () => {
//     const router = useRouter();
//     const [formData, setFormData] = useState<FormData>({
//         title: '',
//         content: '',
//         image: '',
//         profile: '',
//         date: ''
//     });
//     const [errors, setErrors] = useState<Partial<FormData>>({});

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         const newErrors: Partial<FormData> = {};

//         if (!formData.title) newErrors.title = 'Title is required';
//         if (!formData.content) newErrors.content = 'Content is required';
//         if (!formData.image) newErrors.image = 'Image is required';
//        // if (!formData.profile) newErrors.profile = 'Profile is required';
//         if (!formData.date) newErrors.date = 'Date is required';

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }
//         console.log(formData);

//         router.push({
//             pathname: '/blogs/blog',
//             query: formData as unknown as ParsedUrlQueryInput
//         });
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { id, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [id]: value }));
//         setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
//     };

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setFormData(prevState => ({ ...prevState, image: e.target.files[0].name }));
//             setErrors(prevErrors => ({ ...prevErrors, image: '' }));
//         }
//     };
    

//     return (
//         <div className="homepage-container">
//             <h1>Create a Blog Post</h1>
//             <form onSubmit={handleSubmit} className="blog-form">
//                 <div className="form-group">
//                     <label htmlFor="title">Title:</label>
//                     <input
//                         type="text"
//                         id="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         onFocus={()=>setErrors({})}
//                     />
//                     {errors.title && <span className="error">{errors.title}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="content">Content:</label>
//                     <textarea
//                         id="content"
//                         value={formData.content}
//                         onChange={handleChange}
//                     />
//                     {errors.content && <span className="error">{errors.content}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="image">Image:</label>
//                     <input
//                         type="file"
//                         id="image"
//                         onChange={handleImageChange}
//                     />
//                     {errors.image && <span className="error">{errors.image}</span>}
//                 </div>
//                 <button type="submit" className="submit-button">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default HomePage;