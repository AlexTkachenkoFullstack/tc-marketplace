import { ButtonVisibilityState } from "types/ButtonVisibilityState";

export function getInitialButtonVisibility(isVisible: boolean) {
    const initialBlocksVisibility: ButtonVisibilityState = {};
    for (let i = 1; i <= 5; i++) {
      initialBlocksVisibility[`block${i}`] = isVisible;
    }
    return initialBlocksVisibility;
  }