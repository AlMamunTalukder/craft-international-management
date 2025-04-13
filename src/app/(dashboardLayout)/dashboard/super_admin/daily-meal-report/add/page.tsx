"use client"

import { useState, useEffect } from "react"
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  FormControl,
  TextField,
  Stack,
  Avatar,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Switch,
} from "@mui/material"
import {
  CalendarMonth,
  Save,
  RestaurantMenu,
  ArrowBack,
  CheckCircle,
  Cancel,
  Search,
  FilterList,
  AccessTime,
} from "@mui/icons-material"

// Sample data based on the provided meal sheet
const students = [
  { id: 1, name: "Neshar Ahmad", designation: "Chairman", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Naim Osmani", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Imtiaz Rassel", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Junayedul Islam", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Ashraful Haq", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "A.N.M. Talha", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 7, name: "Ahmad Ha. Talha", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 8, name: "Nahidul Islam", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 9, name: "Muhammad Tamim", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 10, name: "Shahin", designation: "Cook", avatar: "/placeholder.svg?height=40&width=40" },
]

// Meal types
const mealTypes = ["Breakfast", "Lunch", "Dinner"]

export default function MealReportAdd() {
  const [date, setDate] = useState<Date | null>(new Date())
  const [mealType, setMealType] = useState("Lunch")
  const [selectedStudents, setSelectedStudents] = useState<Record<number, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [filteredStudents, setFilteredStudents] = useState(students)
  const [filterDesignation, setFilterDesignation] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Initialize selected students
  useEffect(() => {
    const initialSelection: Record<number, boolean> = {}
    students.forEach((student) => {
      initialSelection[student.id] = false
    })
    setSelectedStudents(initialSelection)
  }, [])

  // Handle search and filtering
  useEffect(() => {
    let filtered = students

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply designation filter
    if (filterDesignation) {
      filtered = filtered.filter((student) => student.designation === filterDesignation)
    }

    setFilteredStudents(filtered)
  }, [searchQuery, filterDesignation])

  // Toggle individual student selection
  const toggleStudent = (studentId: number) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }))
  }

  // Handle select all toggle
  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    const updatedSelection = { ...selectedStudents }
    filteredStudents.forEach((student) => {
      updatedSelection[student.id] = newSelectAll
    })

    setSelectedStudents(updatedSelection)
  }

  // Count selected students
  const countSelected = () => {
    return Object.values(selectedStudents).filter(Boolean).length
  }

  // Handle save
  const handleSave = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // Reset form after successful save
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }, 1500)
  }

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return ""
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  // Get unique designations for filter
  const designations = Array.from(new Set(students.map((s) => s.designation)))

  return (
    <Box sx={{ p: 3, maxWidth: "100%" }}>
      {/* Header Section */}
      <Card elevation={3} sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{
            p: 2,
            background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
            color: "white",
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" fontWeight="bold">
                Craft International Institute
              </Typography>
              <Typography variant="subtitle1">Add Daily Meal Report</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
              >
                Back to Reports
              </Button>
            </Grid>
          </Grid>
        </Box>

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Select Date"
                type="date"
                fullWidth
                variant="outlined"
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const newDate = e.target.value ? new Date(e.target.value) : null
                  setDate(newDate)
                }}
                InputProps={{
                  startAdornment: <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Meal Type</InputLabel>
                <Select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  label="Meal Type"
                  startAdornment={<RestaurantMenu sx={{ mr: 1, color: "text.secondary" }} />}
                >
                  {mealTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, bgcolor: "#f5f5f5", height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#3f51b5", width: 40, height: 40 }}>
                    <Typography variant="h6">{countSelected()}</Typography>
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Students Selected
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {countSelected()} / {students.length}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Date and Meal Summary */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2, bgcolor: "#e8eaf6" }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CalendarMonth sx={{ fontSize: 24, color: "#3f51b5" }} />
                <Typography variant="h6">{formatDate(date)}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <RestaurantMenu sx={{ fontSize: 24, color: "#3f51b5" }} />
                <Typography variant="h6">{mealType}</Typography>
                <Chip
                  label={`${mealType === "Breakfast" ? "7:30 AM" : mealType === "Lunch" ? "1:00 PM" : "8:00 PM"}`}
                  size="small"
                  icon={<AccessTime sx={{ fontSize: 16 }} />}
                  sx={{ bgcolor: "#fff" }}
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <TextField
          placeholder="Search by name..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
          }}
          sx={{ width: 300 }}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
            color={showFilters ? "primary" : "inherit"}
          >
            Filter
          </Button>
          <FormControlLabel
            control={<Switch checked={selectAll} onChange={handleSelectAll} color="primary" />}
            label="Select All"
          />
        </Stack>
      </Box>

      {/* Filters */}
      {showFilters && (
        <Card sx={{ mb: 3, p: 2, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Designation</InputLabel>
                <Select
                  value={filterDesignation || ""}
                  onChange={(e) => setFilterDesignation(e.target.value || null)}
                  label="Filter by Designation"
                >
                  <MenuItem value="">All Designations</MenuItem>
                  {designations.map((designation) => (
                    <MenuItem key={designation} value={designation}>
                      {designation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* Students List */}
      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
        <Box sx={{ p: 2, bgcolor: "#3f51b5", color: "white" }}>
          <Typography variant="h6">
            Student Selection
            <Typography component="span" variant="body2" sx={{ ml: 2 }}>
              (Click on a student to toggle selection)
            </Typography>
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ maxHeight: "400px", overflow: "auto", p: 2 }}>
          <Grid container spacing={2}>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: "pointer",
                      border: selectedStudents[student.id] ? "2px solid #3f51b5" : "1px solid #e0e0e0",
                      bgcolor: selectedStudents[student.id] ? "rgba(63, 81, 181, 0.1)" : "white",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: 3,
                        bgcolor: "rgba(63, 81, 181, 0.05)",
                      },
                    }}
                    onClick={() => toggleStudent(student.id)}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={student.avatar} sx={{ width: 50, height: 50 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {student.name}
                        </Typography>
                        <Chip
                          label={student.designation}
                          size="small"
                          sx={{
                            bgcolor:
                              student.designation === "Chairman"
                                ? "#e3f2fd"
                                : student.designation === "Teacher"
                                  ? "#e8f5e9"
                                  : "#fff3e0",
                            color:
                              student.designation === "Chairman"
                                ? "#1976d2"
                                : student.designation === "Teacher"
                                  ? "#2e7d32"
                                  : "#e65100",
                          }}
                        />
                      </Box>
                      {selectedStudents[student.id] ? (
                        <CheckCircle sx={{ color: "#4caf50", fontSize: 24 }} />
                      ) : (
                        <Cancel sx={{ color: "#f44336", fontSize: 24 }} />
                      )}
                    </Stack>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h6" color="text.secondary">
                    No students found matching your criteria
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterDesignation(null)
                    }}
                    sx={{ mt: 2 }}
                  >
                    Clear Filters
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 4 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            // Reset form
            setDate(new Date())
            setMealType("Lunch")
            const resetSelection: Record<number, boolean> = {}
            students.forEach((student) => {
              resetSelection[student.id] = false
            })
            setSelectedStudents(resetSelection)
            setSelectAll(false)
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
          onClick={handleSave}
          disabled={loading || countSelected() === 0}
          sx={{
            minWidth: 150,
            bgcolor: "#3f51b5",
            "&:hover": {
              bgcolor: "#303f9f",
            },
          }}
        >
          {loading ? "Saving..." : "Save Report"}
        </Button>
      </Box>

      {/* Legend */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircle sx={{ color: "#4caf50" }} />
          <Typography variant="body2">Selected</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Cancel sx={{ color: "#f44336" }} />
          <Typography variant="body2">Not Selected</Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Craft International Institute. All rights reserved.
        </Typography>
      </Box>

      {/* Success Notification */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Meal report successfully saved!
        </Alert>
      </Snackbar>
    </Box>
  )
}
