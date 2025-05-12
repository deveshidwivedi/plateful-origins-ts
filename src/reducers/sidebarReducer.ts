
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions/actions";
import { SidebarState, Action } from "../utils/types"; // Update the path if the file exists elsewhere

const sidebarReducer = (state: SidebarState, action: Action<string>): SidebarState => {
    switch(action.type) {
        case OPEN_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: true
            };
        case CLOSE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: false
            };
        default: 
            return state;
    }
}

export default sidebarReducer;