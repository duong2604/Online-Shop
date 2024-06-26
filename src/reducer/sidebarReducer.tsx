/* eslint-disable @typescript-eslint/no-explicit-any */
const sidebarReducer = (state: any, action: any) => {
    if (action.type === "TOGGLE_SIDEBAR") {
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };
  
  export default sidebarReducer;
  