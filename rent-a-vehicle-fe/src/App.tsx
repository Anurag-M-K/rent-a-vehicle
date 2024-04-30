import React, { useEffect, useState } from "react";
import { Button, FormControl, FormGroup } from "@mui/material";
import { Form, Field } from "react-final-form";
import {
  WrappedDatePicker,
  WrappedRadio,
  WrappedTextInput,
} from "./components/WrappidInputs";
import { validation_required } from "./components/validations";
import {
  bookVehicle,
  fetchVehiclesByModelType,
  getVehicleTypeByNumberOfWheels,
} from "./api/rentApis";
import toast, { Toaster } from "react-hot-toast";

// type IFormData = {
//   first_name: string;
//   last_name: string;
//   number_of_wheels: number;
// };

function App() {
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [submitValues, setSubmitValues] = useState<any>();
  const [vehicles, setVehicles] = useState([]);
  const [hasFetchedVehiclesType, setHasFetchedVehiclesType] =
    useState<boolean>(false);

  const onSubmit = async (values: any) => {
    setSubmitValues({ ...submitValues, ...values });
    setCurrentForm((prevForm) => prevForm + 1);

    if(values.endDate){
      const res = await bookVehicle(values)
      console.log("booking ",res);
      if(res?.status === 200){
        toast.success("Booking confirmed")
      }
    }
  };

  const fetchVehiclesType = async () => {
    const res = await getVehicleTypeByNumberOfWheels(
      submitValues?.number_of_wheels
    );
    setVehicles(res);
    setHasFetchedVehiclesType(true);
  };
  const fetchVehiclesByType = async () => {
    const res = await fetchVehiclesByModelType(submitValues?.vehicleType);
    setVehicles(res);
  };

  useEffect(() => {
    if (submitValues?.number_of_wheels && !hasFetchedVehiclesType) {
      fetchVehiclesType();
    } else if (submitValues?.vehicleType) {
      fetchVehiclesByType();
    }
  }, [submitValues]);

  const number_of_wheels_options = [
    { value: "2", label: "2" },
    { value: "4", label: "4" },
  ];


  const vehicles_type_options = vehicles?.map((vehicle: any) => ({
    value: vehicle.name.toLowerCase(),
    label: vehicle.name,
  }));

  const vehicle_option = vehicles?.map((vehicle: any) => ({
    value: vehicle.id,
    label: vehicle.name,
  }));

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
                      <div className="flex justify-center text-white text-2xl font-semibold">
                        <Field
                          name="number_of_wheels"
                          options={number_of_wheels_options}
                          component={WrappedRadio}
                        />
                      </div>
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
      case 2:
        return (
          <>
            <h1 className="text-3xl text-white font-semibold text-start mb-10">
              Type of vehicle ?
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
                      <div className="flex justify-center text-white text-2xl font-semibold">
                        <Field
                          name="vehicleType"
                          options={vehicles_type_options}
                          component={WrappedRadio}
                        />
                      </div>
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
      case 3:
        return (
          <>
            <h1 className="text-3xl text-white font-semibold text-start mb-10">
              Specific Model ?
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
                      <div className="flex justify-center text-white text-2xl font-semibold">
                        <Field
                          name="vehicle"
                          options={vehicle_option}
                          component={WrappedRadio}
                        />
                      </div>
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
      case 4:
        return (
          <>
            <h1 className="text-3xl text-white font-semibold text-start mb-10">
              Date Range ?
            </h1>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
                  className="mx-10 md:mx-0 w-full md:w-2/5 m-auto px-3 border border-gray pt-8 shadow-lg rounded-3xl"
                >
                  <FormGroup>
                    <FormControl>
                      <div className="flex justify-center gap-x-2">
                        <div className="flex justify-center  text-white text-2xl font-semibold">
                          <Field
                            label="Start Date"
                            name="startDate"
                            dateFormat="MMMM d, yyyy"
                            component={WrappedDatePicker}
                          />
                        </div>
                        <div className="flex justify-center text-white text-2xl font-semibold">
                          <Field
                            label="End Date"
                            name="endDate"
                            dateFormat="MMMM d, yyyy"
                            component={WrappedDatePicker}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <div className="flex justify-center  m-5">
                      <Button
                        type="submit"
                        className="my-2"
                        variant="contained"
                        color="warning"
                      >
                        Book Now
                      </Button>
                    </div>
                  </FormGroup>
                </form>
              )}
            />
          </>
        );
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
        {renderForm(currentForm)}
      </div>
      <Toaster/>
    </div>
  );
}

export default App;
