import React, { createContext, useContext, useState } from "react";

interface UserContextProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  contact: string;
  setContact: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  localStorage.setItem("username", username);
  localStorage.setItem("address", address);
  localStorage.setItem("contact", contact);

  return (
    <Context.Provider
      value={{
        username,
        setUsername,
        showNotification,
        setShowNotification,
        image,
        setImage,
        address,
        setAddress,
        contact,
        setContact,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUser = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};