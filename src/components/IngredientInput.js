import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const IngredientInput = ({ onAddIngredient }) => {
  const [ingredient, setIngredient] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onAddIngredient(ingredient);
      setIngredient('');
      // Focus the input after adding
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  // Auto-focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        display: 'flex',
        gap: 2,
        width: '100%',
        maxWidth: 600,
        mx: 'auto'
      }}
    >
      <TextField
        inputRef={inputRef}
        label="Add an ingredient"
        variant="outlined"
        size="small"
        fullWidth
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="e.g., chicken, rice, tomatoes..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            borderRadius: 2,
          },
        }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        startIcon={<AddIcon />}
        sx={{
          minWidth: '100px',
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          boxShadow: '0 2px 10px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
          },
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default IngredientInput;
