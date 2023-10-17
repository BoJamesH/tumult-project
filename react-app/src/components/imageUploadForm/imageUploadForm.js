// import { useState } from 'react';
// import { useDispatch } from 'react-redux';

// const UploadPicture = () => {
//   const [image, setImage] = useState(null);
//   const [imageLoading, setImageLoading] = useState(false);
//   const dispatch = useDispatch();

//   const handleFileChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const handleUploadToS3 = async (file) => {
//     // Implement the AWS S3 upload logic here.
//     // This function should return the S3 URL of the uploaded file.

//     // Example AWS S3 upload logic:
//     const s3Url = await yourAwsS3UploadFunction(file);
//     return s3Url;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setImageLoading(true);

//     try {
//       if (image) {
//         const s3Url = await handleUploadToS3(image);
//         const formData = {
//           // Include any other form data you need to send along with the image.
//           image: s3Url,
//         };

//         await dispatch(createUserProfileImage(formData);
//       }
//     } finally {
//       setImageLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button type="submit">Upload</button>
//       {imageLoading && <div>Loading...</div>}
//     </form>
//   );
// };

// export default UploadPicture;

// const UploadPicture = () => {
//     const [image, setImage] = useState(null);
//     const [imageLoading, setImageLoading] = useState(false);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("image", image);
//         // aws uploads can be a bit slow—displaying
//         // some sort of loading message is a good idea
//         setImageLoading(true);
//         await dispatch(createPost(formData));
//     }
//     // ...
// }
