import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Button, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Link from '@mui/material/Link';

const RecipeCard = ({ recipe }) => {
  // Format cooking time
  const formatTime = (minutes) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();
  };

  // Calculate servings
  const servings = recipe.yield || 1;
  const caloriesPerServing = Math.round(recipe.calories / servings);

  return (
    <Card className="recipe-card">
      <CardMedia
        component="img"
        height="200"
        image={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={recipe.label}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {recipe.label}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">
              {formatTime(recipe.totalTime)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <RestaurantIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">
              {servings} {servings === 1 ? 'serving' : 'servings'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Calories: {caloriesPerServing} kcal/serving
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Source: {recipe.source || 'Unknown'}
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            component="a" 
            href={recipe.url} 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ mt: 1 }}
          >
            View Recipe
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
