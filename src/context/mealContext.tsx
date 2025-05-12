import React, { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import { mealReducer } from "../reducers/mealReducer";
import { startFetchCategories } from "../actions/mealsActions";
import { MealState, MealContextType } from "../utils/types";

const initialState: MealState = {
    categories: [],
    categoryLoading: false,
    categoryError: false,
    categoryMeals: [],
    categoryMealsLoading: false,
    categoryMealsError: false,
    meals: [],
    mealsLoading: false,
    mealsError: false,
    meal: [],
    mealLoading: false,
    mealError: false
};

const MealContext = createContext<MealContextType | undefined>(undefined);

interface MealProviderProps {
    children: ReactNode;
}

export const MealProvider: React.FC<MealProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(mealReducer, initialState);

    useEffect(() => {
        startFetchCategories(dispatch);
    }, []);

    const contextValue: MealContextType = {
        ...state,
        dispatch,
        startFetchCategories
    };

    return (
        <MealContext.Provider value={contextValue}>
            {children}
        </MealContext.Provider>
    );
};

export const useMealContext = (): MealContextType => {
    const context = useContext(MealContext);
    if (context === undefined) {
        throw new Error('useMealContext must be used within a MealProvider');
    }
    return context;
};