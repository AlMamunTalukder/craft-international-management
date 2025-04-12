"use client"

import { useState, useEffect, useRef } from "react"
import {
  Box,
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
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  alpha,
  Tabs,
  Tab,
  Badge,
  Rating,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
  Checkbox,
  FormGroup,
  Menu,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from "@mui/material"
import {
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
  Print as PrintIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
  Comment as CommentIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

// Custom styled components
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FFD700",
  },
  "& .MuiRating-iconHover": {
    color: "#FFCC00",
  },
})

const ProgressWithLabel = ({ value, color }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={value} color={color} sx={{ height: 8, borderRadius: 5 }} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default function DailyStudentReport() {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [selectedDate, setSelectedDate] = useState(formatDateForInput(new Date()))
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [sections, setSections] = useState([])
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState("")
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [anchorEl, setAnchorEl] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [studentReport, setStudentReport] = useState(null)
  const [subjectReports, setSubjectReports] = useState([])
  const [attendanceHistory, setAttendanceHistory] = useState([])
  const [behaviorNotes, setBehaviorNotes] = useState([])
  const [homeworkStatus, setHomeworkStatus] = useState([])
  const printRef = useRef(null)

  // Helper function to format date for input
  function formatDateForInput(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Helper function to format date for display
  function formatDateForDisplay(dateString) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Load mock data
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock classes data
      setClasses([
        { id: "1", name: "Class 1" },
        { id: "2", name: "Class 2" },
        { id: "3", name: "Class 3" },
        { id: "4", name: "Class 4" },
        { id: "5", name: "Class 5" },
      ])

      // Mock sections data
      setSections([
        { id: "A", name: "Section A" },
        { id: "B", name: "Section B" },
        { id: "C", name: "Section C" },
      ])

      // Mock students data
      const mockStudents = [
        {
          id: "S001",
          name: "Anika Rahman",
          rollNumber: "2023001",
          class: "3",
          section: "A",
          gender: "Female",
          photo: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "S002",
          name: "Farhan Ahmed",
          rollNumber: "2023002",
          class: "3",
          section: "A",
          gender: "Male",
          photo: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "S003",
          name: "Nusrat Jahan",
          rollNumber: "2023003",
          class: "3",
          section: "A",
          gender: "Female",
          photo: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "S004",
          name: "Tanvir Hossain",
          rollNumber: "2023004",
          class: "3",
          section: "A",
          gender: "Male",
          photo: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "S005",
          name: "Sadia Islam",
          rollNumber: "2023005",
          class: "3",
          section: "A",
          gender: "Female",
          photo: "/placeholder.svg?height=100&width=100",
        },
      ]
      setStudents(mockStudents)
      setSelectedStudent(mockStudents[0])

      // Mock student report data
      const mockStudentReport = {
        id: "R001",
        studentId: "S001",
        date: selectedDate,
        overallAttendance: 92,
        overallPerformance: 85,
        behaviorRating: 4,
        teacherRemarks:
          "Anika is a diligent student who actively participates in class discussions. She shows great interest in science subjects and has improved significantly in mathematics.",
        parentSignature: false,
        lastUpdated: "2023-12-01T09:30:00",
      }
      setStudentReport(mockStudentReport)

      // Mock subject reports
      const mockSubjectReports = [
        {
          id: "SR001",
          subject: "MATHEMATICS",
          teacher: "Mr. Rahman",
          attendance: "Present",
          classParticipation: 80,
          classworkCompletion: 90,
          homeworkStatus: "Completed",
          understandingLevel: 85,
          testScore: 78,
          remarks: "Good progress in algebra concepts. Needs more practice with word problems.",
        },
        {
          id: "SR002",
          subject: "SCIENCE",
          teacher: "Mrs. Begum",
          attendance: "Present",
          classParticipation: 95,
          classworkCompletion: 100,
          homeworkStatus: "Completed",
          understandingLevel: 90,
          testScore: 92,
          remarks: "Excellent understanding of the solar system. Very enthusiastic during experiments.",
        },
        {
          id: "SR003",
          subject: "ENGLISH",
          teacher: "Ms. Chowdhury",
          attendance: "Present",
          classParticipation: 75,
          classworkCompletion: 85,
          homeworkStatus: "Partially Completed",
          understandingLevel: 80,
          testScore: 82,
          remarks: "Good vocabulary but needs to improve grammar. Reading comprehension is improving.",
        },
        {
          id: "SR004",
          subject: "HISTORY",
          teacher: "Mr. Islam",
          attendance: "Present",
          classParticipation: 70,
          classworkCompletion: 80,
          homeworkStatus: "Completed",
          understandingLevel: 75,
          testScore: 68,
          remarks: "Shows interest in historical events but needs to work on remembering dates and details.",
        },
        {
          id: "SR005",
          subject: "PHYSICAL EDUCATION",
          teacher: "Mr. Hasan",
          attendance: "Present",
          classParticipation: 100,
          classworkCompletion: 100,
          homeworkStatus: "Not Applicable",
          understandingLevel: 95,
          testScore: 90,
          remarks: "Excellent teamwork and sportsmanship. Very active and enthusiastic.",
        },
      ]
      setSubjectReports(mockSubjectReports)

      // Mock attendance history
      const mockAttendanceHistory = [
        { date: "2023-12-01", status: "Present", arrivalTime: "07:45 AM", departureTime: "02:30 PM" },
        { date: "2023-11-30", status: "Present", arrivalTime: "07:50 AM", departureTime: "02:30 PM" },
        { date: "2023-11-29", status: "Absent", arrivalTime: null, departureTime: null, reason: "Sick leave" },
        { date: "2023-11-28", status: "Present", arrivalTime: "07:40 AM", departureTime: "02:30 PM" },
        { date: "2023-11-27", status: "Present", arrivalTime: "07:55 AM", departureTime: "02:30 PM" },
        { date: "2023-11-24", status: "Late", arrivalTime: "08:15 AM", departureTime: "02:30 PM", reason: "Traffic" },
        { date: "2023-11-23", status: "Present", arrivalTime: "07:45 AM", departureTime: "02:30 PM" },
      ]
      setAttendanceHistory(mockAttendanceHistory)

      // Mock behavior notes
      const mockBehaviorNotes = [
        {
          id: "BN001",
          date: "2023-12-01",
          type: "Positive",
          note: "Helped a classmate understand a difficult math problem.",
          teacher: "Mr. Rahman",
        },
        {
          id: "BN002",
          date: "2023-11-28",
          type: "Positive",
          note: "Volunteered to clean up after science experiment.",
          teacher: "Mrs. Begum",
        },
        {
          id: "BN003",
          date: "2023-11-24",
          type: "Concern",
          note: "Was talking during silent reading time.",
          teacher: "Ms. Chowdhury",
        },
        {
          id: "BN004",
          date: "2023-11-22",
          type: "Positive",
          note: "Excellent presentation on environmental conservation.",
          teacher: "Mrs. Begum",
        },
        {
          id: "BN005",
          date: "2023-11-20",
          type: "Concern",
          note: "Did not bring required materials for art class.",
          teacher: "Mr. Karim",
        },
      ]
      setBehaviorNotes(mockBehaviorNotes)

      // Mock homework status
      const mockHomeworkStatus = [
        {
          id: "HW001",
          subject: "MATHEMATICS",
          assignedDate: "2023-11-30",
          dueDate: "2023-12-01",
          description: "Complete problems 1-10 on page 45",
          status: "Completed",
          grade: "A",
          feedback: "All correct. Excellent work!",
        },
        {
          id: "HW002",
          subject: "SCIENCE",
          assignedDate: "2023-11-30",
          dueDate: "2023-12-01",
          description: "Write a report on the water cycle",
          status: "Completed",
          grade: "A-",
          feedback: "Well-written report with good diagrams. Could include more details on condensation.",
        },
        {
          id: "HW003",
          subject: "ENGLISH",
          assignedDate: "2023-11-30",
          dueDate: "2023-12-01",
          description: "Read chapter 5 and answer questions",
          status: "Partially Completed",
          grade: "B",
          feedback: "Answered 3 out of 5 questions. The answers provided were good.",
        },
        {
          id: "HW004",
          subject: "HISTORY",
          assignedDate: "2023-11-29",
          dueDate: "2023-12-01",
          description: "Research and write about a historical figure",
          status: "Completed",
          grade: "B+",
          feedback: "Good research on Mahatma Gandhi. Could include more about his early life.",
        },
      ]
      setHomeworkStatus(mockHomeworkStatus)

      setLoading(false)
    }

    fetchData()
  }, [selectedDate])

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
    setLoading(true)
  }

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  // Handle student selection
  const handleStudentSelect = (event, newValue) => {
    setSelectedStudent(newValue)
    setLoading(true)
    // In a real app, you would fetch the student's report here
    setTimeout(() => setLoading(false), 1000)
  }

  // Handle class change
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value)
    // In a real app, you would filter students by class here
  }

  // Handle section change
  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value)
    // In a real app, you would filter students by section here
  }

  // Handle dialog open
  const handleOpenDialog = (type) => {
    setDialogType(type)
    setOpenDialog(true)
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Handle edit mode toggle
  const handleEditModeToggle = () => {
    setEditMode(!editMode)
    handleMenuClose()
  }

  // Handle print report
  const handlePrintReport = () => {
    handleMenuClose()
    window.print()
  }

  // Handle download report
  const handleDownloadReport = () => {
    handleMenuClose()
    // In a real app, you would generate a PDF here
    setSnackbar({
      open: true,
      message: "Report downloaded successfully!",
      severity: "success",
    })
  }

  // Handle share report
  const handleShareReport = () => {
    handleOpenDialog("share")
    handleMenuClose()
  }

  // Handle save report
  const handleSaveReport = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setEditMode(false)
      setLoading(false)
      setSnackbar({
        open: true,
        message: "Report saved successfully!",
        severity: "success",
      })
    }, 1500)
  }

  // Handle add behavior note
  const handleAddBehaviorNote = () => {
    handleOpenDialog("behavior")
  }

  // Handle add homework
  const handleAddHomework = () => {
    handleOpenDialog("homework")
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "success"
      case "Absent":
        return "error"
      case "Late":
        return "warning"
      default:
        return "default"
    }
  }

  // Get performance color
  const getPerformanceColor = (value) => {
    if (value >= 80) return "success"
    if (value >= 60) return "primary"
    if (value >= 40) return "warning"
    return "error"
  }

  // Get behavior type icon
  const getBehaviorTypeIcon = (type) => {
    switch (type) {
      case "Positive":
        return <CheckCircleIcon color="success" />
      case "Concern":
        return <WarningIcon color="warning" />
      case "Serious":
        return <ErrorIcon color="error" />
      default:
        return <InfoIcon color="info" />
    }
  }

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            দৈনিক শিক্ষার্থী প্রতিবেদন
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
            <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Students
          </Link>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Daily Student Report
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Filters and Controls */}
      <Box sx={{ p: 2, bgcolor: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Class</InputLabel>
              <Select value={selectedClass} label="Class" onChange={handleClassChange}>
                <MenuItem value="">All Classes</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Section</InputLabel>
              <Select value={selectedSection} label="Section" onChange={handleSectionChange}>
                <MenuItem value="">All Sections</MenuItem>
                {sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={selectedStudent}
              onChange={handleStudentSelect}
              options={filteredStudents}
              getOptionLabel={(option) => `${option.name} (${option.rollNumber})`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Student"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 2, overflow: "auto" }} ref={printRef}>
        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading student report...
            </Typography>
          </Box>
        ) : selectedStudent ? (
          <>
            {/* Student Information Card */}
            <Card elevation={0} sx={{ mb: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Avatar
                        src={selectedStudent.photo}
                        alt={selectedStudent.name}
                        sx={{ width: 120, height: 120, border: "4px solid #fff", boxShadow: 2 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {selectedStudent.name}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Roll Number
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {selectedStudent.rollNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Class & Section
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Class {selectedStudent.class} - Section {selectedStudent.section}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Gender
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {selectedStudent.gender}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Report Date
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {formatDateForDisplay(selectedDate)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 2,
                        height: "100%",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Overall Performance
                      </Typography>
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-flex",
                          mb: 1,
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={studentReport.overallPerformance}
                          size={80}
                          thickness={5}
                          color={getPerformanceColor(studentReport.overallPerformance)}
                        />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h6" component="div" color="text.secondary">
                            {`${Math.round(studentReport.overallPerformance)}%`}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ width: "100%", mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Attendance Rate
                        </Typography>
                        <ProgressWithLabel
                          value={studentReport.overallAttendance}
                          color={getPerformanceColor(studentReport.overallAttendance)}
                        />
                      </Box>
                      <Box sx={{ width: "100%", mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Behavior Rating
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <StyledRating
                            name="behavior-rating"
                            value={studentReport.behaviorRating}
                            precision={0.5}
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            readOnly={!editMode}
                            size="large"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.02),
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Last updated: {new Date(studentReport.lastUpdated).toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={handleEditModeToggle}
                    sx={{ mr: 1 }}
                  >
                    {editMode ? "Cancel Edit" : "Edit Report"}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MoreVertIcon />}
                    onClick={handleMenuOpen}
                    size="small"
                  >
                    Actions
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={handlePrintReport}>
                      <ListItemIcon>
                        <PrintIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Print Report</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleDownloadReport}>
                      <ListItemIcon>
                        <DownloadIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Download PDF</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleShareReport}>
                      <ListItemIcon>
                        <ShareIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Share Report</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleAddBehaviorNote}>
                      <ListItemIcon>
                        <CommentIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Add Behavior Note</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Card>

            {/* Tabs for different sections */}
            <Box sx={{ mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px 8px 0 0",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tab label="Subject Reports" icon={<BookIcon />} iconPosition="start" />
                <Tab label="Attendance" icon={<CalendarTodayIcon />} iconPosition="start" />
                <Tab label="Behavior Notes" icon={<CommentIcon />} iconPosition="start" />
                <Tab label="Homework" icon={<AssignmentIcon />} iconPosition="start" />
                <Tab label="Teacher Remarks" icon={<PersonIcon />} iconPosition="start" />
              </Tabs>
            </Box>

            {/* Tab Panels */}
            <Box sx={{ bgcolor: "#fff", borderRadius: 2, border: "1px solid #e0e0e0", mb: 3 }}>
              {/* Subject Reports Tab */}
              {tabValue === 0 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Subject Reports</Typography>
                    {editMode && (
                      <Button variant="outlined" startIcon={<AddIcon />} size="small">
                        Add Subject
                      </Button>
                    )}
                  </Box>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Teacher</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Attendance</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Class Participation</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Classwork</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Homework</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Understanding</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Test Score</TableCell>
                          {editMode && <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {subjectReports.map((report) => (
                          <TableRow key={report.id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {report.subject}
                              </Typography>
                            </TableCell>
                            <TableCell>{report.teacher}</TableCell>
                            <TableCell>
                              <Chip
                                label={report.attendance}
                                size="small"
                                color={getStatusColor(report.attendance)}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField
                                  type="number"
                                  size="small"
                                  value={report.classParticipation}
                                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                                  sx={{ width: 80 }}
                                />
                              ) : (
                                <ProgressWithLabel
                                  value={report.classParticipation}
                                  color={getPerformanceColor(report.classParticipation)}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField
                                  type="number"
                                  size="small"
                                  value={report.classworkCompletion}
                                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                                  sx={{ width: 80 }}
                                />
                              ) : (
                                <ProgressWithLabel
                                  value={report.classworkCompletion}
                                  color={getPerformanceColor(report.classworkCompletion)}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <Select value={report.homeworkStatus} size="small" sx={{ width: 150 }}>
                                  <MenuItem value="Completed">Completed</MenuItem>
                                  <MenuItem value="Partially Completed">Partially Completed</MenuItem>
                                  <MenuItem value="Not Completed">Not Completed</MenuItem>
                                  <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                                </Select>
                              ) : (
                                <Chip
                                  label={report.homeworkStatus}
                                  size="small"
                                  color={
                                    report.homeworkStatus === "Completed"
                                      ? "success"
                                      : report.homeworkStatus === "Partially Completed"
                                        ? "warning"
                                        : report.homeworkStatus === "Not Completed"
                                          ? "error"
                                          : "default"
                                  }
                                  variant="outlined"
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField
                                  type="number"
                                  size="small"
                                  value={report.understandingLevel}
                                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                                  sx={{ width: 80 }}
                                />
                              ) : (
                                <ProgressWithLabel
                                  value={report.understandingLevel}
                                  color={getPerformanceColor(report.understandingLevel)}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField
                                  type="number"
                                  size="small"
                                  value={report.testScore}
                                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                                  sx={{ width: 80 }}
                                />
                              ) : (
                                <Typography
                                  variant="body2"
                                  color={
                                    report.testScore >= 80
                                      ? "success.main"
                                      : report.testScore >= 60
                                        ? "primary.main"
                                        : report.testScore >= 40
                                          ? "warning.main"
                                          : "error.main"
                                  }
                                  fontWeight="medium"
                                >
                                  {report.testScore}%
                                </Typography>
                              )}
                            </TableCell>
                            {editMode && (
                              <TableCell>
                                <IconButton size="small" color="primary">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Subject-specific Remarks
                    </Typography>
                    <Grid container spacing={2}>
                      {subjectReports.map((report) => (
                        <Grid item xs={12} md={6} key={`remarks-${report.id}`}>
                          <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardHeader
                              title={report.subject}
                              subheader={report.teacher}
                              titleTypographyProps={{ variant: "subtitle1" }}
                              subheaderTypographyProps={{ variant: "body2" }}
                              sx={{ pb: 0 }}
                            />
                            <CardContent>
                              {editMode ? (
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={2}
                                  value={report.remarks}
                                  placeholder="Enter remarks"
                                  variant="outlined"
                                  size="small"
                                />
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  {report.remarks}
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              )}

              {/* Attendance Tab */}
              {tabValue === 1 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6">Attendance History</Typography>
                    <Box>
                      <Button variant="outlined" startIcon={<FilterListIcon />} size="small" sx={{ mr: 1 }}>
                        Filter
                      </Button>
                      {editMode && (
                        <Button variant="outlined" startIcon={<AddIcon />} size="small">
                          Add Record
                        </Button>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                    <Grid container spacing={2} justifyContent="center">
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: "center", p: 1 }}>
                          <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                            {studentReport.overallAttendance}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Attendance Rate
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: "center", p: 1 }}>
                          <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                            {attendanceHistory.filter((a) => a.status === "Present").length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Days Present
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: "center", p: 1 }}>
                          <Typography variant="h4" color="error.main" sx={{ fontWeight: 600 }}>
                            {attendanceHistory.filter((a) => a.status === "Absent").length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Days Absent
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Arrival Time</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Departure Time</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Reason (if applicable)</TableCell>
                          {editMode && <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {attendanceHistory.map((record, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{formatDateForDisplay(record.date)}</TableCell>
                            <TableCell>
                              <Chip
                                label={record.status}
                                size="small"
                                color={getStatusColor(record.status)}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField
                                  type="time"
                                  size="small"
                                  value={record.arrivalTime ? record.arrivalTime.substring(0, 5) : ""}
                                  InputLabelProps={{ shrink: true }}
                                  disabled={record.status === "Absent"}
                                />
                              ) : (
                                record.arrivalTime || "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField
                                  type="time"
                                  size="small"
                                  value={record.departureTime ? record.departureTime.substring(0, 5) : ""}
                                  InputLabelProps={{ shrink: true }}
                                  disabled={record.status === "Absent"}
                                />
                              ) : (
                                record.departureTime || "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField
                                  size="small"
                                  value={record.reason || ""}
                                  placeholder="Enter reason"
                                  fullWidth
                                />
                              ) : (
                                record.reason || "N/A"
                              )}
                            </TableCell>
                            {editMode && (
                              <TableCell>
                                <IconButton size="small" color="primary">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Behavior Notes Tab */}
              {tabValue === 2 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6">Behavior Notes</Typography>
                    {editMode && (
                      <Button variant="outlined" startIcon={<AddIcon />} size="small" onClick={handleAddBehaviorNote}>
                        Add Note
                      </Button>
                    )}
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Behavior Rating
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <StyledRating
                        name="behavior-rating-large"
                        value={studentReport.behaviorRating}
                        precision={0.5}
                        icon={<StarIcon fontSize="inherit" />}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        readOnly={!editMode}
                        size="large"
                      />
                      <Typography variant="body1" sx={{ ml: 2 }}>
                        {studentReport.behaviorRating} / 5
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    {behaviorNotes.map((note) => (
                      <Grid item xs={12} md={6} key={note.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            mb: 2,
                            borderLeft: 5,
                            borderColor:
                              note.type === "Positive"
                                ? "success.main"
                                : note.type === "Concern"
                                  ? "warning.main"
                                  : "error.main",
                          }}
                        >
                          <CardHeader
                            avatar={getBehaviorTypeIcon(note.type)}
                            title={note.type}
                            subheader={formatDateForDisplay(note.date)}
                            action={
                              editMode && (
                                <Box>
                                  <IconButton size="small">
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton size="small" color="error">
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              )
                            }
                            titleTypographyProps={{ variant: "subtitle1" }}
                            subheaderTypographyProps={{ variant: "body2" }}
                          />
                          <CardContent>
                            {editMode ? (
                              <TextField
                                fullWidth
                                multiline
                                rows={2}
                                value={note.note}
                                placeholder="Enter note"
                                variant="outlined"
                                size="small"
                              />
                            ) : (
                              <Typography variant="body2">{note.note}</Typography>
                            )}
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              Reported by: {note.teacher}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Homework Tab */}
              {tabValue === 3 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6">Homework Status</Typography>
                    {editMode && (
                      <Button variant="outlined" startIcon={<AddIcon />} size="small" onClick={handleAddHomework}>
                        Add Homework
                      </Button>
                    )}
                  </Box>

                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Assigned Date</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Due Date</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
                          {editMode && <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {homeworkStatus.map((homework) => (
                          <TableRow key={homework.id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {homework.subject}
                              </Typography>
                            </TableCell>
                            <TableCell>{formatDateForDisplay(homework.assignedDate)}</TableCell>
                            <TableCell>{formatDateForDisplay(homework.dueDate)}</TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={2}
                                  value={homework.description}
                                  placeholder="Enter description"
                                  variant="outlined"
                                  size="small"
                                />
                              ) : (
                                homework.description
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <Select value={homework.status} size="small" sx={{ width: 150 }}>
                                  <MenuItem value="Completed">Completed</MenuItem>
                                  <MenuItem value="Partially Completed">Partially Completed</MenuItem>
                                  <MenuItem value="Not Completed">Not Completed</MenuItem>
                                  <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                                </Select>
                              ) : (
                                <Chip
                                  label={homework.status}
                                  size="small"
                                  color={
                                    homework.status === "Completed"
                                      ? "success"
                                      : homework.status === "Partially Completed"
                                        ? "warning"
                                        : homework.status === "Not Completed"
                                          ? "error"
                                          : "default"
                                  }
                                  variant="outlined"
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode ? (
                                <TextField size="small" value={homework.grade} sx={{ width: 80 }} />
                              ) : (
                                <Chip
                                  label={homework.grade}
                                  size="small"
                                  color={
                                    homework.grade === "A" || homework.grade === "A+"
                                      ? "success"
                                      : homework.grade === "B" || homework.grade === "B+" || homework.grade === "A-"
                                        ? "primary"
                                        : homework.grade === "C" || homework.grade === "C+"
                                          ? "warning"
                                          : "error"
                                  }
                                />
                              )}
                            </TableCell>
                            {editMode && (
                              <TableCell>
                                <IconButton size="small" color="primary">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Homework Feedback
                    </Typography>
                    <Grid container spacing={2}>
                      {homeworkStatus.map((homework) => (
                        <Grid item xs={12} md={6} key={`feedback-${homework.id}`}>
                          <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardHeader
                              title={`${homework.subject} - ${homework.grade}`}
                              subheader={`Due: ${formatDateForDisplay(homework.dueDate)}`}
                              titleTypographyProps={{ variant: "subtitle1" }}
                              subheaderTypographyProps={{ variant: "body2" }}
                              sx={{ pb: 0 }}
                            />
                            <CardContent>
                              {editMode ? (
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={2}
                                  value={homework.feedback}
                                  placeholder="Enter feedback"
                                  variant="outlined"
                                  size="small"
                                />
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  {homework.feedback}
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              )}

              {/* Teacher Remarks Tab */}
              {tabValue === 4 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Teacher Remarks
                  </Typography>
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      {editMode ? (
                        <TextField
                          fullWidth
                          multiline
                          rows={6}
                          value={studentReport.teacherRemarks}
                          placeholder="Enter teacher remarks"
                          variant="outlined"
                        />
                      ) : (
                        <Typography variant="body1" paragraph>
                          {studentReport.teacherRemarks}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Parent Signature
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={studentReport.parentSignature}
                          onChange={(e) => {
                            if (editMode) {
                              setStudentReport({
                                ...studentReport,
                                parentSignature: e.target.checked,
                              })
                            }
                          }}
                          disabled={!editMode}
                        />
                      }
                      label="Report signed by parent"
                    />
                  </Box>
                </Box>
              )}
            </Box>

            {/* Action Buttons (only visible in edit mode) */}
            {editMode && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 4 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setEditMode(false)}
                  startIcon={<CancelIcon />}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveReport}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Report"}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
            }}
          >
            <PersonIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Student Selected
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 500 }}>
              Please select a student from the dropdown above to view their daily report.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Dialogs */}
      <Dialog open={openDialog && dialogType === "behavior"} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Behavior Note</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>Add a new behavior note for {selectedStudent?.name}.</DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Note Type</InputLabel>
                <Select label="Note Type" defaultValue="Positive">
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="Concern">Concern</MenuItem>
                  <MenuItem value="Serious">Serious</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Note" multiline rows={4} fullWidth placeholder="Enter behavior note" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleCloseDialog()
              setSnackbar({
                open: true,
                message: "Behavior note added successfully!",
                severity: "success",
              })
            }}
            variant="contained"
          >
            Add Note
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog && dialogType === "homework"} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Homework</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>Add a new homework entry for {selectedStudent?.name}.</DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Subject</InputLabel>
                <Select label="Subject" defaultValue="">
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="MATHEMATICS">Mathematics</MenuItem>
                  <MenuItem value="SCIENCE">Science</MenuItem>
                  <MenuItem value="ENGLISH">English</MenuItem>
                  <MenuItem value="HISTORY">History</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="Assigned">
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Partially Completed">Partially Completed</MenuItem>
                  <MenuItem value="Not Completed">Not Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                defaultValue={formatDateForInput(new Date())}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Grade" fullWidth placeholder="e.g., A, B+, C" />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" multiline rows={2} fullWidth placeholder="Enter homework description" />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Feedback" multiline rows={2} fullWidth placeholder="Enter feedback on homework" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleCloseDialog()
              setSnackbar({
                open: true,
                message: "Homework added successfully!",
                severity: "success",
              })
            }}
            variant="contained"
          >
            Add Homework
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog && dialogType === "share"} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Share Student Report</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Share {selectedStudent?.name}'s report with parents or other teachers.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Email Recipients" fullWidth placeholder="Enter email addresses separated by commas" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                placeholder="Enter an optional message to include with the report"
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Include subject reports" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Include attendance history" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Include behavior notes" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Include homework status" />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleCloseDialog()
              setSnackbar({
                open: true,
                message: "Report shared successfully!",
                severity: "success",
              })
            }}
            variant="contained"
          >
            Share Report
          </Button>
        </DialogActions>
      </Dialog>

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
