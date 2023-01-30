import React from 'react'
import "../styles/ImagePage.css"
import { Link } from 'react-router-dom'
function ImageGenerationPage() {
  return (
    <div className="App">
      <div className='sidebar'>
        <Link to="/">Hello</Link>
      </div>
      <div className='responsebox'></div>
      <div className='inputbox'></div>
    </div>
  )
}

export default ImageGenerationPage