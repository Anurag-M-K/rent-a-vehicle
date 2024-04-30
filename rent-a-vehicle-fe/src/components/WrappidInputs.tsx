import { Checkbox, FormControlLabel, FormLabel, Radio, Tooltip } from '@mui/material';
import { IoInformationCircle } from 'react-icons/io5';
import ValidationError from './ValidationError';



export function WrappedTextInput({ ...props }: any) {
    if (props.type == "hidden") {
      return <input {...props} />;
    }
    return (
      <div className={`flex-1 mb-3 ${props.className}`}>
        <div className="flex items-center textwh">
          {props.label && (

            <h2  className='block mb-2 text-xl font-medium text-gray-500'>
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
            className="text-sm opacity-30
             w-full border py-2 rounded-lg border-gray-00  shadow-sm hover:shadow-sm flex px-2"
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
            <h2 className='block mb-2 text-xl font-medium text-gray-500'>
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
          {options.map((option: any) => (
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