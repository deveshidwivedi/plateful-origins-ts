import React, { createContext, useContext, useReducer, ReactNode } from "react";
import reducer from "../reducers/sidebarReducer";
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions/actions";
import { SidebarContextType, SidebarState } from "../utils/types";

const initialState: SidebarState = {
    isSidebarOpen: false
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openSidebar = (): void => {
        dispatch({ type: OPEN_SIDEBAR });
    };

    const closeSidebar = (): void => {
        dispatch({ type: CLOSE_SIDEBAR });
    };

    const contextValue: SidebarContextType = {
        ...state,
        openSidebar,
        closeSidebar
    };

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebarContext must be used within a SidebarProvider');
    }
    return context;
};