import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import PostDetails from './PostDetails';
function App() {
 return (
<Router>
<Routes>
<Route path="/" element={<PostList />} />
<Route path="/post/:id" element={<PostDetails />} />
</Routes>
</Router>
 );
}
export default App;