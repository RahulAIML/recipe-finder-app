import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  Box, 
  CssBaseline, 
  CircularProgress,
  Chip
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import './App.css';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addIngredient = (ingredient) => {
    const trimmedIngredient = ingredient.trim().toLowerCase();
    if (trimmedIngredient && !ingredients.includes(trimmedIngredient)) {
      setIngredients([...ingredients, trimmedIngredient]);
      setError(null);
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
    setError(null);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (ingredients.length === 0) {
        setRecipes([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        // Use the first ingredient for search (TheMealDB doesn't support multiple ingredients in search)
        const ingredient = ingredients[0];
        console.log('Searching for recipes with ingredient:', ingredient);
        
        // Search by ingredient
        const response = await fetch(`${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data?.meals?.length > 0) {
          // Fetch full details for each meal
          const mealDetails = await Promise.all(
            data.meals.slice(0, 12).map(meal => 
              fetch(`${API_BASE_URL}/lookup.php?i=${meal.idMeal}`).then(res => res.json())
            )
          );
          
          const formattedRecipes = mealDetails.map(detail => {
            const meal = detail.meals[0];
            // Extract ingredients and measures
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
              const ingredient = meal[`strIngredient${i}`];
              const measure = meal[`strMeasure${i}`];
              if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient}`.trim());
              }
            }
            
            return {
              id: meal.idMeal,
              label: meal.strMeal || 'Untitled Recipe',
              image: meal.strMealThumb || 'https://via.placeholder.com/300x200?text=No+Image',
              ingredientLines: ingredients,
              calories: 0, // TheMealDB doesn't provide calorie info
              totalTime: 0, // TheMealDB doesn't provide cooking time
              url: meal.strYoutube ? `https://www.youtube.com/watch?v=${meal.strYoutube.split('v=')[1]}` : '#',
              source: meal.strArea || 'Unknown Cuisine',
              instructions: meal.strInstructions || 'No instructions available',
              tags: meal.strTags ? meal.strTags.split(',') : []
            };
          });
          
          setRecipes(formattedRecipes);
        } else {
          setRecipes([]);
          setError('No recipes found. Try a different ingredient!');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError(`Error: ${error.message}. Please check your internet connection.`);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchRecipes();
    }, 500);

    return () => clearTimeout(timer);
  }, [ingredients]);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <RestaurantIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Recipe Finder
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Find Recipes with Your Ingredients
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Add the ingredients you have at home to discover delicious recipes!
          </Typography>
          
          <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
            <IngredientInput onAddIngredient={addIngredient} />
            
            {ingredients.length > 0 && (
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {ingredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    label={ingredient}
                    onDelete={() => removeIngredient(ingredient)}
                    color="primary"
                    variant="outlined"
                    sx={{ 
                      '&:hover': { 
                        bgcolor: 'primary.light',
                        color: 'white',
                      } 
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {error && (
          <Box sx={{ 
            bgcolor: 'error.light', 
            color: 'white', 
            p: 2, 
            borderRadius: 1,
            mb: 3,
            textAlign: 'center'
          }}>
            <Typography>{error}</Typography>
          </Box>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : ingredients.length > 0 ? (
          <Typography variant="h6" align="center" sx={{ my: 4, color: 'text.secondary' }}>
            No recipes found. Try different ingredients!
          </Typography>
        ) : (
          <Box sx={{ textAlign: 'center', my: 8 }}>
            <RestaurantIcon sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Add some ingredients to find recipes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try: chicken, rice, tomatoes, etc.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
