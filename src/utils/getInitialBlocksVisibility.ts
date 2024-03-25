import { BlocksVisibilityState } from "types/BlocksVisibilityState";

export function getInitialBlocksVisibility(isVisible: boolean) {
    const initialBlocksVisibility: BlocksVisibilityState = {};
    for (let i = 1; i <= 25; i++) {
      initialBlocksVisibility[`block${i}`] = isVisible;
    }
    return initialBlocksVisibility;
  }
