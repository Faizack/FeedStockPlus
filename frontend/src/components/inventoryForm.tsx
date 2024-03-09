import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { FeedStockFormData } from "../types/feedStock";

const initialState = {
  title: "",
  type: "",
  originalSupplier: "",
  country: "",
  description: "",
  document: null,
  video: null,
};

const FeedStockForm = () => {
  const [formData, setFormData] = useState<FeedStockFormData>(initialState);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };


  const handleSaveDraft = () => {
    // Implement logic to save the form data as a draft
    console.log("Form saved as draft");
    toast.success("Draft saved successfully");
  };

  const handlePublish =  (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form validation
    for (const key in formData) {
      if (formData[key as keyof FeedStockFormData] === "") {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }
    console.log(formData);
    setFormData(initialState);
    toast.success("Form submitted successfully");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form validation
    for (const key in formData) {
      if (formData[key as keyof FeedStockFormData] === "") {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }
    console.log(formData);
    setFormData(initialState);
    toast.success("Form submitted successfully");
  };

  return (
    <div className="inventoryForm">
      <form onSubmit={handleSubmit}>
        <div className="newFeedStock">
          <h2>FeedStock New </h2>

          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
            </select>
          </label>
          <label>
            Are you the original supplier?
            <select
              name="originalSupplier"
              value={formData.originalSupplier}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label>
            Country:
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              <option value="country1">Country 1</option>
              <option value="country2">Country 2</option>
            </select>
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="document">
          <h2>Document</h2>
          <label>
            Document Upload:
            <input type="file" name="document" onChange={handleFileChange} />
          </label>
          <label>
            Video Upload:
            <input type="file" name="video" onChange={handleFileChange} />
          </label>
        </div>
      </form>
      <div className="btn">
        <button onClick={handleSaveDraft}>Save Draft </button>
        <button onClick={handlePublish} type="submit">Publish FeedStock </button>
      </div>
    </div>
  );
};

export default FeedStockForm;
