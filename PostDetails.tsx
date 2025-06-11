import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Post } from './post';

import { useParams, useNavigate } from 'react-router-dom';

import {

  Container, Typography, CircularProgress,

  Paper, Box, Button

} from '@mui/material';

const PostDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)

      .then(response => {

        setPost(response.data);

        setLoading(false);

      })

      .catch(error => {

        console.error('Error fetching post:', error);

        setLoading(false);

      });

  }, [id]);

  if (loading) {

    return (
<Box display="flex" justifyContent="center" mt={6}>
<CircularProgress />
</Box>

    );

  }

  if (!post) {

    return (
<Container maxWidth="sm" sx={{ mt: 6 }}>
<Typography variant="h6" color="error">Post not found.</Typography>
</Container>

    );

  }

  return (
<Container maxWidth="sm" sx={{ mt: 6 }}>
<Paper elevation={4} sx={{ p: 4 }}>
<Typography variant="h4" color="primary" gutterBottom>

          Post Details
</Typography>
<Box sx={{ mb: 2 }}>
<Typography variant="body1"><strong>ID:</strong> {post.id}</Typography>
</Box>
<Box sx={{ mb: 2 }}>
<Typography variant="body1"><strong>Title:</strong> {post.title}</Typography>
</Box>
<Box sx={{ mb: 2 }}>
<Typography variant="body1"><strong>Body:</strong> {post.body}</Typography>
</Box>
<Button variant="outlined" onClick={() => navigate(-1)}>⬅ Back</Button>
</Paper>
</Container>

  );

};

export default PostDetails;
 