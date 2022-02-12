import { ChangeEvent } from "react";

export type chevronRotate =
  | "rotate(0deg)"
  | "rotate(90deg)"
  | "rotate(180deg)"
  | "rotate(270deg)";
  
export type FormikHandleChange = {
  (e: ChangeEvent<any>): void;
  <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
    ? void
    : (e: string | ChangeEvent<any>) => void;
};