import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/favSlice";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.fav.items); // Get favorites from Redux state

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedRecipe = { id: docSnap.id, ...docSnap.data() };
        setRecipe(fetchedRecipe);
      } else {
        console.log("No such document!");
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe) {
      // Check if the current recipe is in the favorites list
      const isFavorite = favorites.some((fav) => fav.id === recipe.id);
      setSaved(isFavorite);
    }
  }, [recipe, favorites]);

  const handleSaveToggle = () => {
    if (saved) {
      // Remove from favorites
      dispatch(removeItem(recipe.id));
    } else {
      // Add to favorites
      dispatch(addItem(recipe));
    }
    setSaved(!saved); // Toggle the saved state
  };

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
          {saved ? (
            <button
              onClick={handleSaveToggle}
              className="bg-orange-400 rounded-md p-2 m-2 text-white"
            >
              Unsave this recipe
            </button>
          ) : (
            <button
              onClick={handleSaveToggle}
              className="bg-orange-500 rounded-md p-2 m-2 text-white"
            >
              Save this recipe
            </button>
          )}
        </div>
        <img
          src={recipe.imgUrl}
          alt={recipe.name}
          className="h-64 mb-4 rounded-md"
        />
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded">
            Category: {recipe.category}
          </span>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-lg">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-lg mb-2">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
