import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signedIn, setSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const isSignedIn = () => {
    setSignedIn(!signedIn);
  };
  const navigate = useNavigate();
  const auth = getAuth();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    setLoading(true);
    setErrorMessage(null);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) {
      setLoading(false);
      return;
    }

    if (!signedIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up successfully
        })
        .catch((error) => {
          console.error("Error signing up:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in successfully
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://i0.wp.com/houstonfoodfinder.com/wp-content/uploads/2021/09/maheshs_kitchen_spread.jpeg?fit=1200%2C800&ssl=1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "50px",
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-white w-full md:w-1/4 p-12 bg-black my-36 mx-auto rounded-md bg-opacity-80"
      >
        <h4 className="text-white text-3xl font-bold mb-6">
          Sign {signedIn ? "In" : "Up"}{" "}
        </h4>
        {!signedIn && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-2 my-4 bg-black border rounded-sm w-full"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-2 my-4 bg-black border rounded-sm w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 bg-black border rounded-sm w-full"
        />
        <p className="text-red-500 ">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="bg-red-600 rounded-md flex items-center justify-center text-white p-2 my-4 w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-t-4 border-t-red-600 border-gray-300 border-solid rounded-full animate-spin"></div>
          ) : (
            `Sign ${signedIn ? "In" : "Up"}`
          )}
        </button>
        <p onClick={isSignedIn} className="cursor-pointer">
          {signedIn
            ? "New to FoodVilla? Sign up now"
            : "Already have an account?Sign In"}{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
