import React from "react";
import PropTypes from "prop-types";

// Material UI Componenets
import {
  Divider,
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  Tooltip
} from "@material-ui/core";

import Button from "../common/Button";
import MultiSelect from "../common/MultiSelect";
import SingleSelect from "../common/SingleSelect";

// MAterial UI icons
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import TextInput from "../common/InputText";

import { validString } from "../../util/util";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Form({
  onChange,
  onSave,
  errors,
  isCreate,
  title,
  examples,
  description,
  addExample,
  deleteExample,
  ...props
}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isCreate ? "Create New Problem" : "update Problem"}
        </Typography>
        <form className={classes.form} onSubmit={onSave}>
          <Grid container spacing={3} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={6}>
              <TextInput
                id="createUpdate-title"
                label="Title"
                name="title"
                type="text"
                required={true}
                error={validString(errors.title)}
                onChange={onChange}
                autoFocus={true}
                multiline={true}
                rows={4}
                value={title}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                id="createUpdate-description"
                label="Description"
                name="description"
                type="text"
                required={true}
                error={validString(errors.description)}
                onChange={onChange}
                multiline={true}
                rows={6}
                value={description}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={12}>
              <Divider variant="middle" />
              <Typography
                style={{ display: "inline-block" }}
                component="h1"
                variant="caption"
              >
                Provide Examples
              </Typography>
              <Tooltip title="click to Add more Examples">
                <AddIcon style={{ float: "right" }} onClick={addExample} />
              </Tooltip>
            </Grid>
            {examples.map((example, index) => (
              <Grid container key={index}>
                <Grid item xs={3} style={{ padding: "5px" }}>
                  <TextInput
                    id="createUpdate-exampleInput-1"
                    label="Input"
                    name={"example_input_" + index}
                    type="text"
                    required={true}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                    value={example.input}
                  />
                  <Tooltip
                    title="click to Delete above Example"
                    onClick={() => deleteExample(index)}
                  >
                    <DeleteIcon />
                  </Tooltip>
                </Grid>
                <Grid item xs={3} style={{ padding: "5px" }}>
                  <TextInput
                    type="text"
                    id="createUpdate-output"
                    label="Output"
                    name={"example_output_" + index}
                    required={true}
                    error={errors.output}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                    value={example.output}
                  />
                </Grid>
                <Grid item xs={6} style={{ padding: "5px" }}>
                  <TextInput
                    id="createUpdate-explanation"
                    label="explanation"
                    name={"example_explanation_" + index}
                    type="text"
                    required={true}
                    error={errors.explanation}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                    value={example.explanation}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={3} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={12}>
              <Divider variant="middle" />
              <Typography
                style={{ display: "inline-block" }}
                component="h1"
                variant="caption"
              >
                Provide Notes
              </Typography>
              <Tooltip title="click to Add more Notes">
                <AddIcon style={{ float: "right" }} onClick={props.addNote} />
              </Tooltip>
            </Grid>
            {props.notes.map((note, index) => (
              <Grid container key={index}>
                <Grid item xs={12} style={{ padding: "5px" }}>
                  <TextInput
                    id={"note_" + index}
                    label="Note"
                    name={"note_" + index}
                    type="text"
                    required={false}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                    value={note}
                  />
                  <Tooltip
                    title="click to Delete above Note"
                    onClick={() => props.deleteNote(index)}
                  >
                    <DeleteIcon />
                  </Tooltip>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Divider variant="middle" />
          <Grid container spacing={3} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={6}>
              <MultiSelect
                labelName={"Tags"}
                selectedItem={props.selectedTag}
                inputItems={props.tag}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <SingleSelect
                labelName={props.difficultyLebel}
                selectedValue={props.selectedDifficulty}
                inputItems={props.difficulty}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid container spacing={2} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={12}>
              <MultiSelect
                labelName={props.langLebel}
                selectedItem={props.selectedLang}
                inputItems={props.lang}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid item xs={12} style={{ margin: "auto", padding: "10px" }}>
            <Button type="submit">
              {isCreate ? <>Create</> : <>update</>}
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isCreate: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  examples: PropTypes.array.isRequired,
  addExample: PropTypes.func.isRequired,
  deleteExample: PropTypes.func.isRequired,
  selectedTag: PropTypes.array.isRequired,
  tag: PropTypes.object.isRequired,
  difficulty: PropTypes.object.isRequired,
  notes: PropTypes.array,
  deleteNote: PropTypes.func.isRequired
};
