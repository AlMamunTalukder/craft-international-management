/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Divider,
  Chip,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material"
import { Save, Clear } from "@mui/icons-material"
import { useRouter } from "next/navigation"

// Mock data for dropdowns
const CLASSES = [
  { id: 1, name: "Class 1" },
  { id: 2, name: "Class 2" },
  { id: 3, name: "Class 3" },
  { id: 4, name: "Class 4" },
  { id: 5, name: "Class 5" },
  { id: 6, name: "Class 6" },
  { id: 7, name: "Class 7" },
  { id: 8, name: "Class 8" },
  { id: 9, name: "Class 9" },
  { id: 10, name: "Class 10" },
]

const SECTIONS = [
  { id: 1, name: "Section A" },
  { id: 2, name: "Section B" },
  { id: 3, name: "Section C" },
  { id: 4, name: "Section D" },
]

const BRANCHES = [
  { id: 1, name: "Main Campus" },
  { id: 2, name: "North Campus" },
  { id: 3, name: "South Campus" },
]

export default function BatchForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    batchId: "",
    name: "",
    classId: "",
    section: "",
    branch: "",
    startDate: "",
    endDate: "",
    capacity: "",
    description: "",
    isActive: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (!name) return

    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isActive: e.target.checked,
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.batchId) newErrors.batchId = "Batch ID is required"
    if (!formData.name) newErrors.name = "Batch name is required"
    if (!formData.classId) newErrors.classId = "Class is required"
    if (!formData.section) newErrors.section = "Section is required"
    if (!formData.branch) newErrors.branch = "Branch is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Here you would typically send the data to your API
      console.log("Form submitted:", formData)

      // Show success message
      setSnackbar({
        open: true,
        message: "Batch created successfully!",
        severity: "success",
      })

      // Redirect to batch list after a short delay
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  const handleReset = () => {
    setFormData({
      batchId: "",
      name: "",
      classId: "",
      section: "",
      branch: "",
      startDate: "",
      endDate: "",
      capacity: "",
      description: "",
      isActive: true,
    })
    setErrors({})
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: "text.primary" }}>
          Create New Batch
        </Typography>
        <Chip
          label="New Record"
          color="primary"
          size="small"
          sx={{
            bgcolor: "#e0f2f1",
            color: "#00796b",
            fontWeight: 500,
          }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="batchId"
            name="batchId"
            label="Batch ID"
            value={formData.batchId}
            onChange={handleChange}
            error={!!errors.batchId}
            helperText={errors.batchId || "Enter a unique identifier for this batch"}
            variant="outlined"
            placeholder="e.g., BATCH-2025-01"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Batch Name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name || "Enter a descriptive name for this batch"}
            variant="outlined"
            placeholder="e.g., Morning Batch 2025"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth required error={!!errors.classId}>
            <InputLabel id="class-label">Class</InputLabel>
            <Select
              labelId="class-label"
              id="classId"
              name="classId"
              value={formData.classId}
              label="Class"
              onChange={handleChange}
            >
              {CLASSES.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.classId || "Select the class for this batch"}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth required error={!!errors.section}>
            <InputLabel id="section-label">Section</InputLabel>
            <Select
              labelId="section-label"
              id="section"
              name="section"
              value={formData.section}
              label="Section"
              onChange={handleChange}
            >
              {SECTIONS.map((section) => (
                <MenuItem key={section.id} value={section.id}>
                  {section.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.section || "Select the section for this batch"}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth required error={!!errors.branch}>
            <InputLabel id="branch-label">Branch</InputLabel>
            <Select
              labelId="branch-label"
              id="branch"
              name="branch"
              value={formData.branch}
              label="Branch"
              onChange={handleChange}
            >
              {BRANCHES.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.branch || "Select the branch for this batch"}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }}>
            <Chip label="Schedule & Capacity" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            error={!!errors.startDate}
            helperText={errors.startDate || "When does this batch start?"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            helperText="When does this batch end? (Optional)"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="capacity"
            name="capacity"
            label="Capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            helperText="Maximum number of students (Optional)"
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            helperText="Additional details about this batch (Optional)"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch checked={formData.isActive} onChange={handleSwitchChange} name="isActive" color="primary" />
            }
            label="Active Batch"
          />
          <FormHelperText>Inactive batches won't appear in active enrollments</FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={handleReset}
            sx={{ borderColor: "grey.300", color: "text.secondary" }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            sx={{ bgcolor: "#00897b", "&:hover": { bgcolor: "#00796b" } }}
          >
            Save Batch
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
