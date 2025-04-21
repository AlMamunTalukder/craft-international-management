/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material"
import {
  Person,
  People,
  Home,
  School,
  AttachMoney,
  Settings,
  Save,
  Badge,
  Phone,
  Cake,
  Bloodtype,
  DriveFileRenameOutline,
  ContactPhone,
  Contacts,
  CreditCard,
  LocationOn,
  Class,
  CalendarMonth,
  Description,
  CheckCircle,
  ArrowBack,
  Clear,
  Help,
  Upload,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
import { batches, bloodGroup, classes, districts, sections, thanas } from "@/options"
import CraftSwitch from "@/components/Forms/switch"
import { useCreateStudentsMutation } from "@/redux/api/studentApi"


const StudentRegistration = () => {
  const [createStudents] = useCreateStudentsMutation()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      })
    }
  }


  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    // Update the form data with the new switch value
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))

    // If sameAsPermanent is checked, copy permanent address to present address
    if (name === "sameAsPermanent" && checked) {
      setFormData((prev) => ({
        ...prev,
        presentAddress: prev.permanentAddress || "",
        presentDistrict: prev.permanentDistrict || "",
        presentThana: prev.permanentThana || "",
        [name]: checked,
      }))
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async (data: any) => {
    setSubmitting(true)

    // Combine and transform data
    const submissionData = {
      ...data,
      ...formData,
      // 🔁 Convert to number if not already
      admissionFee: Number(data.admissionFee),
      monthlyFee: Number(data.monthlyFee),
      previousDues: Number(data.previousDues),
      sessionFee: Number(data.sessionFee),
      residenceFee: Number(data.residenceFee),
      otherFee: Number(data.otherFee),
      transportFee: Number(data.transportFee),
      boardingFee: Number(data.boardingFee),
    }

    try {
      const res = await createStudents(submissionData).unwrap()

      if (res.success) {
        setSuccess(true)
        setSnackbar({
          open: true,
          message: "Student registered successfully!",
          severity: "success",
        })
        router.push('/dashboard/super_admin/student/list')
      }

      setTimeout(() => {

      }, 2000)
    } catch (error: any) {
      console.error("❌ Submission error:", error)
      setSnackbar({
        open: true,
        message: error?.data?.message || "Error registering student.",
        severity: "error",
      })
    } finally {
      setSubmitting(false)
    }
  }


  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  const handleReset = () => {
    setFormData({})
    setActiveStep(0)
  }

  const steps = [
    {
      label: "Personal Information",
      description: "Enter student's personal details",
      icon: <Person />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="name"
              label="Student Name"
              placeholder="e.g., John Smith"
              size="medium"
              InputProps={{
                startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="smartIdCard"
              label="Smart ID Card"
              placeholder="e.g., SMART-001"
              size="medium"
              InputProps={{
                startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="gender"
              size="medium"
              label="Gender"
              placeholder="Select Gender"
              items={["Male", "Female", "Other"]}
              adornment={<Person color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="mobile"
              label="Mobile Number"
              placeholder="e.g., +1 234 567 8900"
              size="medium"
              InputProps={{
                startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="bloodGroup"
              size="medium"
              label="Blood Group"
              placeholder="Select blood group"
              items={bloodGroup}
              adornment={<Bloodtype color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="birthDate"
              label="Birth Date"
              type="date"
              size="medium"
              InputProps={{
                startAdornment: <Cake sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="birthRegistrationNo"
              label="Birth Registration No."
              placeholder="Birth Registration Number"
              size="medium"
              InputProps={{
                startAdornment: <CreditCard sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="email"
              label="Email"
              placeholder="e.g., exmaple@gmail.com"
              size="medium"
              InputProps={{
                startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                borderColor: "rgba(0,0,0,0.12)",
                bgcolor: "rgba(0,0,0,0.02)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Upload color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">Student Photo</Typography>
              </Box>
              <input
                accept="image/*"
                id="image-upload"
                type="file"
                name="image"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="image-upload">
                <Button variant="outlined" component="span" startIcon={<Upload />} sx={{ borderRadius: 100, px: 3 }}>
                  Choose File
                </Button>
                {formData.image && (
                  <Typography variant="body2" sx={{ ml: 2, display: "inline" }}>
                    {formData.image.name}
                  </Typography>
                )}
              </label>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Upload a clear photo of the student (JPEG or PNG, max 2MB)
              </Typography>
            </Card>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Family Information",
      description: "Enter family and guardian details",
      icon: <People />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="fatherName"
              label="Father's Name"
              placeholder="Father's Name"
              size="medium"
              InputProps={{
                startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="motherName"
              label="Mother's Name"
              placeholder="Mother Name"
              size="medium"
              InputProps={{
                startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="guardianName"
              label="Guardian's Name"
              placeholder="Guardian's Name"
              size="medium"
              InputProps={{
                startAdornment: <Contacts sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="guardianMobile"
              label="Guardian's Mobile"
              placeholder="Guardian's Mobile"
              size="medium"
              InputProps={{
                startAdornment: <ContactPhone sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="relation"
              label="Relation with Guardian"
              placeholder="e.g., Father, Mother, Uncle"
              size="medium"
              InputProps={{
                startAdornment: <People sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="nidFatherMotherGuardian"
              label="NID (Father/Mother/Guardian)"
              placeholder="NID (Father/Mother/Guardian)"
              size="medium"
              InputProps={{
                startAdornment: <CreditCard sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "rgba(33, 150, 243, 0.05)",
                borderRadius: 2,
                border: "1px dashed rgba(33, 150, 243, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <Help color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="primary.main">
                    Guardian Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The guardian will be the primary contact for all communications regarding the student. Make sure to
                    provide accurate contact information.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Address Information",
      description: "Enter permanent and present address",
      icon: <Home />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Permanent Address
            </Typography>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    name="permanentAddress"
                    label="Permanent Address"
                    placeholder="Permanent Address"
                    size="medium"
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <LocationOn sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftSelectWithIcon
                    name="permanentDistrict"
                    size="medium"
                    label="District"
                    placeholder="Select District"
                    items={districts}
                    adornment={<LocationOn color="action" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftSelectWithIcon
                    name="permanentThana"
                    size="medium"
                    label="Thana"
                    placeholder="Select Thana"
                    items={thanas}
                    adornment={<LocationOn color="action" />}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Present Address
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    name="sameAsPermanent"
                    checked={formData.sameAsPermanent || false}
                    onChange={handleSwitchChange}
                    color="primary"
                  />
                }
                label="Same as Permanent"
              />
            </Box>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                opacity: formData.sameAsPermanent ? 0.7 : 1,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    name="presentAddress"
                    label="Present Address"
                    placeholder="Present Address"
                    size="medium"
                    multiline
                    rows={2}
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: (
                        <LocationOn sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftSelectWithIcon
                    name="presentDistrict"
                    size="medium"
                    label="District"
                    placeholder="Select District"
                    items={districts}
                    adornment={<LocationOn color="action" />}
                    disabled={formData.sameAsPermanent}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftSelectWithIcon
                    name="presentThana"
                    size="medium"
                    label="Thana"
                    placeholder="Select Thana"
                    items={thanas}
                    adornment={<LocationOn color="action" />}
                    disabled={formData.sameAsPermanent}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Academic Information",
      description: "Enter class, batch and academic details",
      icon: <School />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="className"
              size="medium"
              label="Class"
              placeholder="Select Class"
              items={classes}
              adornment={<Class color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="studentClassRoll"
              label="Class Roll"
              placeholder="Class Roll"
              size="medium"
              InputProps={{
                startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="batch"
              size="medium"
              label="Batch"
              placeholder="Select Batch"
              items={batches}
              adornment={<People color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="section"
              size="medium"
              label="Section"
              placeholder="Select Section"
              items={sections}
              adornment={<Class color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="activeSession"
              size="medium"
              label="Active Session"
              placeholder="Select Active Session"
              items={["2023", "2024", "2025"]}
              adornment={<CalendarMonth color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="status"
              size="medium"
              label="Status"
              placeholder="Select Status"
              items={["Active", "Inactive", "Graduated"]}
              adornment={<CheckCircle color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="studentType"
              size="medium"
              label="Student Type"
              placeholder="Select Student Type"
              items={["Residential", "Day"]}
              adornment={<Person color="action" />}
            />
          </Grid>

          <Grid item xs={12}>
            <CraftInputWithIcon
              fullWidth
              name="additionalNote"
              label="Additional Notes"
              placeholder="Additional Notes"
              size="medium"
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <Description sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
                ),
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Fee Information",
      description: "Enter fee details for the student",
      icon: <AttachMoney />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Enter all applicable fees for this student. Leave as 0 for any fees that don't apply.
            </Alert>
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="admissionFee"
              label="Admission Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="monthlyFee"
              label="Monthly Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="previousDues"
              label="Previous Dues"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="sessionFee"
              label="Session Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="residenceFee"
              label="Residence Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="otherFee"
              label="Other Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="transportFee"
              label="Transport Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="boardingFee"
              label="Boarding Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                mt: 2,
                borderRadius: 2,
                bgcolor: "rgba(0, 0, 0, 0.02)",
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                Fee Summary
              </Typography>
              {/* In the Fee Information step, update the fee summary card: */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Total One-time Fees:
                  </Typography>
                  <Typography variant="h6">
                    $
                    {(
                      Number.parseFloat(formData.admissionFee || "0") +
                      Number.parseFloat(formData.sessionFee || "0") +
                      Number.parseFloat(formData.previousDues || "0")
                    ).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Total Monthly Fees:
                  </Typography>
                  <Typography variant="h6">
                    $
                    {(
                      Number.parseFloat(formData.monthlyFee || "0") +
                      Number.parseFloat(formData.residenceFee || "0") +
                      Number.parseFloat(formData.transportFee || "0") +
                      Number.parseFloat(formData.boardingFee || "0") +
                      Number.parseFloat(formData.otherFee || "0")
                    ).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Other Settings",
      description: "Configure additional settings",
      icon: <Settings />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "rgba(0, 0, 0, 0.02)",
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 3 }}>
                Notification Settings
              </Typography>

              <Grid container spacing={3} alignItems="center">
                {/* Replace the CraftSwitch components with ones that properly handle the onChange event: */}
                <Grid item xs={12} md={4}>
                  <CraftSwitch
                    name="sendAdmissionSMS"
                    label="Send Admission SMS"
                    onChange={handleSwitchChange}
                    checked={formData.sendAdmissionSMS || false}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 4 }}>
                    Send SMS notification upon admission
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    name="studentSerial"
                    label="Student Serial"
                    placeholder="Student Serial"
                    size="medium"
                    InputProps={{
                      startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <CraftSwitch
                    name="sendAttendanceSMS"
                    label="Send Attendance SMS"
                    onChange={handleSwitchChange}
                    checked={formData.sendAttendanceSMS || false}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 4 }}>
                    Send SMS for attendance updates
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "rgba(33, 150, 243, 0.05)",
                borderRadius: 2,
                border: "1px dashed rgba(33, 150, 243, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <Help color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="primary.main">
                    SMS Notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    SMS notifications will be sent to the guardian's mobile number. Make sure the mobile number is
                    correct before enabling these options.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Review & Submit",
      description: "Review and submit student details",
      icon: <CheckCircle />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Review Student Details
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Personal Information
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Student Name
                    </Typography>
                    <Typography variant="body1">
                      {formData.name || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Smart ID Card
                    </Typography>
                    <Typography variant="body1">
                      {formData.smartIdCard || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Gender
                    </Typography>
                    <Typography variant="body1">
                      {formData.gender || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Mobile
                    </Typography>
                    <Typography variant="body1">
                      {formData.mobile || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Blood Group
                    </Typography>
                    <Typography variant="body1">
                      {formData.bloodGroup || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Birth Date
                    </Typography>
                    <Typography variant="body1">
                      {formData.birthDate || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Birth Registration No.
                    </Typography>
                    <Typography variant="body1">
                      {formData.birthRegistrationNo || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Family Information
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Father's Name
                    </Typography>
                    <Typography variant="body1">
                      {formData.fatherName || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Mother's Name
                    </Typography>
                    <Typography variant="body1">
                      {formData.motherName || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Guardian's Name
                    </Typography>
                    <Typography variant="body1">
                      {formData.guardianName || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Guardian's Mobile
                    </Typography>
                    <Typography variant="body1">
                      {formData.guardianMobile || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Relation with Guardian
                    </Typography>
                    <Typography variant="body1">
                      {formData.relation || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      NID (Father/Mother/Guardian)
                    </Typography>
                    <Typography variant="body1">
                      {formData.nidFatherMotherGuardian || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Address Information
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Permanent Address
                    </Typography>
                    <Typography variant="body1">
                      {formData.permanentAddress || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Permanent District
                    </Typography>
                    <Typography variant="body1">
                      {formData.permanentDistrict || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Permanent Thana
                    </Typography>
                    <Typography variant="body1">
                      {formData.permanentThana || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Present Address
                    </Typography>
                    <Typography variant="body1">
                      {formData.sameAsPermanent ? (
                        <Typography component="span" sx={{ fontStyle: "italic" }}>
                          Same as permanent address
                        </Typography>
                      ) : formData.presentAddress ? (
                        formData.presentAddress
                      ) : (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  {!formData.sameAsPermanent && (
                    <>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Present District
                        </Typography>
                        <Typography variant="body1">
                          {formData.presentDistrict || (
                            <Typography variant="body2" color="text.disabled" component="span">
                              Not selected
                            </Typography>
                          )}
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Present Thana
                        </Typography>
                        <Typography variant="body1">
                          {formData.presentThana || (
                            <Typography variant="body2" color="text.disabled" component="span">
                              Not selected
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Academic Information
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Class
                    </Typography>
                    <Typography variant="body1">
                      {formData.class || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Class Roll
                    </Typography>
                    <Typography variant="body1">
                      {formData.studentClassRoll || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Batch
                    </Typography>
                    <Typography variant="body1">
                      {formData.batch || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Section
                    </Typography>
                    <Typography variant="body1">
                      {formData.section || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Active Session
                    </Typography>
                    <Typography variant="body1">
                      {formData.activeSession || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1">
                      {formData.status || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Student Type
                    </Typography>
                    <Typography variant="body1">
                      {formData.studentType || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Additional Notes
                    </Typography>
                    <Typography variant="body1">
                      {formData.additionalNote || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Fee Information
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Admission Fee
                    </Typography>
                    <Typography variant="body1">
                      ${Number.parseFloat(formData.admissionFee || "0").toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Monthly Fee
                    </Typography>
                    <Typography variant="body1">${Number.parseFloat(formData.monthlyFee || "0").toFixed(2)}</Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Previous Dues
                    </Typography>
                    <Typography variant="body1">
                      ${Number.parseFloat(formData.previousDues || "0").toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Session Fee
                    </Typography>
                    <Typography variant="body1">${Number.parseFloat(formData.sessionFee || "0").toFixed(2)}</Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Residence Fee
                    </Typography>
                    <Typography variant="body1">
                      ${Number.parseFloat(formData.residenceFee || "0").toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Transport Fee
                    </Typography>
                    <Typography variant="body1">
                      ${Number.parseFloat(formData.transportFee || "0").toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Boarding Fee
                    </Typography>
                    <Typography variant="body1">
                      ${Number.parseFloat(formData.boardingFee || "0").toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Other Fee
                    </Typography>
                    <Typography variant="body1">${Number.parseFloat(formData.otherFee || "0").toFixed(2)}</Typography>
                  </Box>

                  <Box sx={{ mt: 3, pt: 2, borderTop: "1px dashed rgba(0,0,0,0.1)" }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total One-time Fees
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      $
                      {(
                        Number.parseFloat(formData.admissionFee || "0") +
                        Number.parseFloat(formData.sessionFee || "0") +
                        Number.parseFloat(formData.previousDues || "0")
                      ).toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Monthly Fees
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      $
                      {(
                        Number.parseFloat(formData.monthlyFee || "0") +
                        Number.parseFloat(formData.residenceFee || "0") +
                        Number.parseFloat(formData.transportFee || "0") +
                        Number.parseFloat(formData.boardingFee || "0") +
                        Number.parseFloat(formData.otherFee || "0")
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Notification Settings
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Send Admission SMS
                    </Typography>
                    <Typography variant="body1">{formData.sendAdmissionSMS ? "Yes" : "No"}</Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Student Serial
                    </Typography>
                    <Typography variant="body1">
                      {formData.studentSerial || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Send Attendance SMS
                    </Typography>
                    <Typography variant="body1">{formData.sendAttendanceSMS ? "Yes" : "No"}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Alert severity="info">
                Please review all information carefully before submitting. Once submitted, some information may require
                administrative approval to change.
              </Alert>
            </Box>
          </Grid>
        </Grid>
      ),
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
        pt: 2,
        pb: 8,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4F0187 0%, #4F0187 100%)",
          color: "white",
          py: 3,
          mb: 4,
          borderRadius: { xs: 0, md: "0 0 20px 20px" },
          boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Person sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              New Student Registration
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
            Register a new student by filling in the required information. Follow the steps to complete the registration
            process.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Link href="/students" passHref>
            <Button
              startIcon={<ArrowBack />}
              variant="outlined"
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: 3,
              }}
            >
              Back to Student List
            </Button>
          </Link>
        </Box>

        <CraftForm initialValues={formData} onSubmit={handleSubmit} encType="multipart/form-data">
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              mb: 4,
            }}
          >
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconProps={{
                        icon: step.icon,
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {step.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ mt: 2, mb: 1 }}>{step.content}</Box>
                      <Box sx={{ mb: 2, mt: 4, display: "flex", gap: 2 }}>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{
                            borderRadius: 100,
                            px: 3,
                          }}
                        >
                          Back
                        </Button>
                        {index === steps.length - 1 ? (
                          <Button
                            variant="contained"
                            type="submit"
                            startIcon={<Save />}
                            sx={{
                              borderRadius: 100,
                              background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
                              boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                              px: 3,
                            }}
                          >
                            Register Student
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                              borderRadius: 100,
                              background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
                              boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                              px: 3,
                            }}
                          >
                            Continue
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          onClick={handleReset}
                          startIcon={<Clear />}
                          sx={{
                            borderRadius: 100,
                            borderColor: "rgba(0,0,0,0.12)",
                            color: "text.secondary",
                            px: 3,
                            ml: "auto",
                          }}
                        >
                          Reset
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Paper>
        </CraftForm>

        {/* Help Card */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Help sx={{ color: "#2e7d32", mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#2e7d32", fontWeight: 600 }}>
              Need Help?
            </Typography>
            <Typography variant="body2" sx={{ color: "#1b5e20" }}>
              Registering a student is the first step in the enrollment process. After registration, you can manage the
              student's academic records, attendance, and fee payments. Make sure to fill in all required fields marked
              with an asterisk (*) for successful registration.
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Success Backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={success}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: 4,
            borderRadius: 4,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <CheckCircle sx={{ fontSize: 50, color: "#2e7d32" }} />
          </Box>
          <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: 600, mb: 1 }}>
            Success!
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            Student has been registered successfully. Redirecting to student list...
          </Typography>
          <CircularProgress size={24} sx={{ color: "primary.main" }} />
        </Box>
      </Backdrop>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default StudentRegistration
