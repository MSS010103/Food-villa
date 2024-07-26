import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";

const SavedItems = () => {
  const favItems = useSelector((store) => store.fav.items);

  return (
    <div>
      <h1 className="font-bold text-3xl p-2 m-2">Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favItems.length > 0 ? (
          favItems.map((item) => (
            <Link key={item.id} to={"/recipe/" + item.id}>
              <RecipeCard {...item} />
            </Link>
          ))
        ) : (
          <div className="text-2xl m-16 "> No items saved</div>
        )}
      </div>
    </div>
  );
};

export default SavedItems;
