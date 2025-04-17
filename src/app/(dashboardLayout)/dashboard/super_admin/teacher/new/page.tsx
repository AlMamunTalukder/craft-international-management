"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
  Checkbox,
  Paper,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  InputLabel,
} from "@mui/material"
import {
  AccountCircle,
  Badge,
  CalendarMonth,
  Email,
  Phone,
  Home,
  AttachMoney,
  Language,
  Facebook,
  Twitter,
  YouTube,
  LinkedIn,
  Upload,
  Save,
  ArrowBack,
  ArrowForward,
  Check,
  LocationOn,
  BloodtypeOutlined,
  Wc,
  CardMembership,
  Fingerprint,
  Apartment,
  BusinessCenter,
  EventNote,
  ContactPhone,
  Add,
} from "@mui/icons-material"

// Steps for the stepper
const steps = [
  "Personal Information",
  "Address Details",
  "Professional Information",
  "Qualifications & Skills",
  "Additional Information",
  "Review & Submit",
]

// Blood group options
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

// Gender options
const genders = ["Male", "Female", "Other", "Prefer not to say"]

// Staff types
const staffTypes = ["Full-time", "Part-time", "Contract", "Visiting"]

// Residence types
const residenceTypes = ["Residential", "Non-residential"]

// Languages
const languages = ["English", "Spanish", "French", "German", "Chinese", "Arabic", "Hindi", "Bengali", "Other"]

// Subjects
const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
  "Geography",
  "Economics",
  "Business Studies",
  "Physical Education",
  "Art",
  "Music",
  "Foreign Languages",
  "Social Studies",
  "Religious Studies",
  "Other",
]

// Departments
const departments = [
  "Science",
  "Mathematics",
  "Languages",
  "Humanities",
  "Arts",
  "Physical Education",
  "Computer Science",
  "Administration",
  "Support Staff",
]

// Designations
const designations = [
  "Principal",
  "Vice Principal",
  "Head of Department",
  "Senior Teacher",
  "Teacher",
  "Assistant Teacher",
  "Lab Assistant",
  "Librarian",
  "Counselor",
  "Administrative Staff",
]

export default function TeacherRegistration() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [sameAsPermAddress, setSameAsPermAddress] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [previewImage, setPreviewImage] = useState(null)

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    teacherId: "",
    teacherSerial: "",
    name: "",
    englishName: "",
    phone: "",
    email: "",
    smartIdCard: "",
    bloodGroup: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    religion: "",
    maritalStatus: "",

    // Address Information
    permanentAddress: {
      address: "",
      village: "",
      postOffice: "",
      thana: "",
      district: "",
      state: "",
      country: "",
      zipCode: "",
    },
    currentAddress: {
      address: "",
      village: "",
      postOffice: "",
      thana: "",
      district: "",
      state: "",
      country: "",
      zipCode: "",
    },

    // Professional Information
    designation: "",
    department: "",
    joiningDate: "",
    monthlySalary: "",
    staffType: "",
    residenceType: "",
    subjectsTaught: [],
    classesAssigned: [],

    // Qualifications & Skills
    education: [{ degree: "", institution: "", year: "", specialization: "" }],
    certifications: [{ name: "", issuedBy: "", year: "", description: "" }],
    skills: [],
    experience: [{ organization: "", position: "", from: "", to: "", description: "" }],

    // Additional Information
    emergencyContact: {
      name: "",
      relation: "",
      phone: "",
    },
    socialMedia: {
      facebook: "",
      twitter: "",
      youtube: "",
      linkedin: "",
      instagram: "",
    },
    status: "Active",
    language: "",
    activeSession: "",
    bankDetails: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      ifscCode: "",
    },
  })

  // Handle form input changes
  const handleInputChange = (e, section = null, index = null) => {
    const { name, value } = e.target

    if (section) {
      if (index !== null) {
        // For array fields like education, certifications, experience
        setFormData((prev) => {
          const newArray = [...prev[section]]
          newArray[index] = { ...newArray[index], [name]: value }
          return { ...prev, [section]: newArray }
        })
      } else {
        // For nested objects like permanentAddress, currentAddress
        setFormData((prev) => ({
          ...prev,
          [section]: { ...prev[section], [name]: value },
        }))
      }
    } else {
      // For direct fields
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle file upload for profile image
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle same as permanent address checkbox
  const handleSameAddressChange = (e) => {
    setSameAsPermAddress(e.target.checked)
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        currentAddress: { ...prev.permanentAddress },
      }))
    }
  }

  // Handle subject selection
  const handleSubjectChange = (e) => {
    setSelectedSubjects(e.target.value)
    setFormData((prev) => ({
      ...prev,
      subjectsTaught: e.target.value,
    }))
  }

  // Add new education entry
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "", specialization: "" }],
    }))
  }

  // Remove education entry
  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  // Add new certification entry
  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuedBy: "", year: "", description: "" }],
    }))
  }

  // Remove certification entry
  const removeCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  // Add new experience entry
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { organization: "", position: "", from: "", to: "", description: "" }],
    }))
  }

  // Remove experience entry
  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setOpenSnackbar(true)
    // Here you would typically send the data to your backend
  }

  // Render form content based on active step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Basic Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Teacher ID"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Fingerprint color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Teacher Serial"
                  name="teacherSerial"
                  value={formData.teacherSerial}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Badge color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Smart ID Card"
                  name="smartIdCard"
                  value={formData.smartIdCard}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CardMembership color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="English Name (if different)"
                  name="englishName"
                  value={formData.englishName}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth required>
                  <InputLabel id="blood-group-label">Blood Group</InputLabel>
                  <Select
                    labelId="blood-group-label"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <BloodtypeOutlined color="primary" />
                      </InputAdornment>
                    }
                  >
                    {bloodGroups.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth required>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <Wc color="primary" />
                      </InputAdornment>
                    }
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Language color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="marital-status-label">Marital Status</InputLabel>
                  <Select
                    labelId="marital-status-label"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    border: `1px dashed ${theme.palette.primary.main}`,
                    borderRadius: 1,
                  }}
                >
                  {previewImage ? (
                    <Box sx={{ position: "relative", mb: 2 }}>
                      <Avatar src={previewImage} sx={{ width: 120, height: 120 }} />
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                        component="label"
                      >
                        <Upload />
                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: "center" }}>
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          mb: 2,
                          backgroundColor: theme.palette.primary.light,
                        }}
                      >
                        <AccountCircle sx={{ fontSize: 80 }} />
                      </Avatar>
                      <Button variant="contained" component="label" startIcon={<Upload />}>
                        Upload Photo
                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                      </Button>
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        Recommended size: 300x300 pixels
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )
      case 1:
        return (
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Permanent Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address Line"
                  name="address"
                  value={formData.permanentAddress.address}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Village/Area"
                  name="village"
                  value={formData.permanentAddress.village}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Post Office"
                  name="postOffice"
                  value={formData.permanentAddress.postOffice}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Thana/Police Station"
                  name="thana"
                  value={formData.permanentAddress.thana}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  required
                  fullWidth
                  label="District"
                  name="district"
                  value={formData.permanentAddress.district}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="State/Province"
                  name="state"
                  value={formData.permanentAddress.state}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.permanentAddress.country}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Zip/Postal Code"
                  name="zipCode"
                  value={formData.permanentAddress.zipCode}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, mb: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={sameAsPermAddress} onChange={handleSameAddressChange} color="primary" />}
                label="Current address same as permanent address"
              />
            </Box>

            {!sameAsPermAddress && (
              <>
                <Typography variant="h6" color="primary" gutterBottom>
                  Current Address
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Address Line"
                      name="address"
                      value={formData.currentAddress.address}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOn color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Village/Area"
                      name="village"
                      value={formData.currentAddress.village}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Post Office"
                      name="postOffice"
                      value={formData.currentAddress.postOffice}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Thana/Police Station"
                      name="thana"
                      value={formData.currentAddress.thana}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      required
                      fullWidth
                      label="District"
                      name="district"
                      value={formData.currentAddress.district}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="State/Province"
                      name="state"
                      value={formData.currentAddress.state}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      required
                      fullWidth
                      label="Country"
                      name="country"
                      value={formData.currentAddress.country}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Zip/Postal Code"
                      name="zipCode"
                      value={formData.currentAddress.zipCode}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        )
      case 2:
        return (
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Professional Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="designation-label">Designation</InputLabel>
                  <Select
                    labelId="designation-label"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessCenter color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {designations.map((designation) => (
                      <MenuItem key={designation} value={designation}>
                        {designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    labelId="department-label"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Apartment color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventNote color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Monthly Salary"
                  name="monthlySalary"
                  type="number"
                  value={formData.monthlySalary}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth required>
                  <InputLabel id="staff-type-label">Staff Type</InputLabel>
                  <Select
                    labelId="staff-type-label"
                    name="staffType"
                    value={formData.staffType}
                    onChange={handleInputChange}
                  >
                    {staffTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="residence-type-label">Residence Type</InputLabel>
                  <Select
                    labelId="residence-type-label"
                    name="residenceType"
                    value={formData.residenceType}
                    onChange={handleInputChange}
                  >
                    {residenceTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="subjects-taught-label">Subjects Taught</InputLabel>
                  <Select
                    labelId="subjects-taught-label"
                    multiple
                    value={selectedSubjects}
                    onChange={handleSubjectChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        <Checkbox checked={selectedSubjects.indexOf(subject) > -1} />
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                  Bank Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Holder Name"
                  name="accountName"
                  value={formData.bankDetails.accountName}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankName"
                  value={formData.bankDetails.bankName}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Branch Name"
                  name="branchName"
                  value={formData.bankDetails.branchName}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="IFSC Code"
                  name="ifscCode"
                  value={formData.bankDetails.ifscCode}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                />
              </Grid>
            </Grid>
          </Box>
        )
      case 3:
        return (
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Educational Qualifications
            </Typography>
            {formData.education.map((edu, index) => (
              <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative" }}>
                {index > 0 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: theme.palette.error.main,
                    }}
                    onClick={() => removeEducation(index)}
                  >
                    <Typography variant="caption" color="error">
                      Remove
                    </Typography>
                  </IconButton>
                )}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Degree/Certificate"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleInputChange(e, "education", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Institution"
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleInputChange(e, "education", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Year of Completion"
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleInputChange(e, "education", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Specialization"
                      name="specialization"
                      value={edu.specialization}
                      onChange={(e) => handleInputChange(e, "education", index)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={addEducation} sx={{ mb: 4 }}>
              Add Education
            </Button>

            <Typography variant="h6" color="primary" gutterBottom>
              Certifications
            </Typography>
            {formData.certifications.map((cert, index) => (
              <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative" }}>
                {index > 0 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: theme.palette.error.main,
                    }}
                    onClick={() => removeCertification(index)}
                  >
                    <Typography variant="caption" color="error">
                      Remove
                    </Typography>
                  </IconButton>
                )}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Certificate Name"
                      name="name"
                      value={cert.name}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Issued By"
                      name="issuedBy"
                      value={cert.issuedBy}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      name="year"
                      value={cert.year}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={cert.description}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={addCertification} sx={{ mb: 4 }}>
              Add Certification
            </Button>

            <Typography variant="h6" color="primary" gutterBottom>
              Work Experience
            </Typography>
            {formData.experience.map((exp, index) => (
              <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative" }}>
                {index > 0 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: theme.palette.error.main,
                    }}
                    onClick={() => removeExperience(index)}
                  >
                    <Typography variant="caption" color="error">
                      Remove
                    </Typography>
                  </IconButton>
                )}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Organization"
                      name="organization"
                      value={exp.organization}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="From (Year)"
                      name="from"
                      value={exp.from}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="To (Year or Present)"
                      name="to"
                      value={exp.to}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={2}
                      value={exp.description}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={addExperience}>
              Add Experience
            </Button>
          </Box>
        )
      case 4:
        return (
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Emergency Contact
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Contact Name"
                  name="name"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleInputChange(e, "emergencyContact")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Relationship"
                  name="relation"
                  value={formData.emergencyContact.relation}
                  onChange={(e) => handleInputChange(e, "emergencyContact")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleInputChange(e, "emergencyContact")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactPhone color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 4 }}>
              Social Media Profiles
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Facebook Profile"
                  name="facebook"
                  value={formData.socialMedia.facebook}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Twitter Profile"
                  name="twitter"
                  value={formData.socialMedia.twitter}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Twitter color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="YouTube Channel"
                  name="youtube"
                  value={formData.socialMedia.youtube}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTube color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="LinkedIn Profile"
                  name="linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedIn color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 4 }}>
              Other Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select labelId="status-label" name="status" value={formData.status} onChange={handleInputChange}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="On Leave">On Leave</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                    <MenuItem value="Terminated">Terminated</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="language-label">Preferred Language</InputLabel>
                  <Select
                    labelId="language-label"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Language color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {languages.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Active Session"
                  name="activeSession"
                  value={formData.activeSession}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        )
      case 5:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review all information before submitting. You can go back to any section to make changes.
            </Alert>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Teacher ID:</Typography>
                  <Typography>{formData.teacherId || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Name:</Typography>
                  <Typography>{formData.name || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Email:</Typography>
                  <Typography>{formData.email || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Phone:</Typography>
                  <Typography>{formData.phone || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Date of Birth:</Typography>
                  <Typography>{formData.dateOfBirth || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Gender:</Typography>
                  <Typography>{formData.gender || "Not provided"}</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Professional Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Designation:</Typography>
                  <Typography>{formData.designation || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Department:</Typography>
                  <Typography>{formData.department || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Joining Date:</Typography>
                  <Typography>{formData.joiningDate || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Staff Type:</Typography>
                  <Typography>{formData.staffType || "Not provided"}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Subjects Taught:</Typography>
                  <Typography>
                    {formData.subjectsTaught && formData.subjectsTaught.length > 0
                      ? formData.subjectsTaught.join(", ")
                      : "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2">Monthly Salary:</Typography>
                  <Typography>{formData.monthlySalary ? `$${formData.monthlySalary}` : "Not provided"}</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Address Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Permanent Address:</Typography>
                  <Typography>
                    {formData.permanentAddress.address
                      ? `${formData.permanentAddress.address}, ${formData.permanentAddress.district}, ${formData.permanentAddress.country}`
                      : "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Current Address:</Typography>
                  <Typography>
                    {formData.currentAddress.address
                      ? `${formData.currentAddress.address}, ${formData.currentAddress.district}, ${formData.currentAddress.country}`
                      : "Same as permanent address"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Education & Experience
              </Typography>
              <Typography variant="subtitle2">Highest Education:</Typography>
              <Typography>
                {formData.education && formData.education.length > 0
                  ? `${formData.education[0].degree} from ${formData.education[0].institution} (${formData.education[0].year})`
                  : "Not provided"}
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Total Experience:
              </Typography>
              <Typography>
                {formData.experience && formData.experience.length > 0
                  ? `${formData.experience.length} previous positions`
                  : "No previous experience"}
              </Typography>
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Save />}
                onClick={handleSubmit}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: 3,
                  fontSize: "1.1rem",
                }}
              >
                Register Teacher
              </Button>
            </Box>
          </Box>
        )
      default:
        return "Unknown step"
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.background.paper} 100%)`,
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="primary"
            sx={{
              fontWeight: "bold",
              position: "relative",
              display: "inline-block",
              "&:after": {
                content: '""',
                position: "absolute",
                width: "60%",
                height: "4px",
                bottom: "-8px",
                left: "20%",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "2px",
              },
            }}
          >
            New Teacher Registration
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Complete the form below to register a new teacher in the system
          </Typography>
        </Box>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 4,
            "& .MuiStepLabel-root .Mui-completed": {
              color: theme.palette.primary.main,
            },
            "& .MuiStepLabel-root .Mui-active": {
              color: theme.palette.primary.dark,
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowBack />} variant="outlined">
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              endIcon={activeStep === steps.length - 1 ? <Check /> : <ArrowForward />}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Teacher registration successful!
        </Alert>
      </Snackbar>
    </Container>
  )
}
