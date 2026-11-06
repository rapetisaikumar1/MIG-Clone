import type { ReactNode } from "react";
import { adminScreens } from "./admin";
import { formsScreens } from "./forms";
import { recordsScreens } from "./records";
import { records2Screens } from "./records-2";
import { requestsScreens } from "./requests";
import { suiteScreens } from "./suite";
import { workflowsScreens } from "./workflows";

/** Every recreated screen by id (ids match src/content/maplerecord/screens.ts). */
export const screenComponents: Record<string, () => ReactNode> = {
  ...suiteScreens,
  ...recordsScreens,
  ...records2Screens,
  ...requestsScreens,
  ...workflowsScreens,
  ...formsScreens,
  ...adminScreens,
};
