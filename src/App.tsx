// App.tsx
import { StrictMode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./app/Navbar";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";

export default function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddPostForm />
                  <PostsList />
                </>
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StrictMode>
  );
}
