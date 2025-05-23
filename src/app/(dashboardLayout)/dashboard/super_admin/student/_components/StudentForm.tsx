/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
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
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
import { batches, bloodGroup, classes, districts, sections, thanas } from "@/options"
import CraftSwitch from "@/components/Forms/switch"
import { useCreateStudentsMutation, useGetSingleStudentQuery,useUpdateStudentMutation } from "@/redux/api/studentApi"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FileUploadWithIcon from "@/components/Forms/Upload"



const studentSchema = z.object({
  smartIdCard: z.string().optional(),
  name: z.string({
    required_error: "Name is required",
  }),
  birthDate: z.string({
    required_error: "Birth date is required",
  }),
  birthRegistrationNo: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select a gender",
  }),
  mobile: z.string({
    required_error: "Mobile number is required",
  }),
  bloodGroup: z.string().optional(),
  image: z.string().optional(),

  // Family Information
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  guardianName: z.string().optional(),
  guardianMobile: z.string().optional(),
  relation: z.string().optional(),
  nidFatherMotherGuardian: z.string().optional(),

  // Address Information
  permanentAddress: z.string({
    required_error: "Permanent address is required",
  }),
  permanentDistrict: z.string({
    required_error: "Permanent district is required",
  }),
  permanentThana: z.string({
    required_error: "Permanent thana is required",
  }),
  sameAsPermanent: z.boolean().default(false),
  presentAddress: z.string().optional(),
  presentDistrict: z.string().optional(),
  presentThana: z.string().optional(),

  // Academic Information
  className: z.string({
    required_error: "Class name is required",
  }),
  studentClassRoll: z.string({
    required_error: "Student class roll is required",
  }),
  batch: z.string().optional(),
  section: z.string().optional(),
  activeSession: z.string({
    required_error: "Active session is required",
  }),
  // activeSession: z.string().min(1, "Active session is required"),
  status: z.string().min(1, "Status is required"),
  studentType: z.string().min(1, "Student type is required"),
  additionalNote: z.string().optional(),

  // Fee Information
  admissionFee: z.number().default(0),
  monthlyFee: z.number().default(0),
  previousDues: z.number().default(0),
  sessionFee: z.number().default(0),
  residenceFee: z.number().default(0),
  otherFee: z.number().default(0),
  transportFee: z.number().default(0),
  boardingFee: z.number().default(0),

  // Settings
  sendAdmissionSMS: z.boolean().default(false),
  studentSerial: z.string().optional(),
  sendAttendanceSMS: z.boolean().default(false),
})

interface StudentFormProps {
  id: string;
}

const StudentForm = ({ id }: StudentFormProps) => {
  const [createStudents] = useCreateStudentsMutation()
  const [updateStudent] = useUpdateStudentMutation()
  const { data, isLoading } = useGetSingleStudentQuery({ id })
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  interface FormData {
    permanentAddress?: string
    permanentDistrict?: string
    permanentThana?: string
    sameAsPermanent?: boolean
    presentAddress?: string
    presentDistrict?: string
    presentThana?: string
    sendAdmissionSMS?: boolean
    sendAttendanceSMS?: boolean
    // Add other fields as needed
  }

  const [formData, setFormData] = useState<FormData>({})
  // Set default values when data is loaded
  useEffect(() => {
    if (data?.data) {
      const studentData = data.data

      // Set form data for switches and address fields
      setFormData({
        sameAsPermanent: studentData.sameAsPermanent || false,
        permanentAddress: studentData.permanentAddress,
        permanentDistrict: studentData.permanentDistrict,
        permanentThana: studentData.permanentThana,
        presentAddress: studentData.presentAddress,
        presentDistrict: studentData.presentDistrict,
        presentThana: studentData.presentThana,
        sendAdmissionSMS: studentData.sendAdmissionSMS || false,
        sendAttendanceSMS: studentData.sendAttendanceSMS || false,
      })
    }
  }, [data])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  const [success, setSuccess] = useState(false)

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
    console.log(data)
    const submissionData = {
      ...data,
      ...formData,
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
      const res = await updateStudent({ id, ...submissionData }).unwrap()
      console.log(res)
      if (res.success) {
        setSuccess(true)
        setSnackbar({
          open: true,
          message: "Student update successfully!",
          severity: "success",
        })
        router.push("/dashboard/super_admin/student/list")
      }

      setTimeout(() => { }, 2000)
    } catch (error: any) {
      console.error("❌ Submission error:", error)
      setSnackbar({
        open: true,
        message: error?.data?.message || "Error registering student.",
        severity: "error",
      })
    } finally {
    }
  }
  const onSubmit = async (data: any) => {
    const submissionData = {
      ...data,
      ...formData,
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
        router.push("/dashboard/super_admin/student/list")
      }

      setTimeout(() => { }, 2000)
    } catch (error: any) {
      console.error("❌ Submission error:", error)
      setSnackbar({
        open: true,
        message: error?.data?.message || "Error registering student.",
        severity: "error",
      })
    } finally {
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
            <FileUploadWithIcon name="studentPhoto" label="Student Photo" />
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
                    name="sendAdmissionSMS"
                    label="Send Admission SMS"
                    onChange={handleSwitchChange}
                    checked={formData.sendAdmissionSMS || false}
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
  ]

  if (isLoading) {
    return <h4>Loading.......</h4>
  }

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

        <CraftForm onSubmit={id ? handleSubmit : onSubmit} resolver={zodResolver(studentSchema)} defaultValues={data?.data}>
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
                            {id ? 'Update Student' : '    Register Student'}
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

export default StudentForm
