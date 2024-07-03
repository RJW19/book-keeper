"use client";

import React from 'react';
import { useState } from 'react';
import { Inter } from "next/font/google";
import NavBar from '../components/NavBar'

const inter = Inter({ subsets: ["latin"] });

// User Profile Component
const UserProfile = () => {
  // Dummy user data
  const [user, setUser] = useState({
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
      avatar: "https://via.placeholder.com/150"
  });
  

  return (
    <main className="profile">
      <NavBar/>
      <h1>User Profile</h1>
      <p>This is a user profile page.</p>
    </main>
  );
   
};

export default UserProfile;