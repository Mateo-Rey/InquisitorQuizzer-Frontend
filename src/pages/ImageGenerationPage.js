import React, { useState } from "react";
import "../styles/ImagePage.css";
import { Link } from "react-router-dom";
function ImageGenerationPage() {
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState(2);
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3080/image-generation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount),
        prompt: input,
      }),
    });
    const data = await response.json();
    setImages(data.images);
  };
  return (
    <div className="App">
      <div className="sidebar">
        <Link to="/">Text-Completion</Link>
        <input
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="responsebox">
        {images && images?.map((image, i) =>{  return (<img src={image.url}  key={i} />)})}
      </div>
      <div className="inputbox">
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default ImageGenerationPage;
