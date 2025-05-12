import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MealDetailsPage.scss";
import CategoryList from '../../components/Category/CategoryList';
import MealSingle from "../../components/Meal/MealSingle";
import { useMealContext } from '../../context/mealContext';
import { startFetchSingleMeal } from '../../actions/mealsActions';
import Loader from '../../components/Loader/Loader';
import { Meal, DisplayMeal } from '../../utils/types';

const MealDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories, dispatch, meal, categoryLoading, mealLoading } = useMealContext();

  useEffect(() => {
    if (id) {
      startFetchSingleMeal(dispatch, id);
    }
  }, [id, dispatch]);

  // Prepare the meal details and ingredients for rendering
  const prepareMealDetails = (): DisplayMeal | null => {
    if (!meal || meal.length === 0) return null;

    const singleMealData = meal[0];
    
    // Extract ingredients and measures dynamically
    const ingredientsArr: string[] = [];
    const measuresArr: string[] = [];

    // Dynamically extract ingredients and measures
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}` as keyof Meal;
      const measureKey = `strMeasure${i}` as keyof Meal;

      const ingredient = singleMealData[ingredientKey];
      const measure = singleMealData[measureKey];

      if (ingredient && ingredient.trim() !== '') {
        ingredientsArr.push(ingredient);
        // Only add measure if it exists and has content
        measuresArr.push(measure && measure.trim() !== '' ? measure : '');
      }
    }

    return {
      id: singleMealData.idMeal,
      title: singleMealData.strMeal,
      category: singleMealData.strCategory,
      area: singleMealData.strArea,
      thumbnail: singleMealData.strMealThumb,
      instructions: singleMealData.strInstructions,
      source: singleMealData.strSource,
      tags: singleMealData.strTags,
      youtube: singleMealData.strYoutube,
      ingredients: ingredientsArr,
      measures: measuresArr
    };
  };

  const singleMeal = prepareMealDetails();

  return (
    <main className='main-content bg-whitesmoke'>
      {mealLoading ? (
        <Loader />
      ) : (
        singleMeal && <MealSingle meal={singleMeal} />
      )}
      
      {categoryLoading ? (
        <Loader />
      ) : (
        <CategoryList categories={categories} />
      )}
    </main>
  );
};

export default MealDetailsPage;