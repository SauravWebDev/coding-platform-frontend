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
