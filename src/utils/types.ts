export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  // Dynamically generated ingredients and measures (up to 20)
  [key: string]: string | undefined;
}

export interface DisplayMeal {
  id: string;
  title: string;
  category?: string;
  area?: string;
  thumbnail: string;
  instructions?: string;
  source?: string;
  tags?: string;
  youtube?: string;
  ingredients: string[];
  measures: string[];
}

// State interfaces
export interface MealState {
  categories: Category[];
  categoryLoading: boolean;
  categoryError: boolean;
  categoryMeals: Meal[];
  categoryMealsLoading: boolean;
  categoryMealsError: boolean;
  meals: Meal[];
  mealsLoading: boolean;
  mealsError: boolean;
  meal: Meal[];
  mealLoading: boolean;
  mealError: boolean;
}

export interface SidebarState {
  isSidebarOpen: boolean;
}

// Action types
export interface Action<T, P = any> {
  type: T;
  payload?: P;
}

// Dispatch function types
export type MealDispatch = React.Dispatch<Action<string, any>>;
export type SidebarDispatch = React.Dispatch<Action<string, never>>;

// Context value types
export interface MealContextType extends MealState {
  dispatch: MealDispatch;
  startFetchCategories: (dispatch: MealDispatch) => Promise<void>;
}

export interface SidebarContextType extends SidebarState {
  openSidebar: () => void;
  closeSidebar: () => void;
}

// API response types
export interface CategoryResponse {
  categories: Category[];
}

export interface MealResponse {
  meals: Meal[] | null;
}