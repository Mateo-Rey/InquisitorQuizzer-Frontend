import React, { useState, useEffect } from "react";
import CopyToClipBoard from "react-copy-to-clipboard";
import "../styles/ImagePage.css";
import axios from "axios";
import { Link } from "react-router-dom";
function ImageGenerationPage() {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState(2);
  const [images, setImages] = useState([]);
  const [shortenedLinks, setShortenedLinks] = useState([]);
  console.log(shortenedLinks);
  useEffect(() => {
    images?.map(async (image, i) => {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${image.url}`
      );
      let data = {};
      data = response.data.result.full_short_link;
      setShortenedLinks([...shortenedLinks, data]);
    });
  }, [images]);
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
    console.log(data);
    setImages(data.images);
  };
  return (
    <div className="App">
      <div className="sidebar">
        <Link to="/">Text-Completion</Link>
        <div className="box">
          <p>
            This page allows you to be as specific as possible when generating
            images as the AI's powerful engine can process highly complex
            prompts
          </p>
          <label>Amount of Images</label>
          <input
            className=""
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="hero">
        <div className="responsebox">
          {images &&
            images?.map((image, i) => {
              const reader = new FileReader();
              console.log(reader.readAsBinaryString(image.url));
              return (
                <>
                  {" "}
                  <CopyToClipBoard text={shortenedLinks[i]}>
                    <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
                      Copy URL to Clipboard
                    </button>
                  </CopyToClipBoard>
                  <label>URL</label>{" "}
                  <p>{shortenedLinks && shortenedLinks[i]}</p>
                  <img id={`image${i}`} src={image.url} key={i} />
                </>
              );
            })}
        </div>
        <div className="inputbox">
          <form onSubmit={handleSubmit}>
            <input
              className="inputarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerationPage;
