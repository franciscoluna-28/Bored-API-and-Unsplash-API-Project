import { boredAPITypesOfType } from "./boredAPItypesOfTypes";

// Bored API types
export type Type = typeof boredAPITypesOfType[number];
export type Accessibility = "" | number; 

//  TODO We need to make validations for the type of 
// Accessibility since returns a value between 0 and 1

// Intefaces
interface Activity {
  participants: number;
  activity: string;
  type: Type;
  price: number;
  link: string;
  key: string;
  accessibility: Accessibility;
}
