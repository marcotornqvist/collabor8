import { Violation } from "generated/graphql";
import * as Yup from "yup";

export const violation = Yup.mixed<Violation>().oneOf(Object.values(Violation));
