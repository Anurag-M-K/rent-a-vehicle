import toast from "react-hot-toast";

export const validation_required = (value: string | number | undefined) => {
  if (typeof value == "number") {
    return value != null && value != undefined ? undefined : "Required";
  } else {
    return value ? undefined : "Required";
  }
};
export const validation_required_for_start_date = (value: string | number | undefined) => {
  if (typeof value === "number") {
    return value != null ? undefined : "Please select a start date";
  } else {
    return value ? undefined : "Please select a start date";
  }
};
export const validation_required_for_end_date = (value: string | number | undefined) => {
  if (typeof value === "number") {
    return value != null ? undefined : "Please select a end date";
  } else {
    return value ? undefined : "Please select a end date";
  }
};


export const validation_required_for_radio = (value: string | number | undefined) => {
  if (typeof value == "number") {
    return value != null && value != undefined ? undefined : "Please select any of the above";
  } else {
    return value ? undefined : "Please select any of the above";
  }
};

export const validation_email = (value: any) => {
  if (value.match(/^\w+([\.\-\+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)) {
    return undefined;
  }
  return "Invalid email address";
};



