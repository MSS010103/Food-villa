import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { RecipeCard } from "./RecipeCard";

const RecipesBody = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
      setFilteredRecipes(recipesData);
    };

    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchText(searchQuery);
    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchQuery) ||
        recipe.category.toLowerCase().includes(searchQuery) ||
        (Array.isArray(recipe.ingredients) &&
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchQuery)
          ))
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Recipe Collection</h1>
        <Link to="/create-recipe">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Recipe
          </button>
        </Link>
      </header>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          className="p-2 w-full md:w-1/2 lg:w-1/3 border-black border-2 rounded-md"
          placeholder="Search recipes by name, category, or ingredient"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
              <RecipeCard {...recipe} />
            </Link>
          ))
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};

export default RecipesBody;
