import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./CategoryPage.scss";
import { useMealContext } from '../../context/mealContext';
import MealList from '../../components/Meal/MealList';
import { startFetchMealByCategory } from '../../actions/mealsActions';
import { Category, Meal } from '../../utils/types';

const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { categoryMeals, dispatch, categories } = useMealContext();
  
  // Find category description
  const catDescription = React.useMemo(() => {
    if (!categories || !name) return '';
    
    const matchedCategory = categories.find(
      (category: Category) => category.strCategory === name
    );
    
    return matchedCategory?.strCategoryDescription || '';
  }, [categories, name]);

  useEffect(() => {
    if (name) {
      startFetchMealByCategory(dispatch, name);
    }
  }, [name, dispatch]);

  // Ensure strArea is always a string
  const processedMeals = categoryMeals.map(meal => ({
    ...meal,
    strArea: meal.strArea || ''
  }));

  return (
    <main className='main-content py-5'>
      <div className='container'>
        <div className='cat-description px-4 py-4'>
          <h2 className='text-orange fw-8'>{name}</h2>
          <p className='fs-18 op-07'>{catDescription}</p>
        </div>
      </div>
      {processedMeals.length > 0 && (
        <MealList meals={processedMeals} />
      )}
    </main>
  );
}

export default CategoryPage;