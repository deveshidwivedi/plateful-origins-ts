import React from 'react';
import "./HomePage.scss";
import { useMealContext } from '../../context/mealContext';
import Loader from "../../components/Loader/Loader";
import CategoryList from "../../components/Category/CategoryList";
import NotFound from "../../components/NotFound/NotFound";
import MealList from "../../components/Meal/MealList";
import { Category, Meal } from '../../utils/types';

const HomePage: React.FC = () => {
  const { categories, meals, categoryLoading, mealsLoading } = useMealContext();

  return (
    <main className='main-content'>
      {mealsLoading ? <Loader /> : meals === null ? <NotFound /> : meals?.length ? <MealList meals={meals} /> : null}
      {categoryLoading ? <Loader /> : <CategoryList categories={categories} />}
    </main>
  );
}

export default HomePage;
