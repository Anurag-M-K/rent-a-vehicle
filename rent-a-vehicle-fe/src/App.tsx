import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import {
  WrappedRadio,
  WrappedTextInput,
} from "./components/WrappidInputs";
import { validation_required } from "./components/validations";

type IFormData = {
  first_name: string;
  last_name: string;
  number_of_wheels: number;
};

function App() {
  const [submitValues, setSubmitValues] = useState<IFormData[]>([]);

  const onSubmit = (values: IFormData) => {
    setSubmitValues([...submitValues, values]);
    console.log("values ",values)
  };

  const number_of_wheels_options = [
    { value: "2", label: "2" },
    { value: "4", label: "4" },
  ];
  const renderForm = (index: number) => {
    switch (index) {
      case 0:
        return (
          <>
            <h1 className="text-3xl text-white font-semibold text-start mb-10">
              What's your name ?
            </h1>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
                  className="mx-10 md:mx-0 w-full md:w-2/5 m-auto p-8 border border-gray pt-8 shadow-lg rounded-3xl"
                >
                  <FormGroup>
                    <FormControl>
                      <Field
                        label="First Name"
                        validate={validation_required}
                        name="first_name"
                        component={WrappedTextInput}
                      />
                    </FormControl>
                    <FormControl>
                      <Field
                        label="Last Name"
                        validate={validation_required}
                        name="last_name"
                        component={WrappedTextInput}
                      />
                    </FormControl>
                    <div className="flex justify-center mt-5">
                      <Button
                        type="submit"
                        className="my-2"
                        variant="contained"
                        color="warning"
                      >
                        Next
                      </Button>
                    </div>
                  </FormGroup>
                </form>
              )}
            />
          </>
        );
      case 1:
        return (
          <>
            <h1 className="text-3xl text-white font-semibold text-start mb-10">
              Number of wheels ?
            </h1>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
                  className="mx-10 md:mx-0 w-full md:w-2/5 m-auto p-8 border border-gray pt-8 shadow-lg rounded-3xl"
                >
                  <FormGroup>
                    <FormControl>
                      {/* <InputLabel>Number of Wheels</InputLabel> */}
                      <div className="flex justify-center  text-white text-2xl font-semibold">

                      <Field
                        name="number_of_wheels"
                        options={number_of_wheels_options}
                        component={WrappedRadio}
                       />
                     
                        </div>
                    </FormControl>
                    <div className="flex justify-center  mt-5">
                      <Button
                        type="submit"
                        className="my-2"
                        variant="contained"
                        color="warning"
                      >
                        Next
                      </Button>
                    </div>
                  </FormGroup>
                </form>
              )}
            />
          </>
        );
      // Add more cases for additional forms
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://wallpapersmug.com/download/1920x1080/b5f0b3/bmw-squad-bike-and-cars.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex justify-center items-center h-screen"
    >
      <div className="w-screen flex flex-col items-center justify-center">
        {renderForm(submitValues.length)}
      </div>
    </div>
  );
}

export default App;
