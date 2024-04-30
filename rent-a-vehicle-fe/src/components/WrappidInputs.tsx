import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  Tooltip,
} from "@mui/material";
import { IoInformationCircle } from "react-icons/io5";
import ValidationError from "./ValidationError";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export function WrappedTextInput({ ...props }: any) {
  if (props.type == "hidden") {
    return <input {...props} />;
  }
  return (
    <div className={`flex-1 mb-3 ${props.className}`}>
      <div className="flex items-center textwh">
        {props.label && (
          <h2 className="block mb-2 text-2xl font-medium text-gray-300">
            {props.label}
          </h2>
        )}
        {props.hint && (
          <span data-tooltip-target="tooltip-light" className="ml-1 mb-2">
            <Tooltip title={`${props.hint}`}>
              <IoInformationCircle size={16} className="text-gray-500" />
            </Tooltip>
          </span>
        )}
      </div>
      <div className="flex items-center">
        {props.Icon && <props.Icon className="mr-2" size={20} />}
        <input
          color={
            (props.meta.error && props.meta.touched) || props.error
              ? "failure"
              : null
          }
          className="border-gray-300  border w-full opacity-60 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
          id={props.id}
          value={props.value}
          disabled={props.disabled}
          {...props.input}
        />
      </div>
      <ValidationError props={props} />
    </div>
  );
}

export function WrappedRadio({ options, ...props }: any) {
  return (
    <div className={`flex-1 mb-3 ${props.className}`}>
      <div className="flex items-center textwh">
        {props.label && (
          <h2 className="block mb-2 text-xl font-medium text-gray-500">
            {props.label}
          </h2>
        )}
        {props.hint && (
          <span data-tooltip-target="tooltip-light" className="ml-1 mb-2">
            <Tooltip title={`${props.hint}`}>
              <IoInformationCircle size={16} className="text-gray-500" />
            </Tooltip>
          </span>
        )}
      </div>
      <div className="flex items-center">
        {options?.map((option: any) => (
          <FormControlLabel
            key={option.value}
            control={
              <Radio
                color="primary"
                checked={props.input.value === option.value}
                onChange={(event) => props.input.onChange(option.value)}
                value={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </div>
      <ValidationError props={props} />
    </div>
  );
}

// export const WrappedDatePicker = ({ ...props }: any) => {
//   const [startDate, setStartDate] = useState<any>(new Date());
//   return (
//     <div className="flex-1 mb-3 w-full">
//       <div className="flex items-center">
//         {props.label && (
//           <h2 className="block mb-2 text-2xl font-medium text-gray-300">
//             {props.label}
//           </h2>
//         )}
//         {props.hint && (
//           <span data-tooltip-target="tooltip-light" className="ml-1 mb-2">
//             <Tooltip title={`${props.hint}`}>
//               <IoInformationCircle size={16} className="text-gray-500" />
//             </Tooltip>
//           </span>
//         )}
//       </div>

// <DatePicker selected={props.input.value} onChange={(date) => setStartDate(date)}
//   className={
//     props.meta.error && props.meta.touched
//       ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
//       : "border-gray-300  border w-full opacity-60  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//   } />
//       <ValidationError props={props} />
//     </div>
//   );
// };

export const WrappedDatePicker = ({ label, ...props }: any) => {
  return (
    <div className="flex-1 mb-3 w-full">
      <div className="flex items-center">
        {label && (
          <h2 className="block mb-2 text-2xl font-medium text-gray-300">
            {label}
          </h2>
        )}
        {props.hint && (
          <span data-tooltip-target="tooltip-light" className="ml-1 mb-2">
            <Tooltip title={`${props.hint}`}>
              <IoInformationCircle size={16} className="text-gray-500" />
            </Tooltip>
          </span>
        )}
      </div>

      <DatePicker
        selected={props.input.value} // Use input.value as the selected date
        onChange={(date) => props.input.onChange(date)} // Pass input.onChange as the onChange handler
        className={
          props.meta.error && props.meta.touched
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
            : "border-gray-300 border w-full opacity-60 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }
      />
      <ValidationError props={props} />
    </div>
  );
};
