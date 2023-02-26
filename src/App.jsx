import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import './App.css'
import Picture from './components/Picture'
import { Resizer } from 'react-image-file-resizer'

function App() {
  const [file,setFile] = useState();
  const [image,setImage] = useState();

  useEffect(()=>
  {
    const getImage = ()=>{
      const img = new Image()
      img.src = URL.createObjectURL(file);
      img.onload = ()=>{
    
      setImage({
        url:img.src,
        width:img.width,
        height:img.height
      });
    };
     };
    
     file && getImage()
      
  },[file]);

  //console.log(image)
  return (
    
    <div >
      <Navbar/>
      {image ? (<Picture image={image}/>) :(
      <div className="newPostCard">
        <div className="addPost">
          <img
          src = "https://images.pexels.com/photos/3337209/pexels-photo-3337209.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className='avatar'/>
          <div className="postForm">
            <input type='text'
            placeholder='Upload a picture'
            className='postInput'/>
             
             <label htmlFor="file">
              <img id = "icon" src ="https://img.icons8.com/3d-fluency/512/stack-of-photos.png"/>
             </label>
            <input 
            onChange ={(e) => setFile(e.target.files[0])}
            id="file"  style={{display:"none"}} type="file"/>
    
          </div>
        </div>
      </div>
      )}
    </div>
  )
  }

export default App
