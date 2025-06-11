import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Post } from './post';

import { useNavigate } from 'react-router-dom';

import {

  Box,

  Button,

  CircularProgress,

  Container,

  Typography,

  Paper,

  TableContainer,

  Table,

  TableHead,

  TableRow,

  TableCell,

  TableBody,

  useMediaQuery,

  useTheme

} from '@mui/material';

const PostList: React.FC = () => {

  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {

    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')

      .then(response => {

        setPosts(response.data);

        setLoading(false);

      })

      .catch(error => {

        console.error('Error fetching posts:', error);

        setLoading(false);

      });

  }, []);

  return (
<Container maxWidth="md" sx={{ mt: 6 }}>
<Paper elevation={3} sx={{ p: 3 }}>
<Typography variant="h4" gutterBottom color="primary">

          All Posts
</Typography>

        {loading ? (
<Box display="flex" justifyContent="center" mt={4}>
<CircularProgress />
</Box>

        ) : (

          isMobile ? (

            // Mobile-friendly card-like layout
<Box>

              {posts.map(post => (
<Paper

                  key={post.id}

                  sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
>
<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>

                    {post.title}
</Typography>
<Typography variant="body2" color="text.secondary">

                    {post.body}
</Typography>
<Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
<Button

                      variant="contained"

                      size="small"

                      onClick={() => navigate(`/post/${post.id}`)}
>

                      View Details
</Button>
</Box>
</Paper>

              ))}
</Box>

          ) : (

            // Table layout for desktop/tablet
<TableContainer component={Paper} sx={{ mt: 2 }}>
<Table sx={{ minWidth: 650 }}>
<TableHead>
<TableRow sx={{ backgroundColor: '#f5f5f5' }}>
<TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
<TableCell sx={{ fontWeight: 'bold' }}>Body</TableCell>
<TableCell />
</TableRow>
</TableHead>
<TableBody>

                  {posts.map(post => (
<TableRow key={post.id} hover>
<TableCell

                        sx={{

                          maxWidth: 200,

                          whiteSpace: 'nowrap',

                          overflow: 'hidden',

                          textOverflow: 'ellipsis'

                        }}
>

                        {post.title}
</TableCell>
<TableCell

                        sx={{

                          maxWidth: 400,

                          whiteSpace: 'nowrap',

                          overflow: 'hidden',

                          textOverflow: 'ellipsis'

                        }}
>

                        {post.body}
</TableCell>
<TableCell>
<Button

                          variant="contained"

                          size="small"

                          onClick={() => navigate(`/post/${post.id}`)}
>

                          View Details
</Button>
</TableCell>
</TableRow>

                  ))}
</TableBody>
</Table>
</TableContainer>

          )

        )}
</Paper>
</Container>

  );

};

export default PostList;
 