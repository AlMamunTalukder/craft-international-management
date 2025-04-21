import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent } from "react";

interface CraftSwitchProps {
  name: string;
  label: string;
  color?: "primary" | "secondary" | "default";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CraftSwitch = ({
  name,
  label,
  color = "primary",
  onChange: customOnChange,
}: CraftSwitchProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={
            <Switch
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked); 
                if (customOnChange) {
                  customOnChange(e); 
                }
              }}
              color={color}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default CraftSwitch;
