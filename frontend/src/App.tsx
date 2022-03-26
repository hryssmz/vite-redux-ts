// App.tsx
import { StrictMode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./app/Navbar";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";

export default function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <>
                    <AddPostForm />
                    <PostsList />
                  </>
                }
              />
              <Route path="posts/:postId" element={<SinglePostPage />} />
              <Route path="editPost/:postId" element={<EditPostForm />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StrictMode>
  );
}
