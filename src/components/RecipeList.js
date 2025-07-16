import React, { useEffect, useState } from 'react';
import { Grid, Typography, Grow } from '@mui/material';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger the animation when recipes change
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, [recipes]);

  if (recipes.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
        No recipes found. Try adding some ingredients!
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {recipes.map((recipe, index) => (
        <Grow 
          key={recipe.uri || index} 
          in={show} 
          style={{ transformOrigin: '0 0 0' }}
          {...(show ? { timeout: Math.min(1000, 200 + (index * 100)) } : {})}
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <RecipeCard recipe={recipe} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
};

export default RecipeList;
