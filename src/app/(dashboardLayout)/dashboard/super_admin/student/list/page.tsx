"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Print,
  FileDownload,
  Refresh,
  School,
  Person,
} from "@mui/icons-material"
import Link from "next/link"

// Mock data for students
const mockStudents = [
  {
    id: "STD001",
    name: "John Smith",
    class: "Class 3",
    section: "Section A",
    roll: "101",
    gender: "Male",
    mobile: "1234567890",
    guardianName: "Robert Smith",
    guardianMobile: "9876543210",
    status: "Active",
    admissionDate: "2023-01-15",
    image: null,
  },
  {
    id: "STD002",
    name: "Emily Johnson",
    class: "Class 2",
    section: "Section B",
    roll: "102",
    gender: "Female",
    mobile: "2345678901",
    guardianName: "Michael Johnson",
    guardianMobile: "8765432109",
    status: "Active",
    admissionDate: "2023-02-10",
    image: null,
  },
  {
    id: "STD003",
    name: "David Williams",
    class: "Class 1",
    section: "Section A",
    roll: "103",
    gender: "Male",
    mobile: "3456789012",
    guardianName: "James Williams",
    guardianMobile: "7654321098",
    status: "Inactive",
    admissionDate: "2023-03-05",
    image: null,
  },
  {
    id: "STD004",
    name: "Sarah Brown",
    class: "Class 3",
    section: "Section C",
    roll: "104",
    gender: "Female",
    mobile: "4567890123",
    guardianName: "Jennifer Brown",
    guardianMobile: "6543210987",
    status: "Active",
    admissionDate: "2023-01-20",
    image: null,
  },
  {
    id: "STD005",
    name: "Michael Davis",
    class: "Class 2",
    section: "Section A",
    roll: "105",
    gender: "Male",
    mobile: "5678901234",
    guardianName: "Christopher Davis",
    guardianMobile: "5432109876",
    status: "Active",
    admissionDate: "2023-02-15",
    image: null,
  },
  {
    id: "STD006",
    name: "Jessica Miller",
    class: "Class 1",
    section: "Section B",
    roll: "106",
    gender: "Female",
    mobile: "6789012345",
    guardianName: "Daniel Miller",
    guardianMobile: "4321098765",
    status: "Graduated",
    admissionDate: "2023-03-10",
    image: null,
  },
  {
    id: "STD007",
    name: "Andrew Wilson",
    class: "Class 3",
    section: "Section B",
    roll: "107",
    gender: "Male",
    mobile: "7890123456",
    guardianName: "Thomas Wilson",
    guardianMobile: "3210987654",
    status: "Active",
    admissionDate: "2023-01-25",
    image: null,
  },
  {
    id: "STD008",
    name: "Olivia Moore",
    class: "Class 2",
    section: "Section C",
    roll: "108",
    gender: "Female",
    mobile: "8901234567",
    guardianName: "William Moore",
    guardianMobile: "2109876543",
    status: "Active",
    admissionDate: "2023-02-20",
    image: null,
  },
  {
    id: "STD009",
    name: "Ethan Taylor",
    class: "Class 1",
    section: "Section A",
    roll: "109",
    gender: "Male",
    mobile: "9012345678",
    guardianName: "Joseph Taylor",
    guardianMobile: "1098765432",
    status: "Inactive",
    admissionDate: "2023-03-15",
    image: null,
  },
  {
    id: "STD010",
    name: "Sophia Anderson",
    class: "Class 3",
    section: "Section A",
    roll: "110",
    gender: "Female",
    mobile: "0123456789",
    guardianName: "Richard Anderson",
    guardianMobile: "0987654321",
    status: "Active",
    admissionDate: "2023-01-30",
    image: null,
  },
]

const StudentList = () => {
  const theme = useTheme()
  const [students, setStudents] = useState(mockStudents)
  const [filteredStudents, setFilteredStudents] = useState(mockStudents)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    class: "",
    section: "",
    status: "",
    gender: "",
  })

  // Handle search
  useEffect(() => {
    const results = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.mobile.includes(searchTerm) ||
        student.guardianMobile.includes(searchTerm),
    )
    setFilteredStudents(results)
    setPage(0)
  }, [searchTerm, students])

  // Handle filters
  useEffect(() => {
    let results = [...students]

    if (filters.class) {
      results = results.filter((student) => student.class === filters.class)
    }
    if (filters.section) {
      results = results.filter((student) => student.section === filters.section)
    }
    if (filters.status) {
      results = results.filter((student) => student.status === filters.status)
    }
    if (filters.gender) {
      results = results.filter((student) => student.gender === filters.gender)
    }

    setFilteredStudents(results)
    setPage(0)
  }, [filters, students])

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      class: "",
      section: "",
      status: "",
      gender: "",
    })
    setSearchTerm("")
  }

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Delete student
  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id)
    setStudents(updatedStudents)
  }

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "error"
      case "Graduated":
        return "info"
      default:
        return "default"
    }
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ mb: 3, bgcolor: theme.palette.primary.main, color: "white", py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <School sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            Student List
          </Typography>
        </Box>
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, ID, guardian, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setShowFilters(!showFilters)}
                  color={showFilters ? "primary" : "inherit"}
                >
                  Filters
                </Button>
                <Button variant="outlined" startIcon={<Print />}>
                  Print
                </Button>
                <Button variant="outlined" startIcon={<FileDownload />}>
                  Export
                </Button>
                <Button variant="outlined" startIcon={<Refresh />} onClick={resetFilters}>
                  Reset
                </Button>
                <Button component={Link} href='/dashboard/super_admin/student/create' variant="contained" startIcon={<Add />} color="primary">
                  Add Student
                </Button>
              </Box>
            </Grid>
          </Grid>

          {showFilters && (
            <Box sx={{ mb: 3, p: 2, bgcolor: "background.paper", borderRadius: 1, border: "1px solid #e0e0e0" }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Advanced Filters
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Class</InputLabel>
                    <Select name="class" value={filters.class} label="Class" onChange={handleFilterChange}>
                      <MenuItem value="">All Classes</MenuItem>
                      <MenuItem value="Class 1">Class 1</MenuItem>
                      <MenuItem value="Class 2">Class 2</MenuItem>
                      <MenuItem value="Class 3">Class 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Section</InputLabel>
                    <Select name="section" value={filters.section} label="Section" onChange={handleFilterChange}>
                      <MenuItem value="">All Sections</MenuItem>
                      <MenuItem value="Section A">Section A</MenuItem>
                      <MenuItem value="Section B">Section B</MenuItem>
                      <MenuItem value="Section C">Section C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select name="status" value={filters.status} label="Status" onChange={handleFilterChange}>
                      <MenuItem value="">All Status</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Graduated">Graduated</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={filters.gender} label="Gender" onChange={handleFilterChange}>
                      <MenuItem value="">All Genders</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                  <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Class</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Roll</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Guardian</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              bgcolor: theme.palette.primary.light,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mr: 1,
                            }}
                          >
                            <Person />
                          </Box>
                          <Box>
                            <Typography variant="body1">{student.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {student.gender}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {student.class}
                        <Typography variant="caption" color="text.secondary" display="block">
                          {student.section}
                        </Typography>
                      </TableCell>
                      <TableCell>{student.roll}</TableCell>
                      <TableCell>{student.guardianName}</TableCell>
                      <TableCell>
                        {student.mobile}
                        <Typography variant="caption" color="text.secondary" display="block">
                          {student.guardianMobile}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={student.status} size="small" color={getStatusColor(student.status)} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex" }}>
                          <Tooltip title="View">
                            <IconButton size="small" color="info">
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="primary">
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error" onClick={() => handleDeleteStudent(student.id)}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1">No students found</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your search or filter criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Card sx={{ width: "48%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Student Statistics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, bgcolor: theme.palette.success.light, color: "white", borderRadius: 2 }}
                >
                  <Typography variant="h4">{students.filter((s) => s.status === "Active").length}</Typography>
                  <Typography variant="body2">Active Students</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: theme.palette.error.light, color: "white", borderRadius: 2 }}>
                  <Typography variant="h4">{students.filter((s) => s.status === "Inactive").length}</Typography>
                  <Typography variant="body2">Inactive Students</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: theme.palette.info.light, color: "white", borderRadius: 2 }}>
                  <Typography variant="h4">{students.filter((s) => s.gender === "Male").length}</Typography>
                  <Typography variant="body2">Male Students</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, bgcolor: theme.palette.warning.light, color: "white", borderRadius: 2 }}
                >
                  <Typography variant="h4">{students.filter((s) => s.gender === "Female").length}</Typography>
                  <Typography variant="body2">Female Students</Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ width: "48%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Class Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, bgcolor: theme.palette.primary.light, color: "white", borderRadius: 2 }}
                >
                  <Typography variant="h4">{students.filter((s) => s.class === "Class 1").length}</Typography>
                  <Typography variant="body2">Class 1</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, bgcolor: theme.palette.secondary.light, color: "white", borderRadius: 2 }}
                >
                  <Typography variant="h4">{students.filter((s) => s.class === "Class 2").length}</Typography>
                  <Typography variant="body2">Class 2</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, bgcolor: theme.palette.success.light, color: "white", borderRadius: 2 }}
                >
                  <Typography variant="h4">{students.filter((s) => s.class === "Class 3").length}</Typography>
                  <Typography variant="body2">Class 3</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: theme.palette.info.light, color: "white", borderRadius: 2 }}>
                  <Typography variant="h4">{students.filter((s) => s.section === "Section A").length}</Typography>
                  <Typography variant="body2">Section A</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, bgcolor: theme.palette.warning.light, color: "white", borderRadius: 2 }}
                >
                  <Typography variant="h4">{students.filter((s) => s.section === "Section B").length}</Typography>
                  <Typography variant="body2">Section B</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: theme.palette.error.light, color: "white", borderRadius: 2 }}>
                  <Typography variant="h4">{students.filter((s) => s.section === "Section C").length}</Typography>
                  <Typography variant="body2">Section C</Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default StudentList
