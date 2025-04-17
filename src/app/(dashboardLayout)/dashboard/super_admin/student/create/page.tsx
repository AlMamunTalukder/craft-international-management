/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import { Person, People, Home, School, AttachMoney, Settings, Save } from "@mui/icons-material"
type StudentFormData = {
  studentId: string;
  smartIdCard: string;
  name: string;
  birthDate: string;
  birthRegistrationNo: string;
  gender: string;
  mobile: string;
  bloodGroup: string;
  image: File | null;

  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianMobile: string;
  relation: string;
  nidFatherMotherGuardian: string;

  permanentAddress: string;
  permanentDistrict: string;
  permanentThana: string;
  sameAsPermanent: boolean;
  presentAddress: string;
  presentDistrict: string;
  presentThana: string;

  class: string;
  studentClassRoll: string;
  batch: string;
  section: string;
  activeSession: string;
  status: string;
  studentType: string;
  additionalNote: string;

  admissionFee: number;
  monthlyFee: number;
  previousDues: number;
  sessionFee: number;
  residenceFee: number;
  otherFee: number;
  transportFee: number;
  boardingFee: number;

  sendAdmissionSMS: boolean;
  studentSerial: string;
  sendAttendanceSMS: boolean;
};

const StudentRegistration = () => {
  const theme = useTheme()
  const [formData, setFormData] = useState<StudentFormData>({
    studentId: "",
    smartIdCard: "",
    name: "",
    birthDate: "",
    birthRegistrationNo: "",
    gender: "",
    mobile: "",
    bloodGroup: "",
    image: null,

    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianMobile: "",
    relation: "",
    nidFatherMotherGuardian: "",

    permanentAddress: "",
    permanentDistrict: "",
    permanentThana: "",
    sameAsPermanent: false,
    presentAddress: "",
    presentDistrict: "",
    presentThana: "",

    class: "",
    studentClassRoll: "",
    batch: "",
    section: "",
    activeSession: "",
    status: "Active",
    studentType: "",
    additionalNote: "",

    admissionFee: 0,
    monthlyFee: 0,
    previousDues: 0,
    sessionFee: 0,
    residenceFee: 0,
    otherFee: 0,
    transportFee: 0,
    boardingFee: 0,

    sendAdmissionSMS: false,
    studentSerial: "",
    sendAttendanceSMS: false,
  });



  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] })
    } else if (type === "checkbox" || type === "switch") {
      setFormData({ ...formData, [name]: checked })

      // If sameAsPermanent is checked, copy permanent address to present address
      if (name === "sameAsPermanent" && checked) {
        setFormData({
          ...formData,
          presentAddress: formData.permanentAddress,
          presentDistrict: formData.permanentDistrict,
          presentThana: formData.permanentThana,
          sameAsPermanent: checked,
        })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Create FormData object to handle file uploads
    const studentFormData = new FormData()

    // Append all form data to FormData object
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof typeof formData;
      const value = formData[typedKey];

      if (typedKey === "image" && value) {
        studentFormData.append(typedKey, value as Blob);
      } else if (typeof value === "boolean" || typeof value === "number") {
        studentFormData.append(typedKey, String(value));
      } else if (value !== null && value !== undefined) {
        studentFormData.append(typedKey, value);
      }
    });



    try {
      // API call would go here
      console.log("Form submitted:", formData)
      // Example API call:
      // const response = await axios.post('/api/students', studentFormData);
      // if (response.status === 201) {
      //   // Handle success
      // }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  const SectionHeader = ({ icon, title }: any) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: theme.palette.primary.main }}>
      {icon}
      <Typography variant="h6" component="h2" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </Box>
  )

  return (
    <Container maxWidth="xl">
      <Paper elevation={0} sx={{ mb: 3, bgcolor: theme.palette.primary.main, color: "white", py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Person sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            New Student Registration
          </Typography>
        </Box>
      </Paper>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader icon={<Person />} title="Personal Information" />
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Student ID"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select name="gender" value={formData.gender} label="Gender" onChange={handleChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Smart ID Card"
                  name="smartIdCard"
                  value={formData.smartIdCard}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <InputLabel sx={{ mb: 1 }}>Image</InputLabel>
                  <input
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    name="image"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outlined" component="span">
                      Choose file
                    </Button>
                    {formData.image && (
                      <Typography variant="body2" sx={{ ml: 2, display: "inline" }}>
                        {formData.image.name}
                      </Typography>
                    )}


                  </label>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birth Registration No."
                  name="birthRegistrationNo"
                  value={formData.birthRegistrationNo}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Family Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader icon={<People />} title="Family Information" />
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Father Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Guardian Mobile"
                  name="guardianMobile"
                  value={formData.guardianMobile}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mother Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Relation"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Guardian Name"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="NID/Father/Mother/Guardian"
                  name="nidFatherMotherGuardian"
                  value={formData.nidFatherMotherGuardian}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader icon={<Home />} title="Address Information" />
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Permanent Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Permanent address"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Permanent District</InputLabel>
                      <Select
                        name="permanentDistrict"
                        value={formData.permanentDistrict}
                        label="Permanent District"
                        onChange={handleChange}
                      >
                        <MenuItem value="District1">District 1</MenuItem>
                        <MenuItem value="District2">District 2</MenuItem>
                        <MenuItem value="District3">District 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Permanent Thana</InputLabel>
                      <Select
                        name="permanentThana"
                        value={formData.permanentThana}
                        label="Permanent Thana"
                        onChange={handleChange}
                      >
                        <MenuItem value="Thana1">Thana 1</MenuItem>
                        <MenuItem value="Thana2">Thana 2</MenuItem>
                        <MenuItem value="Thana3">Thana 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="subtitle1">Current Address</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        name="sameAsPermanent"
                        checked={formData.sameAsPermanent}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label="Same as Permanent"
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Present address"
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleChange}
                      disabled={formData.sameAsPermanent}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Current District</InputLabel>
                      <Select
                        name="presentDistrict"
                        value={formData.presentDistrict}
                        label="Current District"
                        onChange={handleChange}
                        disabled={formData.sameAsPermanent}
                      >
                        <MenuItem value="District1">District 1</MenuItem>
                        <MenuItem value="District2">District 2</MenuItem>
                        <MenuItem value="District3">District 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Current Thana</InputLabel>
                      <Select
                        name="presentThana"
                        value={formData.presentThana}
                        label="Current Thana"
                        onChange={handleChange}
                        disabled={formData.sameAsPermanent}
                      >
                        <MenuItem value="Thana1">Thana 1</MenuItem>
                        <MenuItem value="Thana2">Thana 2</MenuItem>
                        <MenuItem value="Thana3">Thana 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader icon={<School />} title="Academic Information" />
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Class *</InputLabel>
                  <Select name="class" value={formData.class} label="Class *" onChange={handleChange} required>
                    <MenuItem value="Class1">Class 1</MenuItem>
                    <MenuItem value="Class2">Class 2</MenuItem>
                    <MenuItem value="Class3">Class 3</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="caption" color="error">
                  Please select a class
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Student Class Roll"
                  name="studentClassRoll"
                  value={formData.studentClassRoll}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Batch</InputLabel>
                  <Select name="batch" value={formData.batch} label="Batch" onChange={handleChange}>
                    <MenuItem value="Batch1">Batch 1</MenuItem>
                    <MenuItem value="Batch2">Batch 2</MenuItem>
                    <MenuItem value="Batch3">Batch 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select name="status" value={formData.status} label="Status" onChange={handleChange}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Graduated">Graduated</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Section</InputLabel>
                  <Select name="section" value={formData.section} label="Section" onChange={handleChange}>
                    <MenuItem value="SectionA">Section A</MenuItem>
                    <MenuItem value="SectionB">Section B</MenuItem>
                    <MenuItem value="SectionC">Section C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Student Type</InputLabel>
                  <Select name="studentType" value={formData.studentType} label="Student Type" onChange={handleChange}>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Day">Day</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Active Session *</InputLabel>
                  <Select
                    name="activeSession"
                    value={formData.activeSession}
                    label="Active Session *"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="caption" color="error">
                  Please select a active session
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Note"
                  name="additionalNote"
                  value={formData.additionalNote}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Fee Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader icon={<AttachMoney />} title="Fee Information" />
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Admission Fee"
                  name="admissionFee"
                  type="number"
                  value={formData.admissionFee}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Monthly Fee"
                  name="monthlyFee"
                  type="number"
                  value={formData.monthlyFee}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Previous Dues"
                  name="previousDues"
                  type="number"
                  value={formData.previousDues}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Session Fee"
                  name="sessionFee"
                  type="number"
                  value={formData.sessionFee}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Residence Fee"
                  name="residenceFee"
                  type="number"
                  value={formData.residenceFee}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Other Fee"
                  name="otherFee"
                  type="number"
                  value={formData.otherFee}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Transport Fee"
                  name="transportFee"
                  type="number"
                  value={formData.transportFee}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Boarding Fee"
                  name="boardingFee"
                  type="number"
                  value={formData.boardingFee}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Other Settings */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader icon={<Settings />} title="Other Settings" />
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      name="sendAdmissionSMS"
                      checked={formData.sendAdmissionSMS}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Send Admission SMS"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Student Serial"
                  name="studentSerial"
                  value={formData.studentSerial}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      name="sendAttendanceSMS"
                      checked={formData.sendAttendanceSMS}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Send attendance sms"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Save />}
            sx={{ px: 4, py: 1 }}
          >
            Save Student
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default StudentRegistration
