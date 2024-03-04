import {useSelector} from 'react-redux';
import {useRef, useState,useEffect} from 'react';
import {getDownloadURL,getStorage,ref,uploadBytesResumable,} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile(){
  const fileRef=useRef(null);
  const {currentUser, loading, error}=useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  //firebase storage
  //allow read;
  //allow write: if
  //request.resource.size<2*1024*1024 &&
  //request.resource.contentType.matches('image/.*')
    
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
    
    
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
    
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
         method : 'Delete', 
      });
      const data = await res.json();
      if (data.success === false){
         dispatch(deleteUserFailure(data.message));
         return;
      }
      dispatch(deleteUserSuccess(data));
    }catch (error) {
     dispatch(deleteUserFailure(error.message))
    }
  }
  return(
    <div className='h-screen bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 flex items-center justify-center'>
        <h1 className='text-4xl text-center font-extrabold mb-6 text-indigo-700'> Profile</h1>
           
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <input onChange={(e) => setFile(e.target.files[0])}
            type="file" ref={fileRef} hidden accept='image/*'/>
          <img onClick={()=>fileRef.current.click()} src={formData.avatar||currentUser.avatar} alt="Profile Picture"

            className='rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-5'/>
          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-500'>
                Image Upload Error (Image Must Be Less Than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-purple-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-800'>Image successfully uploaded!</span>
            ) : (
              ''
            )}
          </p>

          <input type="text" placeholder='Username' defaultValue={currentUser.username} id='username'className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500' onChange={handleChange}/> 
          <input type="email" placeholder='Email' defaultValue={currentUser.username} id='email'className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500' onChange={handleChange}/>   
          <input type="password" placeholder='Password' id='password'className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500'/>  
          <button disabled={disabled} className='bg-indigo-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...': 'Update'}</button>           
        </form>
            
        <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-500 mt-3 text-center'>Delete Account</span>
          <span className='text-red-500 mt-3 text-center'>Sign out</span>
        </div>
        <p> className='text-red-700 mt-5' {error ? error : ''}</p>
        <p className='text-green-700 mt-5'>{updateSuccess ? 'Profile updated successfully!' : ''}</p>
      </div>
  )
}

