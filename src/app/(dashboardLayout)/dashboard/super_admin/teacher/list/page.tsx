"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Rating,
  LinearProgress,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Search as SearchIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  ViewKanban as KanbanViewIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  transition: "all 0.3s ease-in-out",
  borderRadius: 16,
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 70px rgba(0, 0, 0, 0.2)",
  },
}))

const GradientHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
  padding: theme.spacing(4, 0),
  borderRadius: "0 0 24px 24px",
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: 'url("/placeholder.svg?height=200&width=1000") center/cover no-repeat',
    opacity: 0.1,
  },
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor:
    status === "active"
      ? alpha(theme.palette.success.main, 0.1)
      : status === "on leave"
        ? alpha(theme.palette.warning.main, 0.1)
        : alpha(theme.palette.error.main, 0.1),
  color:
    status === "active"
      ? theme.palette.success.dark
      : status === "on leave"
        ? theme.palette.warning.dark
        : theme.palette.error.dark,
  fontWeight: 600,
  borderRadius: 8,
}))

const DepartmentChip = styled(Chip)(({ theme, color }) => ({
  backgroundColor: alpha(color, 0.1),
  color: color,
  fontWeight: 500,
  borderRadius: 8,
}))

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)",
    },
    "&.Mui-focused": {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.16)",
    },
  },
}))

const ViewToggleButton = styled(Button)(({ theme, active }) => ({
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 600 : 400,
  "&:hover": {
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.action.hover, 0.1),
  },
}))

const PerformanceIndicator = styled(Box)(({ theme, value }) => ({
  position: "relative",
  height: 4,
  width: "100%",
  backgroundColor: alpha(theme.palette.grey[300], 0.5),
  borderRadius: 2,
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: `${value}%`,
    backgroundColor:
      value > 80 ? theme.palette.success.main : value > 50 ? theme.palette.warning.main : theme.palette.error.main,
    borderRadius: 2,
  },
}))

// Mock data
const departmentColors = {
  Mathematics: "#3a7bd5",
  Science: "#00d2ff",
  English: "#6a11cb",
  History: "#fc4a1a",
  "Computer Science": "#00b09b",
  "Physical Education": "#f46b45",
  Art: "#c471ed",
  Music: "#12c2e9",
}

const generateTeachers = (count) => {
  const departments = Object.keys(departmentColors)
  const statuses = ["active", "on leave", "inactive"]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Dr. ${["John Smith", "Emma Wilson", "Michael Brown", "Sarah Davis", "Robert Johnson", "Jennifer Lee", "David Miller", "Lisa Anderson", "James Taylor", "Patricia Moore"][i % 10]}`,
    avatar: `/placeholder.svg?height=200&width=200&text=${i + 1}`,
    department: departments[i % departments.length],
    status: statuses[Math.floor(Math.random() * 3)],
    email: `teacher${i + 1}@school.edu`,
    phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    subjects: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      (_, j) =>
        [
          "Algebra",
          "Calculus",
          "Biology",
          "Chemistry",
          "Literature",
          "Grammar",
          "World History",
          "Programming",
          "Physical Training",
          "Drawing",
          "Music Theory",
        ][Math.floor(Math.random() * 11)],
    ),
    classes: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      (_, j) => `Grade ${Math.floor(Math.random() * 12) + 1}${["A", "B", "C"][Math.floor(Math.random() * 3)]}`,
    ),
    experience: Math.floor(Math.random() * 20) + 1,
    rating: (Math.random() * 2 + 3).toFixed(1),
    performance: Math.floor(Math.random() * 100),
    students: Math.floor(Math.random() * 200) + 50,
    joinDate: new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
    qualifications: ["Ph.D.", "M.Ed.", "B.Ed.", "M.Sc.", "B.Sc."][Math.floor(Math.random() * 5)],
  }))
}

export default function TeachersDashboard() {
  const theme = useTheme()
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedTeachers, setSelectedTeachers] = useState([])
  const [filterDepartment, setFilterDepartment] = useState("all")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTeachers(generateTeachers(24))
      setLoading(false)
    }, 1000)
  }, [])

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSortClose = () => {
    setAnchorEl(null)
  }

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("asc")
    }
    handleSortClose()
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)

    if (newValue === 0) {
      setFilterDepartment("all")
    } else {
      const department = Object.keys(departmentColors)[newValue - 1]
      setFilterDepartment(department)
    }
  }

  const filteredTeachers = teachers
    .filter(
      (teacher) =>
        (searchQuery === "" ||
          teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.department.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterDepartment === "all" || teacher.department === filterDepartment),
    )
    .sort((a, b) => {
      let comparison = 0

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "department") {
        comparison = a.department.localeCompare(b.department)
      } else if (sortBy === "experience") {
        comparison = a.experience - b.experience
      } else if (sortBy === "rating") {
        comparison = a.rating - b.rating
      } else if (sortBy === "performance") {
        comparison = a.performance - b.performance
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setTeachers(generateTeachers(24))
      setLoading(false)
    }, 1000)
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <GradientHeader>
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
                  Teacher Management
                </Typography>
                <Typography variant="h6" fontWeight={400} color="white" sx={{ opacity: 0.8 }}>
                  Manage your teaching staff with our powerful dashboard
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 2 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      bgcolor: "white",
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      "&:hover": { bgcolor: alpha("#ffffff", 0.9) },
                    }}
                  >
                    Add Teacher
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <IconButton
                    sx={{
                      bgcolor: alpha("#ffffff", 0.2),
                      color: "white",
                      "&:hover": { bgcolor: alpha("#ffffff", 0.3) },
                    }}
                    onClick={handleRefresh}
                  >
                    <RefreshIcon />
                  </IconButton>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </GradientHeader>

      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                mb: 4,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <SearchField
                    fullWidth
                    placeholder="Search teachers by name, email, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 1 }}>
                    <ViewToggleButton
                      startIcon={<GridViewIcon />}
                      active={viewMode === "grid"}
                      onClick={() => setViewMode("grid")}
                    >
                      Grid
                    </ViewToggleButton>
                    <ViewToggleButton
                      startIcon={<ListViewIcon />}
                      active={viewMode === "list"}
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </ViewToggleButton>
                    <ViewToggleButton
                      startIcon={<KanbanViewIcon />}
                      active={viewMode === "kanban"}
                      onClick={() => setViewMode("kanban")}
                    >
                      Kanban
                    </ViewToggleButton>
                    <Tooltip title="Sort options">
                      <IconButton onClick={handleSortClick}>
                        <SortIcon />
                      </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleSortClose}>
                      <MenuItem onClick={() => handleSortChange("name")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Name</Typography>
                          {sortBy === "name" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => handleSortChange("department")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Department</Typography>
                          {sortBy === "department" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => handleSortChange("experience")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Experience</Typography>
                          {sortBy === "experience" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => handleSortChange("rating")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Rating</Typography>
                          {sortBy === "rating" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => handleSortChange("performance")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Performance</Typography>
                          {sortBy === "performance" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                    </Menu>
                    <Tooltip title="Export">
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Print">
                      <IconButton>
                        <PrintIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    minWidth: "auto",
                    px: 3,
                  },
                  "& .Mui-selected": {
                    fontWeight: 700,
                  },
                }}
              >
                <Tab label="All Departments" />
                {Object.keys(departmentColors).map((dept, index) => (
                  <Tab
                    key={dept}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: departmentColors[dept],
                          }}
                        />
                        {dept}
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>
          </Grid>

          {loading ? (
            <Grid item xs={12}>
              <Box sx={{ p: 4, textAlign: "center" }}>
                <LinearProgress sx={{ mb: 2, height: 6, borderRadius: 3 }} />
                <Typography variant="h6" color="text.secondary">
                  Loading teachers...
                </Typography>
              </Box>
            </Grid>
          ) : filteredTeachers.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ p: 8, textAlign: "center" }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No teachers found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filters
                </Typography>
              </Box>
            </Grid>
          ) : viewMode === "grid" ? (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {filteredTeachers.map((teacher, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={teacher.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <StyledCard>
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="div"
                            sx={{
                              height: 100,
                              backgroundColor: departmentColors[teacher.department],
                              position: "relative",
                            }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: 50,
                              left: "50%",
                              transform: "translateX(-50%)",
                              zIndex: 1,
                            }}
                          >
                            {teacher.status === "active" ? (
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                              >
                                <Avatar
                                  src={teacher.avatar}
                                  sx={{ width: 80, height: 80, border: "4px solid white" }}
                                />
                              </StyledBadge>
                            ) : (
                              <Avatar src={teacher.avatar} sx={{ width: 80, height: 80, border: "4px solid white" }} />
                            )}
                          </Box>
                        </Box>
                        <CardContent sx={{ pt: 5, pb: 2 }}>
                          <Box sx={{ textAlign: "center", mb: 2 }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                              {teacher.name}
                            </Typography>
                            <DepartmentChip
                              label={teacher.department}
                              size="small"
                              color={departmentColors[teacher.department]}
                            />
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <SchoolIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                {teacher.qualifications}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <WorkIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                {teacher.experience} years experience
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <GroupIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                {teacher.students} students
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight={500} gutterBottom>
                              Performance
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <PerformanceIndicator value={teacher.performance} />
                              <Typography variant="body2" fontWeight={600}>
                                {teacher.performance}%
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                            {teacher.subjects.map((subject) => (
                              <Chip
                                key={subject}
                                label={subject}
                                size="small"
                                sx={{
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  fontSize: "0.7rem",
                                }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating value={Number.parseFloat(teacher.rating)} precision={0.5} size="small" readOnly />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {teacher.rating}
                            </Typography>
                          </Box>
                          <StatusChip
                            label={teacher.status}
                            size="small"
                            status={teacher.status}
                            icon={
                              teacher.status === "active" ? (
                                <CheckCircleIcon fontSize="small" />
                              ) : (
                                <CancelIcon fontSize="small" />
                              )
                            }
                          />
                        </CardActions>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.9)",
                              "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </StyledCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : viewMode === "list" ? (
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Box sx={{ width: "100%", overflow: "auto" }}>
                  <Box sx={{ minWidth: 1000 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "50px 250px 150px 150px 100px 100px 100px 100px",
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        p: 2,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        #
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Teacher
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Department
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Contact
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Experience
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Rating
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Performance
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Status
                      </Typography>
                    </Box>
                    <Divider />
                    {filteredTeachers.map((teacher, index) => (
                      <motion.div
                        key={teacher.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                      >
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "50px 250px 150px 150px 100px 100px 100px 100px",
                            p: 2,
                            alignItems: "center",
                            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          <Typography variant="body2">{teacher.id}</Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            {teacher.status === "active" ? (
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                              >
                                <Avatar src={teacher.avatar} sx={{ width: 40, height: 40 }} />
                              </StyledBadge>
                            ) : (
                              <Avatar src={teacher.avatar} sx={{ width: 40, height: 40 }} />
                            )}
                            <Box>
                              <Typography variant="body1" fontWeight={500}>
                                {teacher.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {teacher.email}
                              </Typography>
                            </Box>
                          </Box>
                          <DepartmentChip
                            label={teacher.department}
                            size="small"
                            color={departmentColors[teacher.department]}
                          />
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <MailIcon fontSize="small" sx={{ color: "text.secondary", fontSize: 16 }} />
                              <Typography variant="body2" color="text.secondary">
                                Email
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <PhoneIcon fontSize="small" sx={{ color: "text.secondary", fontSize: 16 }} />
                              <Typography variant="body2" color="text.secondary">
                                Call
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Typography variant="body2" fontWeight={500}>
                              {teacher.experience} years
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating value={Number.parseFloat(teacher.rating)} precision={0.5} size="small" readOnly />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <PerformanceIndicator value={teacher.performance} />
                            <Typography variant="body2" fontWeight={600}>
                              {teacher.performance}%
                            </Typography>
                          </Box>
                          <StatusChip label={teacher.status} size="small" status={teacher.status} />
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {["active", "on leave", "inactive"].map((status) => (
                  <Grid item xs={12} md={4} key={status}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        height: "100%",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <StatusChip
                            label={status.charAt(0).toUpperCase() + status.slice(1)}
                            size="small"
                            status={status}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {filteredTeachers.filter((t) => t.status === status).length} teachers
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <Box sx={{ height: "calc(100vh - 350px)", overflow: "auto", pr: 1 }}>
                        {filteredTeachers
                          .filter((teacher) => teacher.status === status)
                          .map((teacher, index) => (
                            <motion.div
                              key={teacher.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2,
                                  mb: 2,
                                  borderRadius: 2,
                                  border: `1px solid ${theme.palette.divider}`,
                                  "&:hover": {
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                    borderColor: "transparent",
                                  },
                                }}
                              >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                                  {teacher.status === "active" ? (
                                    <StyledBadge
                                      overlap="circular"
                                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                      variant="dot"
                                    >
                                      <Avatar src={teacher.avatar} sx={{ width: 40, height: 40 }} />
                                    </StyledBadge>
                                  ) : (
                                    <Avatar src={teacher.avatar} sx={{ width: 40, height: 40 }} />
                                  )}
                                  <Box>
                                    <Typography variant="body1" fontWeight={500}>
                                      {teacher.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {teacher.department}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
                                  {teacher.subjects.map((subject) => (
                                    <Chip
                                      key={subject}
                                      label={subject}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        fontSize: "0.7rem",
                                      }}
                                    />
                                  ))}
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Rating
                                      value={Number.parseFloat(teacher.rating)}
                                      precision={0.5}
                                      size="small"
                                      readOnly
                                    />
                                  </Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {teacher.experience} years
                                  </Typography>
                                </Box>
                              </Paper>
                            </motion.div>
                          ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  )
}
