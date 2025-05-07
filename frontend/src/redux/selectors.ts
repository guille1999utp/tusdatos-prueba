import type { RootState } from "./store";

export const selectSidebarOpenState = (state: RootState) =>
  state.sidebar.isOpen || (state.sidebar.settings.isHoverOpen && state.sidebar.isHover);
