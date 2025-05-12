import axios from "../api/axios";
import {
    FETCH_CATEGORY_BEGIN,
    FETCH_CATEGORY_ERROR,
    FETCH_CATEGORY_MEALS_BEGIN,
    FETCH_CATEGORY_MEALS_ERROR,
    FETCH_CATEGORY_MEALS_SUCCESS,
    FETCH_CATEGORY_SUCCESS,
    FETCH_MEALS_BEGIN,
    FETCH_MEALS_ERROR,
    FETCH_MEALS_SUCCESS,
    FETCH_SINGLE_MEAL_BEGIN,
    FETCH_SINGLE_MEAL_ERROR,
    FETCH_SINGLE_MEAL_SUCCESS
} from "./actions";
import { CATEGORIES_URL, MEAL_CATEGORIES_URL, MEAL_SINGLE_URL, SEARCH_URL } from "../utils/constants";
import { MealDispatch, CategoryResponse, MealResponse } from "../utils/types";

export const startFetchCategories = async(dispatch: MealDispatch): Promise<void> => {
    try {
        dispatch({ type: FETCH_CATEGORY_BEGIN });
        const response = await axios.get<CategoryResponse>(`${CATEGORIES_URL}`);
        dispatch({ type: FETCH_CATEGORY_SUCCESS, payload: response.data.categories });
    } catch(error) {
        dispatch({ type: FETCH_CATEGORY_ERROR, payload: error instanceof Error ? error.message : 'Unknown error' });
    }
}

export const startFetchSingleMeal = async(dispatch: MealDispatch, id: string): Promise<void> => {
    try {
        dispatch({ type: FETCH_SINGLE_MEAL_BEGIN });
        const response = await axios.get<MealResponse>(`${MEAL_SINGLE_URL}${id}`);
        dispatch({ type: FETCH_SINGLE_MEAL_SUCCESS, payload: response.data.meals });
    } catch(error) {
        dispatch({ type: FETCH_SINGLE_MEAL_ERROR, payload: error instanceof Error ? error.message : 'Unknown error' });
    }
}

export const startFetchMealByCategory = async(dispatch: MealDispatch, category: string): Promise<void> => {
    try {
        dispatch({ type: FETCH_CATEGORY_MEALS_BEGIN });
        const response = await axios.get<MealResponse>(`${MEAL_CATEGORIES_URL}${category}`);
        dispatch({ type: FETCH_CATEGORY_MEALS_SUCCESS, payload: response.data.meals })
    } catch(error) {
        dispatch({ type: FETCH_CATEGORY_MEALS_ERROR, payload: error instanceof Error ? error.message : 'Unknown error' });
    }
}

export const startFetchMealsBySearch = async(dispatch: MealDispatch, searchTerm: string): Promise<void> => {
    try {
        dispatch({ type: FETCH_MEALS_BEGIN });
        const response = await axios.get<MealResponse>(`${SEARCH_URL}${searchTerm}`);
        dispatch({ type: FETCH_MEALS_SUCCESS, payload: response.data.meals });
    } catch(error) {
        dispatch({ type: FETCH_MEALS_ERROR, payload: error instanceof Error ? error.message : 'Unknown error' });
    }
}