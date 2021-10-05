/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Test } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addTodo
// ====================================================

export interface addTodo_addTodo {
  __typename: "TestResponse";
  text: string;
  body: string;
}

export interface addTodo {
  /**
   * Test Resolver Delete Later
   */
  addTodo: addTodo_addTodo;
}

export interface addTodoVariables {
  datas: Test;
}
