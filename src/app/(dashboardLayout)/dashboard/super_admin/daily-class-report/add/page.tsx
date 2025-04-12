"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Switch,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  alpha,
  Stepper,
  Step,
  StepLabel,
  Badge,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Class as ClassIcon,
} from "@mui/icons-material"

export default function DailyClassReportAdd() {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [activeStep, setActiveStep] = useState(0)

  // Form data state
  const [formData, setFormData] = useState({
    date: formatDateForInput(new Date()),
    classId: "",
    section: "",
    subject: "",
    teacher: "",
    status: "Present",
    startTime: "09:00",
    endTime: "10:00",
    classWorkStatus: "Completed",
    classWorkDetails: "",
    homeworkStatus: "Assigned",
    homeworkDetails: "",
    homeworkDueDate: formatDateForInput(addDays(new Date(), 1)),
    testConducted: false,
    testType: "",
    testTopic: "",
    attendanceTotal: 30,
    attendancePresent: 28,
    attendanceAbsent: 2,
    notes: "",
  })

  // Mock data for dropdowns
  const [classes, setClasses] = useState([])
  const [sections, setSections] = useState([])
  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])

  // Helper function to format date for input
  function formatDateForInput(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Helper function to add days to a date
  function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  // Fetch mock data
  useEffect(() => {
    // Simulate API calls
    setClasses([
      { id: "1", name: "Class 1" },
      { id: "2", name: "Class 2" },
      { id: "3", name: "Class 3" },
      { id: "4", name: "Class 4" },
      { id: "5", name: "Class 5" },
    ])

    setSections([
      { id: "A", name: "Section A" },
      { id: "B", name: "Section B" },
      { id: "C", name: "Section C" },
    ])

    setSubjects([
      { id: "1", name: "MATHEMATICS" },
      { id: "2", name: "SCIENCE" },
      { id: "3", name: "ENGLISH" },
      { id: "4", name: "HISTORY" },
      { id: "5", name: "GEOGRAPHY" },
      { id: "6", name: "PHYSICS" },
      { id: "7", name: "CHEMISTRY" },
      { id: "8", name: "BIOLOGY" },
      { id: "9", name: "COMPUTER SCIENCE" },
    ])

    setTeachers([
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
      { id: "3", name: "Robert Johnson" },
      { id: "4", name: "Emily Davis" },
      { id: "5", name: "Michael Wilson" },
    ])
  }, [])

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Update attendance calculations
    if (name === "attendanceTotal" || name === "attendancePresent") {
      const total = name === "attendanceTotal" ? Number.parseInt(value) || 0 : formData.attendanceTotal
      const present = name === "attendancePresent" ? Number.parseInt(value) || 0 : formData.attendancePresent

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        attendanceAbsent: Math.max(0, total - present),
      }))
    }

    if (name === "attendanceAbsent") {
      const absent = Number.parseInt(value) || 0
      setFormData((prev) => ({
        ...prev,
        attendanceAbsent: absent,
        attendancePresent: Math.max(0, prev.attendanceTotal - absent),
      }))
    }
  }

  // Handle switch changes
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSnackbar({
        open: true,
        message: "Daily class report added successfully!",
        severity: "success",
      })

      // Reset form or redirect
      console.log("Form submitted:", formData)
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to add report. Please try again.",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Handle stepper next
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle stepper back
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Steps for the stepper
  const steps = ["Basic Information", "Class Activities", "Attendance & Notes"]

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid #e0e0e0" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            <SchoolIcon sx={{ mr: 1 }} />
            দৈনিক শ্রেণী প্রতিবেদন
          </Typography>

          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Help">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>A</Avatar>
            <Typography variant="subtitle2" sx={{ ml: 1, mr: 0.5 }}>
              Admin
            </Typography>
            <IconButton size="small">
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#" sx={{ display: "flex", alignItems: "center" }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>
          <Link underline="hover" color="inherit" href="#" sx={{ display: "flex", alignItems: "center" }}>
            <ClassIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Daily Class Reports
          </Link>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
            <AddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Add New Report
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Page Title */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <IconButton sx={{ mr: 1 }} component={Link} href="#">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Add New Daily Class Report
        </Typography>
      </Box>

      {/* Stepper */}
      <Box sx={{ width: "100%", p: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Step 1: Basic Information */}
            {activeStep === 0 && (
              <>
                <Grid item xs={12}>
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <CardHeader
                      title="Class Details"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <ClassIcon />
                        </Avatar>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name="date"
                            label="Date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Class</InputLabel>
                            <Select name="classId" value={formData.classId} label="Class" onChange={handleChange}>
                              {classes.map((cls) => (
                                <MenuItem key={cls.id} value={cls.id}>
                                  {cls.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Section</InputLabel>
                            <Select name="section" value={formData.section} label="Section" onChange={handleChange}>
                              {sections.map((section) => (
                                <MenuItem key={section.id} value={section.id}>
                                  {section.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Subject</InputLabel>
                            <Select name="subject" value={formData.subject} label="Subject" onChange={handleChange}>
                              {subjects.map((subject) => (
                                <MenuItem key={subject.id} value={subject.id}>
                                  {subject.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <CardHeader
                      title="Teacher & Schedule"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <PersonIcon />
                        </Avatar>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Teacher</InputLabel>
                            <Select name="teacher" value={formData.teacher} label="Teacher" onChange={handleChange}>
                              {teachers.map((teacher) => (
                                <MenuItem key={teacher.id} value={teacher.id}>
                                  {teacher.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Status</InputLabel>
                            <Select name="status" value={formData.status} label="Status" onChange={handleChange}>
                              <MenuItem value="Present">Present</MenuItem>
                              <MenuItem value="Absent">Absent</MenuItem>
                              <MenuItem value="Late">Late</MenuItem>
                              <MenuItem value="Substitute">Substitute</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name="startTime"
                            label="Start Time"
                            type="time"
                            value={formData.startTime}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name="endTime"
                            label="End Time"
                            type="time"
                            value={formData.endTime}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}

            {/* Step 2: Class Activities */}
            {activeStep === 1 && (
              <>
                <Grid item xs={12}>
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <CardHeader
                      title="Class Work"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <BookIcon />
                        </Avatar>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Class Work Status</InputLabel>
                            <Select
                              name="classWorkStatus"
                              value={formData.classWorkStatus}
                              label="Class Work Status"
                              onChange={handleChange}
                            >
                              <MenuItem value="Completed">Completed</MenuItem>
                              <MenuItem value="Partially Completed">Partially Completed</MenuItem>
                              <MenuItem value="Not Completed">Not Completed</MenuItem>
                              <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="classWorkDetails"
                            label="Class Work Details"
                            multiline
                            rows={3}
                            value={formData.classWorkDetails}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Enter topics covered, activities conducted, etc."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <CardHeader
                      title="Homework"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <AssignmentIcon />
                        </Avatar>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Homework Status</InputLabel>
                            <Select
                              name="homeworkStatus"
                              value={formData.homeworkStatus}
                              label="Homework Status"
                              onChange={handleChange}
                            >
                              <MenuItem value="Assigned">Assigned</MenuItem>
                              <MenuItem value="None">None</MenuItem>
                              <MenuItem value="Collected">Collected</MenuItem>
                              <MenuItem value="Reviewed">Reviewed</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name="homeworkDueDate"
                            label="Due Date"
                            type="date"
                            value={formData.homeworkDueDate}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="homeworkDetails"
                            label="Homework Details"
                            multiline
                            rows={3}
                            value={formData.homeworkDetails}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Enter homework assignment details"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <CardHeader
                      title="Class Test"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <QuizIcon />
                        </Avatar>
                      }
                      action={
                        <FormControlLabel
                          control={
                            <Switch
                              checked={formData.testConducted}
                              onChange={handleSwitchChange}
                              name="testConducted"
                              color="primary"
                            />
                          }
                          label="Test Conducted"
                        />
                      }
                    />
                    <Divider />
                    <CardContent>
                      {formData.testConducted ? (
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <InputLabel>Test Type</InputLabel>
                              <Select
                                name="testType"
                                value={formData.testType}
                                label="Test Type"
                                onChange={handleChange}
                              >
                                <MenuItem value="Quiz">Quiz</MenuItem>
                                <MenuItem value="Unit Test">Unit Test</MenuItem>
                                <MenuItem value="Chapter Test">Chapter Test</MenuItem>
                                <MenuItem value="Mid-Term">Mid-Term</MenuItem>
                                <MenuItem value="Final">Final</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              name="testTopic"
                              label="Test Topic/Details"
                              value={formData.testTopic}
                              onChange={handleChange}
                              fullWidth
                              placeholder="Enter test topic or details"
                            />
                          </Grid>
                        </Grid>
                      ) : (
                        <Typography variant="body2" color="textSecondary" sx={{ py: 2 }}>
                          No test was conducted for this class.
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}

            {/* Step 3: Attendance & Notes */}
            {activeStep === 2 && (
              <>
                <Grid item xs={12}>
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <CardHeader
                      title="Attendance"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <PersonIcon />
                        </Avatar>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <TextField
                            name="attendanceTotal"
                            label="Total Students"
                            type="number"
                            value={formData.attendanceTotal}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            name="attendancePresent"
                            label="Present Students"
                            type="number"
                            value={formData.attendancePresent}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            name="attendanceAbsent"
                            label="Absent Students"
                            type="number"
                            value={formData.attendanceAbsent}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              mt: 1,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              borderRadius: 2,
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <Box sx={{ textAlign: "center" }}>
                              <Typography variant="body2" color="textSecondary">
                                Total
                              </Typography>
                              <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                                {formData.attendanceTotal}
                              </Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box sx={{ textAlign: "center" }}>
                              <Typography variant="body2" color="textSecondary">
                                Present
                              </Typography>
                              <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                                {formData.attendancePresent}
                              </Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box sx={{ textAlign: "center" }}>
                              <Typography variant="body2" color="textSecondary">
                                Absent
                              </Typography>
                              <Typography variant="h4" color="error.main" sx={{ fontWeight: 600 }}>
                                {formData.attendanceAbsent}
                              </Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box sx={{ textAlign: "center" }}>
                              <Typography variant="body2" color="textSecondary">
                                Attendance Rate
                              </Typography>
                              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {formData.attendanceTotal > 0
                                  ? Math.round((formData.attendancePresent / formData.attendanceTotal) * 100)
                                  : 0}
                                %
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <CardHeader
                      title="Additional Notes"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <AssignmentIcon />
                        </Avatar>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <TextField
                        name="notes"
                        label="Notes"
                        multiline
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Enter any additional notes, observations, or issues that need to be addressed"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Box>

      {/* Footer with Navigation Buttons */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>

        <Box>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 2 }}
            startIcon={<CancelIcon />}
            component={Link}
            href="#"
          >
            Cancel
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            >
              {loading ? "Saving..." : "Save Report"}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext} endIcon={<NavigateNextIcon />}>
              Next
            </Button>
          )}
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
