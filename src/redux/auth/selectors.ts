import { RootState } from "redux/store";
export const isAuthUser = (state: RootState) => !!state.auth.token;
