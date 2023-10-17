import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormModal from "../loginFormModal";
import OpenModalButton from "../openModalButton";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();
  const [image, setImage] = useState(null); // State for the uploaded image
  const [imageLoading, setImageLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

//   const handleUploadToS3 = async (file) => {
// 	try {
// 	  const formData = new FormData();
// 	  formData.append('image', file);
// 	  console.log('HANDLE UPLOAD TO S3 FORMDATA!!!1 ', formData)
// 	  console.log('HANDLE UPLOAD TO S3 FILE!!!1 ', file)
// 	  const response = await fetch('/api/images', {
// 		method: 'POST',
// 		body: formData,
// 	  });
// 	  console.log('API/IMAGES RESPONSE FRONTEND-------', response)

// 	  if (response.ok) {
// 		const data = await response.json();
// 		if (data.hasOwnProperty('url')) {
// 		  console.log('RETURN URL FROM s3 BUCKET!!!! ', data.url);
// 		  return data.url;
// 		} else {
// 		  throw new Error('Image upload response does not contain URL');
// 		}
// 	  } else {
// 		throw new Error('File upload failed');
// 	  }
// 	} catch (error) {
// 	  console.error('Error:', error);
// 	  throw error;
// 	}
//   };

const handleUploadToS3 = async (file) => {
	try {
		const formData = new FormData();
		formData.append('image', file); // Use 'image' as the key for the file
		const response = await fetch('/api/images', {
		  method: 'POST',
		  body: formData,
		});
	  console.log('frontend FILE!!! ', file)

	  if (response.ok) {
		const data = await response.json();
		console.log('RETURN URL FROM s3 BUCKET!!!! ', data.url);
		console.log('RETURN DATA FROM s3 BUCKET!!!! ', data);
		if (data.hasOwnProperty('url')) {
		  console.log('RETURN URL FROM s3 BUCKET!!!! ', data.url);
		  return data.url;
		} else {
		  throw new Error('Image upload response does not contain URL');
		}
	  } else {
		throw new Error('File upload failed');
	  }
	} catch (error) {
	  console.error('Error:', error);
	  throw error;
	}
  };


  const handleSubmit = async (e) => {
	e.preventDefault();
	let s3Url = '';
	try {
	  if (image) {
		s3Url = await handleUploadToS3(image);
	  }

	  if (password === confirmPassword) {
		const data = await dispatch(
		  signUp(username, email, password, displayName, s3Url)
		);
		if (data) {
		  setErrors(data);
		} else {
		  history.push("/servers");
		  closeModal();
		}
	  } else {
		setErrors([
		  "Confirm Password field must be the same as the Password field",
		]);
	  }
	} catch (error) {
	  // Handle any errors that may occur during the image upload or sign-up process.
	  console.error("Error:", error);
	  // You can also set an error state here if needed.
	}
  };


  return (
    <>
      <div className="sign-up-container">
        <h1>Create an account</h1>
        <div className="sign-up-form-container">
          <form onSubmit={handleSubmit}>
            <div>
              {errors.map((error, idx) => (
                <li className="errors" key={idx}>
                  {error}
                </li>
              ))}
            </div>
            <div>
              <label>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>DISPLAY NAME</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Upload Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <button className="sign-up-button" type="submit">
              Sign Up
            </button>
            {imageLoading && <div>Loading...</div>}
          </form>
          <h6>By registering, you agree to get hacked by the Guuntag clan</h6>
        </div>
        <OpenModalButton
          buttonText="Already have an account?"
          modalComponent={<LoginFormModal />}
        />
      </div>
    </>
  );
}

export default SignupFormModal;
