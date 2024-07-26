import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../utils/firebase";

// Add saved item
export const saveItemToFirestore = async (userId, item) => {
  await setDoc(doc(db, "users", userId, "savedItems", item.id), item);
};

// Remove saved item
export const removeItemFromFirestore = async (userId, itemId) => {
  await deleteDoc(doc(db, "users", userId, "savedItems", itemId));
};

// Fetch saved items
export const fetchSavedItems = async (userId) => {
  const querySnapshot = await getDocs(
    collection(db, "users", userId, "savedItems")
  );
  const savedItems = querySnapshot.docs.map((doc) => doc.data());
  return savedItems;
};
