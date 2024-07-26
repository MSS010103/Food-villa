import React, { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import uploadImgToCloudinary from "../utils/cloudinary";
import imageCompression from "browser-image-compression";

const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    let uploadedImageUrl = "";
    if (image) {
      try {
        const compressedImage = await imageCompression(image, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        const data = await uploadImgToCloudinary(compressedImage);
        if (data && data.url) {
          uploadedImageUrl = data.url;
          setImgUrl(data.url);
          console.log("Image uploaded successfully:", data.url);
        } else {
          console.error("No URL returned from Cloudinary");
          setLoading(false); // End loading on error
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false); // End loading on error
        return;
      }
    }

    await addDoc(collection(db, "recipes"), {
      name,
      category,
      ingredients,
      instructions,
      imgUrl: uploadedImageUrl,
    });

    setLoading(false); // End loading
    setName("");
    setCategory("");
    setIngredients([""]);
    setInstructions([""]);
    setImgUrl("");
    setImage(null);

    navigate("/");
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addInstructionField = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstructionField = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Create Your Recipe
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Recipe Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                className="ml-2 p-2 bg-red-500 text-white rounded-md"
                onClick={() => removeIngredientField(index)}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 p-2 bg-green-500 text-white rounded-md"
            onClick={addIngredientField}
          >
            + Add Ingredient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instructions
          </label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-center mt-2">
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                className="ml-2 p-2 bg-red-500 text-white rounded-md"
                onClick={() => removeInstructionField(index)}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 p-2 bg-green-500 text-white rounded-md"
            onClick={addInstructionField}
          >
            + Add Instruction
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Recipe Image
          </label>
          <input
            type="file"
            className="mt-1 block w-full text-sm text-gray-500"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {loading ? (
          <div className="w-full text-center py-2">
            <span>Loading...</span>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md"
          >
            Submit Recipe
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateRecipe;
