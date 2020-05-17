export const DEFAULT_PROB_DATA = {
  id: null,
  slug: "",
  title: "",
  description: "",
  examples: "",
  note: "",
  tag: {},
  language: {},
  code_template: [],
  sourceCode: {},
  selectedCode: "",
  status: 0,
};
export const FILTERS = {
  difficulty: {},
  lang: {},
  tag: {},
};
export const TEST_CASES = [
  {
    id: "",
    inputs: [],
    output: "",
    outputType: "",
    type: "",
    name: "",
  },
];

export const SELECTED_TEST_CASE = {
  id: null,
  type: "",
  input: JSON.stringify([]),
  output: "",
  name: "",
};

export const DEFAULT_INPUT = [];

export const VARIABLE_TYPE = {
  1: "int",
  2: "string",
  3: "boolean",
  4: "array_integer",
  5: "array_string",
};

export const DEFAULT_META_DATA = {
  noOfInputs: 1,
  outputType: 1,
  inputs: [
    {
      name: "",
      type: "",
    },
  ],
};

export const TEST_CASE_TYPE = {
  1: "Default Case",
  2: "corner_case",
  3: "Normal",
  4: "Time Complexity",
};

export const STATUS = {
  0: "Inactive",
  1: "Active",
};
