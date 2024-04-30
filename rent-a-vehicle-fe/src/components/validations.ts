export const validation_required = (value: string | number | undefined) => {
  if (typeof value == "number") {
    return value != null && value != undefined ? undefined : "Required";
  } else {
    return value ? undefined : "Required";
  }
};

export const validation_email = (value: any) => {
  if (value.match(/^\w+([\.\-\+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)) {
    return undefined;
  }
  return "Invalid email address";
};



