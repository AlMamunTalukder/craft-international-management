/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Pagination,
  Fade,
  Zoom,
  LinearProgress,
  Snackbar,
  Alert,
  useTheme,
  FormControl,
  Select,
  type SelectChangeEvent,
} from "@mui/material"
import {
  School as SchoolIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Print as PrintIcon,
  MoreVert as MoreVertIcon,
  FileDownload as FileDownloadIcon,
  Assignment as AssignmentIcon,
  CalendarMonth as CalendarMonthIcon,
  Person as PersonIcon,
  Class as ClassIcon,
  Sort as SortIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material"
import Link from "next/link"

// Types
type Report = {
  id: string
  teacherName: string
  date: string
  class: string
  subjects: string[]
  totalStudents: number
  fullyLearned: number
  partiallyLearned: number
  notLearned: number
  status: "draft" | "submitted" | "reviewed"
  lastUpdated: string
}

export default function DailyClassReportList() {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterClass, setFilterClass] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(1)
  const [reports, setReports] = useState<Report[]>([])
  const [filteredReports, setFilteredReports] = useState<Report[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })

  // Menu state
  const [menuAnchorEl, setMenuAnchorEl] = useState<Record<string, HTMLElement | null>>({})
  const isMenuOpen = (id: string) => Boolean(menuAnchorEl[id])

  // Filter menu state
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const isFilterMenuOpen = Boolean(filterAnchorEl)

  // Sort menu state
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null)
  const isSortMenuOpen = Boolean(sortAnchorEl)

  // Mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockReports: Report[] = [
        {
          id: "RPT-001",
          teacherName: "আব্দুল করিম",
          date: "2025-04-10",
          class: "৫",
          subjects: ["গণিত", "বাংলা", "ইংরেজি"],
          totalStudents: 45,
          fullyLearned: 30,
          partiallyLearned: 10,
          notLearned: 5,
          status: "reviewed",
          lastUpdated: "2025-04-10T14:30:00",
        },
        {
          id: "RPT-002",
          teacherName: "ফাতেমা বেগম",
          date: "2025-04-09",
          class: "৩",
          subjects: ["বাংলা", "ইংরেজি"],
          totalStudents: 40,
          fullyLearned: 25,
          partiallyLearned: 10,
          notLearned: 5,
          status: "submitted",
          lastUpdated: "2025-04-09T15:45:00",
        },
        {
          id: "RPT-003",
          teacherName: "মোহাম্মদ আলী",
          date: "2025-04-08",
          class: "৭",
          subjects: ["বিজ্ঞান", "সমাজ বিজ্ঞান"],
          totalStudents: 50,
          fullyLearned: 35,
          partiallyLearned: 10,
          notLearned: 5,
          status: "reviewed",
          lastUpdated: "2025-04-08T16:20:00",
        },
        {
          id: "RPT-004",
          teacherName: "নাজমা আক্তার",
          date: "2025-04-08",
          class: "২",
          subjects: ["গণিত", "বাংলা"],
          totalStudents: 38,
          fullyLearned: 20,
          partiallyLearned: 15,
          notLearned: 3,
          status: "draft",
          lastUpdated: "2025-04-08T11:15:00",
        },
        {
          id: "RPT-005",
          teacherName: "রফিক হোসেন",
          date: "2025-04-07",
          class: "৮",
          subjects: ["ইংরেজি", "তথ্য ও যোগাযোগ প্রযুক্তি"],
          totalStudents: 48,
          fullyLearned: 30,
          partiallyLearned: 12,
          notLearned: 6,
          status: "submitted",
          lastUpdated: "2025-04-07T13:40:00",
        },
        {
          id: "RPT-006",
          teacherName: "সালমা খাতুন",
          date: "2025-04-07",
          class: "৪",
          subjects: ["গণিত", "বিজ্ঞান"],
          totalStudents: 42,
          fullyLearned: 28,
          partiallyLearned: 10,
          notLearned: 4,
          status: "reviewed",
          lastUpdated: "2025-04-07T17:10:00",
        },
        {
          id: "RPT-007",
          teacherName: "কামাল হোসেন",
          date: "2025-04-06",
          class: "৬",
          subjects: ["সমাজ বিজ্ঞান", "ইসলাম শিক্ষা"],
          totalStudents: 45,
          fullyLearned: 32,
          partiallyLearned: 8,
          notLearned: 5,
          status: "submitted",
          lastUpdated: "2025-04-06T14:50:00",
        },
        {
          id: "RPT-008",
          teacherName: "শাহানা বেগম",
          date: "2025-04-05",
          class: "১",
          subjects: ["বাংলা", "গণিত"],
          totalStudents: 35,
          fullyLearned: 22,
          partiallyLearned: 10,
          notLearned: 3,
          status: "reviewed",
          lastUpdated: "2025-04-05T12:30:00",
        },
        {
          id: "RPT-009",
          teacherName: "আনোয়ার হোসেন",
          date: "2025-04-04",
          class: "৯",
          subjects: ["বিজ্ঞান", "ইংরেজি", "গণিত"],
          totalStudents: 52,
          fullyLearned: 35,
          partiallyLearned: 12,
          notLearned: 5,
          status: "draft",
          lastUpdated: "2025-04-04T10:20:00",
        },
        {
          id: "RPT-010",
          teacherName: "নাসরিন জাহান",
          date: "2025-04-03",
          class: "১০",
          subjects: ["গণিত", "বিজ্ঞান", "ইংরেজি"],
          totalStudents: 55,
          fullyLearned: 38,
          partiallyLearned: 12,
          notLearned: 5,
          status: "reviewed",
          lastUpdated: "2025-04-03T15:15:00",
        },
      ]

      setReports(mockReports)
      setFilteredReports(mockReports)
      setLoading(false)
    }, 1500)
  }, [])

  // Filter and sort reports
  useEffect(() => {
    let result = [...reports]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (report) =>
          report.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply class filter
    if (filterClass) {
      result = result.filter((report) => report.class === filterClass)
    }

    // Apply status filter
    if (filterStatus) {
      result = result.filter((report) => report.status === filterStatus)
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "teacherName":
          comparison = a.teacherName.localeCompare(b.teacherName)
          break
        case "class":
          comparison = a.class.localeCompare(b.class)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "learningRate":
          const rateA = (a.fullyLearned / a.totalStudents) * 100
          const rateB = (b.fullyLearned / b.totalStudents) * 100
          comparison = rateA - rateB
          break
        default:
          comparison = 0
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

    setFilteredReports(result)
  }, [reports, searchTerm, filterClass, filterStatus, sortBy, sortDirection])

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchorEl({ ...menuAnchorEl, [id]: event.currentTarget })
  }

  // Handle menu close
  const handleMenuClose = (id: string) => {
    setMenuAnchorEl({ ...menuAnchorEl, [id]: null })
  }

  // Handle filter menu
  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null)
  }

  // Handle sort menu
  const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget)
  }

  const handleSortMenuClose = () => {
    setSortAnchorEl(null)
  }

  // Handle class filter change
  const handleClassFilterChange = (event: SelectChangeEvent) => {
    setFilterClass(event.target.value)
  }

  // Handle status filter change
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setFilterStatus(event.target.value)
  }

  // Handle sort change
  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("desc")
    }
    setSortAnchorEl(null)
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = (report: Report) => {
    setSelectedReport(report)
    setDeleteDialogOpen(true)
    handleMenuClose(report.id)
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
  }

  const handleDeleteReport = () => {
    if (selectedReport) {
      // Simulate API call
      setLoading(true)
      setTimeout(() => {
        setReports(reports.filter((report) => report.id !== selectedReport.id))
        setSnackbar({
          open: true,
          message: "রিপোর্ট সফলভাবে মুছে ফেলা হয়েছে",
          severity: "success",
        })
        setDeleteDialogOpen(false)
        setLoading(false)
      }, 1000)
    }
  }

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Calculate learning rate
  const calculateLearningRate = (report: Report) => {
    return Math.round((report.fullyLearned / report.totalStudents) * 100)
  }

  // Get status chip color
  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "draft":
        return "default"
      case "submitted":
        return "primary"
      case "reviewed":
        return "success"
      default:
        return "default"
    }
  }

  // Get status chip label
  const getStatusChipLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "খসড়া"
      case "submitted":
        return "জমা দেওয়া"
      case "reviewed":
        return "পর্যালোচিত"
      default:
        return status
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <WarningIcon fontSize="small" />
      case "submitted":
        return <CheckCircleIcon fontSize="small" />
      case "reviewed":
        return <CheckCircleIcon fontSize="small" />
      default:
        return null
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Items per page
  const itemsPerPage = 5
  const paginatedReports = filteredReports.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            <SchoolIcon sx={{ mr: 1 }} />
            দৈনিক শ্রেণী প্রতিবেদন
          </Typography>

          <Tooltip title="নোটিফিকেশন">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="সাহায্য">
            <IconButton color="inherit">
              <HelpIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="সেটিংস">
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Avatar sx={{ bgcolor: "#ffffff", color: "#4f46e5", width: 36, height: 36 }}>A</Avatar>
            <Typography variant="subtitle2" sx={{ ml: 1, mr: 0.5, color: "#ffffff" }}>
              Admin
            </Typography>
            <IconButton size="small" color="inherit">
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <MuiLink
            component={Link}
            href="#"
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </MuiLink>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Daily Class Reports
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        {loading && (
          <LinearProgress
            sx={{
              height: 6,
              borderRadius: 3,
              mb: 4,
              backgroundColor: "#e2e8f0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4f46e5",
              },
            }}
          />
        )}

        <Zoom in={true} style={{ transitionDelay: "100ms" }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
              overflow: "hidden",
              mb: 4,
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#1e293b",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AssignmentIcon sx={{ mr: 1, color: "#4f46e5" }} />
                    দৈনিক শ্রেণী প্রতিবেদন তালিকা
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    সকল দৈনিক শ্রেণী প্রতিবেদন দেখুন, সম্পাদনা করুন এবং পরিচালনা করুন
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      component={Link}
                      href="/dashboard/super_admin/daily-class-report/add"
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                        boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)",
                        "&:hover": {
                          boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
                        },
                      }}
                    >
                      নতুন রিপোর্ট তৈরি করুন
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FileDownloadIcon />}
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        borderColor: "#6366f1",
                        color: "#4f46e5",
                        "&:hover": {
                          borderColor: "#4f46e5",
                          backgroundColor: "rgba(99, 102, 241, 0.04)",
                        },
                      }}
                    >
                      এক্সপোর্ট
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Zoom>

        <Zoom in={true} style={{ transitionDelay: "200ms" }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
              overflow: "hidden",
              mb: 4,
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="রিপোর্ট খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        backgroundColor: "#ffffff",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#6366f1",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4f46e5",
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#cbd5e1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                    <Button
                      variant="outlined"
                      startIcon={<FilterListIcon />}
                      onClick={handleFilterMenuOpen}
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        borderColor: "#cbd5e1",
                        color: "#475569",
                        "&:hover": {
                          borderColor: "#94a3b8",
                          backgroundColor: "rgba(203, 213, 225, 0.1)",
                        },
                      }}
                    >
                      ফিল্টার
                      {(filterClass || filterStatus) && (
                        <Badge
                          badgeContent={(filterClass ? 1 : 0) + (filterStatus ? 1 : 0)}
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<SortIcon />}
                      onClick={handleSortMenuOpen}
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        borderColor: "#cbd5e1",
                        color: "#475569",
                        "&:hover": {
                          borderColor: "#94a3b8",
                          backgroundColor: "rgba(203, 213, 225, 0.1)",
                        },
                      }}
                    >
                      সাজানো
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Zoom>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={isFilterMenuOpen}
          onClose={handleFilterMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              borderRadius: 2,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              width: 250,
              p: 2,
            },
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "#334155" }}>
            ফিল্টার অপশন
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, color: "#475569" }}>
              শ্রেণি
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={filterClass}
                onChange={handleClassFilterChange}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cbd5e1",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6366f1",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4f46e5",
                  },
                }}
              >
                <MenuItem value="">
                  <em>সকল শ্রেণি</em>
                </MenuItem>
                <MenuItem value="১">১</MenuItem>
                <MenuItem value="২">২</MenuItem>
                <MenuItem value="৩">৩</MenuItem>
                <MenuItem value="৪">৪</MenuItem>
                <MenuItem value="৫">৫</MenuItem>
                <MenuItem value="৬">৬</MenuItem>
                <MenuItem value="৭">৭</MenuItem>
                <MenuItem value="৮">৮</MenuItem>
                <MenuItem value="৯">৯</MenuItem>
                <MenuItem value="১০">১০</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, color: "#475569" }}>
              স্ট্যাটাস
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={filterStatus}
                onChange={handleStatusFilterChange}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cbd5e1",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6366f1",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4f46e5",
                  },
                }}
              >
                <MenuItem value="">
                  <em>সকল স্ট্যাটাস</em>
                </MenuItem>
                <MenuItem value="draft">খসড়া</MenuItem>
                <MenuItem value="submitted">জমা দেওয়া</MenuItem>
                <MenuItem value="reviewed">পর্যালোচিত</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setFilterClass("")
                setFilterStatus("")
                handleFilterMenuClose()
              }}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                mr: 1,
                borderColor: "#cbd5e1",
                color: "#475569",
              }}
            >
              রিসেট
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleFilterMenuClose}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              }}
            >
              প্রয়োগ করুন
            </Button>
          </Box>
        </Menu>

        {/* Sort Menu */}
        <Menu
          anchorEl={sortAnchorEl}
          open={isSortMenuOpen}
          onClose={handleSortMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              borderRadius: 2,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              width: 200,
              p: 2,
            },
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "#334155" }}>
            সাজানোর অপশন
          </Typography>
          <MenuItem
            onClick={() => handleSortChange("date")}
            sx={{
              borderRadius: 1,
              mb: 1,
              color: sortBy === "date" ? "#4f46e5" : "#475569",
              backgroundColor: sortBy === "date" ? "rgba(99, 102, 241, 0.08)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.08)",
              },
            }}
          >
            <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
            তারিখ {sortBy === "date" && (sortDirection === "asc" ? "↑" : "↓")}
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange("teacherName")}
            sx={{
              borderRadius: 1,
              mb: 1,
              color: sortBy === "teacherName" ? "#4f46e5" : "#475569",
              backgroundColor: sortBy === "teacherName" ? "rgba(99, 102, 241, 0.08)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.08)",
              },
            }}
          >
            <PersonIcon fontSize="small" sx={{ mr: 1 }} />
            শিক্ষকের নাম {sortBy === "teacherName" && (sortDirection === "asc" ? "↑" : "↓")}
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange("class")}
            sx={{
              borderRadius: 1,
              mb: 1,
              color: sortBy === "class" ? "#4f46e5" : "#475569",
              backgroundColor: sortBy === "class" ? "rgba(99, 102, 241, 0.08)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.08)",
              },
            }}
          >
            <ClassIcon fontSize="small" sx={{ mr: 1 }} />
            শ্রেণি {sortBy === "class" && (sortDirection === "asc" ? "↑" : "↓")}
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange("status")}
            sx={{
              borderRadius: 1,
              mb: 1,
              color: sortBy === "status" ? "#4f46e5" : "#475569",
              backgroundColor: sortBy === "status" ? "rgba(99, 102, 241, 0.08)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.08)",
              },
            }}
          >
            <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
            স্ট্যাটাস {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange("learningRate")}
            sx={{
              borderRadius: 1,
              color: sortBy === "learningRate" ? "#4f46e5" : "#475569",
              backgroundColor: sortBy === "learningRate" ? "rgba(99, 102, 241, 0.08)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.08)",
              },
            }}
          >
            <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />
            শিখন হার {sortBy === "learningRate" && (sortDirection === "asc" ? "↑" : "↓")}
          </MenuItem>
        </Menu>

        {/* Reports Table */}
        <Zoom in={true} style={{ transitionDelay: "300ms" }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
              overflow: "hidden",
              mb: 4,
            }}
          >
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }} aria-label="daily class reports table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #cbd5e1",
                        color: "#334155",
                        py: 2,
                      }}
                    >
                      রিপোর্ট আইডি
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #cbd5e1",
                        color: "#334155",
                        py: 2,
                      }}
                    >
                      শিক্ষকের নাম
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #cbd5e1",
                        color: "#334155",
                        py: 2,
                      }}
                    >
                      তারিখ
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #cbd5e1",
                        color: "#334155",
                        py: 2,
                      }}
                    >
                      শ্রেণি
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #cbd5e1",
                        color: "#334155",
                        py: 2,
                      }}
                    >
                      বিষয়সমূহ
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #cbd5e1",
                        color: "#334155",
                        py: 2,
                      }}
                    >
                      শিখন হার
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #cbd5e1",
                        color: "#334155",
                        py: 2,
                      }}
                    >
                      স্ট্যাটাস
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #cbd5e1",
                        color: "#334155",
                        py: 2,
                      }}
                    >
                      অ্যাকশন
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedReports.length > 0 ? (
                    paginatedReports.map((report, index) => (
                      <Fade key={report.id} in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                        <TableRow
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: "#f8fafc",
                            },
                            "&:hover": {
                              backgroundColor: "#f1f5f9",
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: 500,
                              color: "#4f46e5",
                            }}
                          >
                            {report.id}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#334155",
                              fontWeight: 500,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  bgcolor: "#e0e7ff",
                                  color: "#4f46e5",
                                  fontSize: "0.875rem",
                                  mr: 1.5,
                                }}
                              >
                                {report.teacherName.charAt(0)}
                              </Avatar>
                              {report.teacherName}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: "#475569" }}>{formatDate(report.date)}</TableCell>
                          <TableCell sx={{ color: "#475569" }}>
                            <Chip
                              label={`শ্রেণি ${report.class}`}
                              size="small"
                              sx={{
                                bgcolor: "#e0e7ff",
                                color: "#4338ca",
                                fontWeight: 500,
                                borderRadius: "6px",
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: "#475569" }}>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {report.subjects.map((subject, idx) => (
                                <Chip
                                  key={idx}
                                  label={subject}
                                  size="small"
                                  sx={{
                                    bgcolor: "#f1f5f9",
                                    color: "#475569",
                                    fontSize: "0.75rem",
                                    height: "24px",
                                  }}
                                />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Chip
                                label={`${calculateLearningRate(report)}%`}
                                size="small"
                                color={
                                  calculateLearningRate(report) > 70
                                    ? "success"
                                    : calculateLearningRate(report) > 40
                                      ? "warning"
                                      : "error"
                                }
                                sx={{ fontWeight: 600 }}
                              />
                              <Typography variant="caption" sx={{ ml: 1, color: "#64748b" }}>
                                ({report.fullyLearned}/{report.totalStudents})
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(report.status)}
                              label={getStatusChipLabel(report.status)}
                              size="small"
                              color={getStatusChipColor(report.status) as any}
                              variant="filled"
                              sx={{ fontWeight: 500 }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                              <Tooltip title="দেখুন">
                                <IconButton
                                  size="small"
                                  component={Link}
                                  href={`/daily-class-report/${report.id}`}
                                  sx={{ color: "#6366f1" }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="সম্পাদনা করুন">
                                <IconButton
                                  size="small"
                                  component={Link}
                                  href={`/daily-class-report/${report.id}/edit`}
                                  sx={{ color: "#6366f1" }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="আরও">
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleMenuOpen(e, report.id)}
                                  sx={{ color: "#6366f1" }}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Menu
                                anchorEl={menuAnchorEl[report.id]}
                                open={isMenuOpen(report.id)}
                                onClose={() => handleMenuClose(report.id)}
                                PaperProps={{
                                  sx: {
                                    mt: 1.5,
                                    borderRadius: 2,
                                    boxShadow:
                                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                  },
                                }}
                              >
                                <MenuItem
                                  onClick={() => {
                                    handleMenuClose(report.id)
                                    window.open(`/daily-class-report/${report.id}/print`, "_blank")
                                  }}
                                  sx={{ borderRadius: 1 }}
                                >
                                  <PrintIcon fontSize="small" sx={{ mr: 1 }} />
                                  প্রিন্ট করুন
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleDeleteDialogOpen(report)}
                                  sx={{ color: "#ef4444", borderRadius: 1 }}
                                >
                                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                                  মুছে ফেলুন
                                </MenuItem>
                              </Menu>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                          <AssignmentIcon sx={{ fontSize: 48, color: "#94a3b8", mb: 2 }} />
                          <Typography variant="h6" sx={{ color: "#475569", mb: 1 }}>
                            কোন রিপোর্ট পাওয়া যায়নি
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#64748b", mb: 3, textAlign: "center" }}>
                            আপনার অনুসন্ধান মানদণ্ড অনুযায়ী কোন রিপোর্ট পাওয়া যায়নি। অনুগ্রহ করে আপনার ফিল্টার পরিবর্তন করুন বা নতুন রিপোর্ট
                            তৈরি করুন।
                          </Typography>
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            component={Link}
                            href="/daily-class-report/new"
                            sx={{
                              borderRadius: "8px",
                              textTransform: "none",
                              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                              boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)",
                              "&:hover": {
                                boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
                              },
                            }}
                          >
                            নতুন রিপোর্ট তৈরি করুন
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Zoom>

        {/* Pagination */}
        {filteredReports.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredReports.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 1.5,
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#4f46e5",
                  "&:hover": {
                    backgroundColor: "#4338ca",
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              maxWidth: 400,
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, color: "#ef4444" }}>রিপোর্ট মুছে ফেলুন</DialogTitle>
          <DialogContent>
            <DialogContentText>
              আপনি কি নিশ্চিত যে আপনি এই রিপোর্টটি মুছে ফেলতে চান? এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button
              onClick={handleDeleteDialogClose}
              variant="outlined"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                borderColor: "#cbd5e1",
                color: "#475569",
              }}
            >
              বাতিল করুন
            </Button>
            <Button
              onClick={handleDeleteReport}
              variant="contained"
              color="error"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              মুছে ফেলুন
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}
