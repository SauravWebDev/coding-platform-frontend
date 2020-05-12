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

export default function MetaData({ metaData, variableMap, onChange, onSave }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="caption">
          {"Problem Meta Data Configuration"}
        </Typography>
        <form className={classes.form} onSubmit={onSave}>
          <Divider variant="middle" />

          <Grid
            container
            spacing={3}
            style={{
              backgroundColor: "white",
              border: "1px solid #f1e5bc",
              borderRadius: "3px",
              marginBottom: "5px",
            }}
          >
            <Grid item xs={12}>
              <SingleSelect
                labelName={"No of Inputs"}
                name="no-of-inputs"
                selectedValue={metaData.noOfInputs}
                inputItems={{ 1: 1, 2: 2, 3: 3 }}
                onChange={onChange}
              />
            </Grid>

            {metaData.inputs.map((data, index) => {
              return (
                index < metaData.noOfInputs && (
                  <>
                    <Grid item xs={12}>
                      <TextInput
                        label={"Input Name "}
                        name={"input-name-" + index}
                        type="text"
                        required={true}
                        rows={1}
                        value={data.name}
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SingleSelect
                        labelName={"Input Type"}
                        name={"input-type-" + index}
                        selectedValue={data.type}
                        required={true}
                        inputItems={variableMap}
                        onChange={onChange}
                      />
                    </Grid>
                  </>
                )
              );
            })}
          </Grid>
          <Grid
            container
            spacing={3}
            style={{
              marginTop: "10px",
              backgroundColor: "white",
              border: "1px solid #f1e5bc",
              borderRadius: "3px",
            }}
          >
            <Divider variant="middle" />
            <Grid item xs={12}>
              <SingleSelect
                labelName={"Output Type"}
                name={"output-type"}
                selectedValue={String(metaData.outputType)}
                required={true}
                inputItems={variableMap}
                onChange={onChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <Button type="submit">{"Save"}</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

MetaData.propTypes = {
  metaData: PropTypes.object.isRequired,
  variableMap: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
