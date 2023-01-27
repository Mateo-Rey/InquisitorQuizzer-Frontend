import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import CompletionPage from "./pages/CompletionPage.js";
import TextEditPage from './pages/TextEditPage.js';
import ImageGenerationPage from './pages/ImageGenerationPage.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompletionPage />} />
        <Route path="/text-edit" element={<TextEditPage/>}/>
        <Route path="/image-generation" element={<ImageGenerationPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
