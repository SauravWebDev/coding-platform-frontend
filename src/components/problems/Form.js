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
} from "@material-ui/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "../common/Button";
import MultiSelect from "../common/MultiSelect";
import SingleSelect from "../common/SingleSelect";

import TextInput from "../common/InputText";

import { validString } from "../../util/util";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form({ onChange, onSave, errors, ...props }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {"Problem Statement"}
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
                rows={1}
                value={props.problem.title}
              />
            </Grid>
            <Grid item xs={6}>
              <SingleSelect
                labelName={"Difficulty"}
                selectedValue={props.selectedDifficulty}
                inputItems={props.filters.difficulty}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Divider variant="middle" />

          <Grid container spacing={3} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={12}>
              Description
              <CKEditor
                editor={ClassicEditor}
                data={props.problem.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  props.updateHtml("description", data);
                }}
              />
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid container spacing={3} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={12}>
              Example
              <CKEditor
                editor={ClassicEditor}
                data={props.problem.example}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  props.updateHtml("example", data);
                }}
              />
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid container spacing={3} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={12}>
              Note
              <CKEditor
                editor={ClassicEditor}
                data={props.problem.note}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  props.updateHtml("note", data);
                }}
              />
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid container spacing={3} style={{ padding: "5px", margin: "5px" }}>
            <Grid item xs={6}>
              <MultiSelect
                labelName={"Tags"}
                selectedItem={props.selectedTagArray}
                inputItems={props.filters.tag}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <MultiSelect
                labelName={"Language"}
                selectedItem={props.selectedLangArray}
                inputItems={props.filters.lang}
                onChange={onChange}
              />
            </Grid>
          </Grid>

          <Divider variant="middle" />
          <Grid
            container
            spacing={3}
            style={{ margin: "auto", padding: "10px" }}
          >
            <Grid item xs={6}>
              <Button type="submit">{"Save"}</Button>
            </Grid>
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
  problem: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  selectedLangArray: PropTypes.array.isRequired,
  selectedTagArray: PropTypes.array.isRequired,
  selectedDifficulty: PropTypes.string,
  updateHtml: PropTypes.func.isRequired,
};
