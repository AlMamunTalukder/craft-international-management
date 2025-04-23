"use client"

import { useFormContext, Controller } from "react-hook-form"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { type Dayjs } from "dayjs"
import type { TextFieldProps, SxProps, Theme } from "@mui/material"

interface IDatePicker {
  name: string
  size?: "small" | "medium"
  label?: string
  required?: boolean
  fullWidth?: boolean
  margin?: "none" | "normal" | "dense"
  disablePast?: boolean
  InputProps?: Partial<TextFieldProps>
  sx?: SxProps<Theme>
}

const CraftDatePicker = ({
  name,
  size = "medium",
  label,
  required,
  fullWidth = true,
  margin = "normal",
  disablePast = false,
  InputProps,
  sx,
}: IDatePicker) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        // Ensure value is a dayjs object or null
        const dateValue = value ? dayjs(value) : null

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              value={dateValue}
              onChange={(date: Dayjs | null) => onChange(date)}
              disablePast={disablePast}
              slotProps={{
                textField: {
                  required,
                  size,
                  sx,
                  variant: "outlined",
                  fullWidth,
                  margin,
                  ...InputProps, // Use InputProps here
                },
              }}
              {...field} // Spread remaining field props
            />
          </LocalizationProvider>
        )
      }}
    />
  )
}

export default CraftDatePicker
