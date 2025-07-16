# recipe-finder-app
RecipeFinder — A simple app to search and discover recipes based on ingredients you already have at home. Powered by TheMealDB API.
=======
# Recipe Finder App

A simple and attractive Recipe Finder application built with React that helps users find recipes based on the ingredients they have at home.

## Features

- Add ingredients you have at home
- View matching recipes with images
- See detailed ingredient lists and nutritional information
- Clean and responsive design
- Real-time recipe search as you type

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Get your API credentials:
   - Go to [TheMealDB Portal](https://developer.edamam.com/](https://www.themealdb.com/api.php))
   - Sign up and create , you don't need any api key , you can fetch directly .


4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to Use

1. Type an ingredient you have in the input field (e.g., "chicken", "tomatoes", "rice")
2. Press Enter or click the "Add" button to add it to your ingredients list
3. The app will automatically search for recipes containing those ingredients
4. Browse through the recipes and click on any to see more details
5. Remove ingredients by clicking on them to refine your search

## Technologies Used

- React
- Material-UI (MUI)
- MealDB Recipe Search API
- React Hooks
- CSS3

## Interview Talking Points

1. **Component Structure**:
   - `App`: Main container component that manages state
   - `IngredientInput`: Handles user input for ingredients
   - `RecipeList`: Displays a grid of recipe cards
   - `RecipeCard`: Individual recipe display component

2. **State Management**:
   - Uses React's useState and useEffect hooks for state management
   - Manages ingredients list and recipes data

3. **API Integration**:
   - Fetches recipes from TheMealDB API
   - Implements debouncing to prevent excessive API calls

4. **UI/UX**:
   - Responsive design using Material-UI Grid
   - Loading states and error handling
   - Interactive ingredient tags

## Future Improvements

- Add recipe details modal
- Implement user authentication to save favorite recipes
- Add filters (meal type, cuisine, diet restrictions)
- Include cooking time and difficulty level
- Add pagination for search results
