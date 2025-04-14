/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Alert,

  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,

  Select,
  Snackbar,
  Switch,
  TextField,

  Grid,
  FormControlLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import {
  ArrowBack as ArrowBackIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  Book as BookIcon, 
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";

// ================= Types =================
type ClassOption = { id: string; name: string };
type SectionOption = { id: string; name: string };
type SnackbarType = { open: boolean; message: string; severity: "success" | "info" | "warning" | "error" };

type FormDataType = {
  classId: string;
  sectionId: string;
  classWorkStatus: string;
  classWorkDetails: string;
  homeworkStatus: string;
  homeworkDueDate: string;
  homeworkDetails: string;
  testConducted: boolean;
  testType: string;
  testTopic: string;
  attendanceTotal: number;
  attendancePresent: number;
  attendanceAbsent: number;
  notes: string;
};

export default function ClassActivityForm() {
  const theme = useTheme();

  const [classes, setClasses] = useState<ClassOption[]>([
    { id: "1", name: "Class 1" },
    { id: "2", name: "Class 2" },
    { id: "3", name: "Class 3" },
    { id: "4", name: "Class 4" },
    { id: "5", name: "Class 5" },
  ]);

  const [sections, setSections] = useState<SectionOption[]>([
    { id: "A", name: "Section A" },
    { id: "B", name: "Section B" },
    { id: "C", name: "Section C" },
  ]);

  const [formData, setFormData] = useState<FormDataType>({
    classId: "",
    sectionId: "",
    classWorkStatus: "",
    classWorkDetails: "",
    homeworkStatus: "",
    homeworkDueDate: "",
    homeworkDetails: "",
    testConducted: false,
    testType: "",
    testTopic: "",
    attendanceTotal: 0,
    attendancePresent: 0,
    attendanceAbsent: 0,
    notes: "",
  });

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({ open: false, message: "", severity: "success" });

  const steps = ["Class Info", "Homework", "Attendance"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Form Data Submitted:", formData);
      setSnackbar({ open: true, message: "Report saved successfully!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Something went wrong!", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Card sx={{ p: 2 }}>
        <CardHeader
          avatar={<BookIcon />}
          title={`Class Activity Report - ${steps[activeStep]}`}
          action={
            <Link href="/">
              <Button variant="outlined" startIcon={<CancelIcon />}>
                Cancel
              </Button>
            </Link>
          }
        />
        <Divider />
        <CardContent>
          {activeStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    name="classId"
                    value={formData.classId}
                    onChange={handleChange}
                    label="Class"
                  >
                    {classes.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Section</InputLabel>


                  
                  <Select
                    name="sectionId"
                    value={formData.sectionId}
                    onChange={handleChange}
                    label="Section"
                  >
                    {sections.map((sec) => (
                      <MenuItem key={sec.id} value={sec.id}>
                        {sec.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Class Work Status"
                  name="classWorkStatus"
                  value={formData.classWorkStatus}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Class Work Details"
                  name="classWorkDetails"
                  value={formData.classWorkDetails}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Homework Status"
                  name="homeworkStatus"
                  value={formData.homeworkStatus}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Due Date"
                  name="homeworkDueDate"
                  type="date"
                  value={formData.homeworkDueDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Homework Details"
                  name="homeworkDetails"
                  value={formData.homeworkDetails}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.testConducted}
                      onChange={handleSwitchChange}
                      name="testConducted"
                    />
                  }
                  label="Test Conducted"
                />
              </Grid>
              {formData.testConducted && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Test Type"
                      name="testType"
                      value={formData.testType}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Test Topic"
                      name="testTopic"
                      value={formData.testTopic}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Total Students"
                  name="attendanceTotal"
                  type="number"
                  value={formData.attendanceTotal}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Present"
                  name="attendancePresent"
                  type="number"
                  value={formData.attendancePresent}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Absent"
                  name="attendanceAbsent"
                  type="number"
                  value={formData.attendanceAbsent}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
        <Divider />
        <Box p={2} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext} endIcon={<NavigateNextIcon />}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              endIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              Submit
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
}
