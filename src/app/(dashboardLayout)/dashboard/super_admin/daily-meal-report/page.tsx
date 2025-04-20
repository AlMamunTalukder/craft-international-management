/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material"
import {
  CalendarMonth,
  Print,
  FileDownload,
  FilterList,
  Search,
  CheckCircle,
  Cancel,
  Restaurant,
  NavigateBefore,
  NavigateNext,
  AddCircleOutline,
  FreeBreakfast,
  Fastfood,
  DinnerDining,
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material/Select"
import Link from "next/link"
// Generate days of month
const getDaysInMonth = (month: number, year: number) => {
  return new Array(new Date(year, month, 0).getDate()).fill(null).map((_, i) => i + 1)
}

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

// Generate random meal data
// const generateMealData = () => {
//   const mealData: Record<number, Record<number, boolean>> = {}

//   students.forEach((student) => {
//     mealData[student.id] = {}
//     getDaysInMonth(4, 2025).forEach((day) => {
//       mealData[student.id][day] = Math.random() > 0.3
//     })
//   })

//   return mealData
// }

export default function MealReport() {
  const [month, setMonth] = useState<number>(4) // April
  const [year, setYear] = useState<number>(2025)
  const [mealData, setMealData] = useState(() => {
    const data: Record<number, Record<number, { eaten: boolean; type: string[] }>> = {}

    students.forEach((student) => {
      data[student.id] = {}
      getDaysInMonth(4, 2025).forEach((day) => {
        const eaten = Math.random() > 0.3
        const types = []
        if (eaten) {
          if (Math.random() > 0.3) types.push("breakfast")
          if (Math.random() > 0.3) types.push("lunch")
          if (Math.random() > 0.3) types.push("dinner")
          // Ensure at least one meal type if eaten is true
          if (types.length === 0) types.push(["breakfast", "lunch", "dinner"][Math.floor(Math.random() * 3)])
        }
        data[student.id][day] = { eaten, type: types }
      })
    })

    return data
  })

  const days = getDaysInMonth(month, year)
  const totalDays = days.length

  // Calculate total meals for each student
  const calculateTotalMeals = (studentId: number) => {
    return days.reduce((total, day) => total + (mealData[studentId][day].eaten ? 1 : 0), 0)
  }

  // Calculate total meals for each day
  const calculateDailyTotal = (day: number) => {
    return students.reduce((total, student) => total + (mealData[student.id][day].eaten ? 1 : 0), 0)
  }

  // Calculate grand total of all meals
  const calculateGrandTotal = () => {
    return students.reduce((total, student) => total + calculateTotalMeals(student.id), 0)
  }

  // Toggle meal status
  const toggleMeal = (studentId: number, day: number) => {
    setMealData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [day]: {
          ...prev[studentId][day],
          eaten: !prev[studentId][day].eaten,
          type: prev[studentId][day].eaten ? [] : ["breakfast"],
        },
      },
    }))
  }

  // Add this new function to toggle meal types:
  const toggleMealType = (studentId: number, day: number, mealType: string) => {
    setMealData((prev) => {
      const currentTypes = [...prev[studentId][day].type]
      const typeIndex = currentTypes.indexOf(mealType)

      if (typeIndex >= 0) {
        currentTypes.splice(typeIndex, 1)
      } else {
        currentTypes.push(mealType)
      }

      // If no meal types, mark as not eaten
      const eaten = currentTypes.length > 0

      return {
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [day]: {
            eaten,
            type: currentTypes,
          },
        },
      }
    })
  }

  // Add this function to render meal type indicators:
  const renderMealTypeIndicator = (studentId: number, day: number) => {
    const mealInfo = mealData[studentId][day]

    if (!mealInfo.eaten) {
      return <Cancel sx={{ color: "#f44336", fontSize: 18 }} />
    }

    return (
      <Tooltip
        title={
          <div>
            {mealInfo.type.includes("breakfast") && <div>Breakfast</div>}
            {mealInfo.type.includes("lunch") && <div>Lunch</div>}
            {mealInfo.type.includes("dinner") && <div>Dinner</div>}
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CheckCircle sx={{ color: "#4caf50", fontSize: 18 }} />
          {mealInfo.type.length > 0 && (
            <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>
              {mealInfo.type.length}
            </Typography>
          )}
        </div>
      </Tooltip>
    )
  }

  // Handle month change
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setMonth(Number(event.target.value))
  }

  // Get month name
  const getMonthName = (monthNumber: number) => {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString("en-US", { month: "long" })
  }

  // Navigate to previous month
  const prevMonth = () => {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  // Navigate to next month
  const nextMonth = () => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <Box sx={{ p: 0, maxWidth: "100%", overflowX: "auto" }}>
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
                Residential Meal Sheet
              </Typography>
              {/* <Typography variant="subtitle1">Residential Meal Sheet</Typography> */}
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton color="inherit" onClick={prevMonth}>
                  <NavigateBefore />
                </IconButton>
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 120, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 1 }}
                >
                  <Select value={month} onChange={handleMonthChange} sx={{ color: "white" }}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <MenuItem key={m} value={m}>
                        {getMonthName(m)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="h6">{year}</Typography>
                <IconButton color="inherit" onClick={nextMonth}>
                  <NavigateNext />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<Print />}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                >
                  Print
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FileDownload />}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                >
                  Export
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, bgcolor: "#f5f5f5" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Restaurant sx={{ fontSize: 40, color: "#3f51b5" }} />
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Total Meals This Month
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {calculateGrandTotal()}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, bgcolor: "#f5f5f5" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CalendarMonth sx={{ fontSize: 40, color: "#3f51b5" }} />
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Days in Month
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {totalDays}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, bgcolor: "#f5f5f5" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#3f51b5", width: 40, height: 40 }}>
                    <Typography variant="h6">{students.length}</Typography>
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Total Students
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {students.length}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Box component={Link} href='/dashboard/super_admin/daily-meal-report/add' sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <TextField
          placeholder="Search by name..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
          }}
          sx={{ width: 300 }}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<FilterList />}>
            Filter
          </Button>
          <Button variant="contained" color="primary" startIcon={<AddCircleOutline />} sx={{ bgcolor: "#3f51b5" }}>
            Add Meal Report
          </Button>
        </Stack>
      </Box>

      {/* Meal Table */}
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 1, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold", minWidth: 5, padding: "0px 4px" }}
              >
                SL
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold", minWidth: 127, padding: "2px 3px" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold", minWidth: 50, padding: "2px 0px" }}
              >
                Designation
              </TableCell>
              {days.map((day) => (
                <TableCell
                  key={day}
                  align="center"
                  sx={{
                    bgcolor: "#3f51b5",
                    color: "white",
                    fontWeight: "bold",
                    padding: "2px 3px",
                    position: "relative",
                  }}
                >
                  {day}
                  {/* <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "rgba(0,0,0,0.2)",
                      px: 0.5,
                      borderBottomLeftRadius: 3,
                    }}
                  >
                    {calculateDailyTotal(day)}
                  </Typography> */}
                </TableCell>
              ))}
              <TableCell sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold", minWidth: 80 }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow
                key={student.id}
                sx={{ "&:nth-of-type(odd)": { bgcolor: "rgba(63, 81, 181, 0.05)" }, padding: 1 }}
              >
                <TableCell sx={{ padding: "2px 5px" }}>{index + 1}</TableCell>
                <TableCell sx={{ padding: "2px 3px" }}>
                  {student.name}
                  {/* <Stack direction="row" spacing={1} alignItems="center"> */}
                  {/* <Avatar src={student.avatar} sx={{ width: 30, height: 30 }} /> */}
                  {/* <Typography variant="body2" fontWeight="medium">
                      {student.name}
                    </Typography> */}
                  {/* </Stack> */}
                </TableCell>
                <TableCell sx={{ padding: "2px 0px" }}>
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
                </TableCell>
                {days.map((day) => (
                  <TableCell
                    key={day}
                    align="center"
                    onClick={() => toggleMeal(student.id, day)}
                    sx={{
                      padding: "2px 0px",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "rgba(63, 81, 181, 0.1)" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    {renderMealTypeIndicator(student.id, day)}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Chip label={calculateTotalMeals(student.id)} color="primary" sx={{ fontWeight: "bold" }} />
                </TableCell>
              </TableRow>
            ))}
            {/* Summary Row */}
            <TableRow sx={{ bgcolor: "#e8eaf6" }}>
              <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>
                Daily Total
              </TableCell>
              {days.map((day) => (
                <TableCell key={day} align="center" sx={{ fontWeight: "bold" }}>
                  {calculateDailyTotal(day)}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <Chip label={calculateGrandTotal()} color="primary" sx={{ fontWeight: "bold", bgcolor: "#3f51b5" }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Legend */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircle sx={{ color: "#4caf50" }} />
          <Typography variant="body2">Present</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Cancel sx={{ color: "#f44336" }} />
          <Typography variant="body2">Absent</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FreeBreakfast sx={{ color: "#ff9800" }} />
          <Typography variant="body2">Breakfast</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Fastfood sx={{ color: "#2196f3" }} />
          <Typography variant="body2">Lunch</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DinnerDining sx={{ color: "#9c27b0" }} />
          <Typography variant="body2">Dinner</Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          © {year} Craft International Institute. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}
