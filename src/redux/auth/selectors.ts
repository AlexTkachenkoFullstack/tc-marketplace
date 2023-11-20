import { RootState } from "redux/store";
export const isAuthUser = (state: RootState) => !!state.auth.token;
export const getToken = (state: RootState) => state.auth.token;
