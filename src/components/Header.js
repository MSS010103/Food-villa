import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { setItems, setUserId } from "../utils/favSlice";
import { fetchSavedItems } from "./firebaseHelpers";

const Title = () => {
  return (
    <img
      className="h-24 md:h-28 p-2"
      alt="logo"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRq_LmiEG7PEV3p9MGjSYDxsn1BzvEy5fEdg&s"
    />
  );
};

const Header = () => {
  const [loggedIn, setisLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setisLoggedIn(true);
        const userId = user.uid;
        dispatch(setUserId(userId));
        fetchSavedItems(userId).then((items) => {
          dispatch(setItems(items));
        });
        navigate("/");
      } else {
        // Handle user sign-out or no user case
        setisLoggedIn(false);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const favItems = useSelector((store) => store.fav.items);
  console.log(favItems);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  if (!loggedIn) return null;

  return (
    <header className="bg-yellow-100 shadow-lg p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <Title />
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Link to="/" className="text-lg hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-lg hover:text-gray-400">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-lg hover:text-gray-400">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-lg hover:text-gray-400">
                Saved - {favItems.length} items
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleSignOut}
          className="mt-4 md:mt-0 bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
