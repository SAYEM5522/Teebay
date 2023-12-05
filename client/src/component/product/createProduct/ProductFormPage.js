// components/ProductFormPage.js
import React, { useState } from 'react';

const ProductFormPage = ({ title, inputType, onNext, onPrev, onSubmit, content }) => {
  const [formData, setFormData] = useState('');

  const handleChange = (value) => {
    setFormData(value);
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div>
      <h1>{title}</h1>
      {inputType === 'textarea'&&(
        <textarea
          placeholder={`Enter ${title.toLowerCase()}`}
          value={formData}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) 
      
      (
        <input
          type="text"
          placeholder={`Enter ${title.toLowerCase()}`}
          value={formData}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
      {onPrev && <button onClick={onPrev}>Previous</button>}
      {onNext && <button onClick={handleNext}>Next</button>}
      {onSubmit && <button onClick={onSubmit}>Submit</button>}
    </div>
  );
};

export default ProductFormPage;
