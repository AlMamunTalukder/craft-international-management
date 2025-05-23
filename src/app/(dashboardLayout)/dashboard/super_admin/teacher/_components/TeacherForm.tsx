/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Checkbox,
  Paper,
  IconButton,
  Alert,
  Snackbar,
  type SelectChangeEvent,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Backdrop,
  CircularProgress,
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
  ArrowBack,
  ArrowForward,
  Check,
  LocationOn,
  Wc,
  CardMembership,
  Fingerprint,
  BusinessCenter,
  EventNote,
  ContactPhone,
  Add,
  Bloodtype,
  Apartment,
  School,
  Work,
  Person,
  Group,
  CreditCard,
  Instagram,
  VerifiedUser,
  CheckCircle,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
import {
  bloodGroup,
  departments,
  designations,
  genders,
  languages,
  maritalStatuses,
  residenceTypes,
  staffTypes,
  statusOptions,
  subjects,
} from "@/options"
import { useRouter } from "next/navigation"
import { useCreateTeacherMutation, useGetSingleTeacherQuery, useUpdateTeacherMutation } from "@/redux/api/teacherApi"
import FileUploadWithIcon from "@/components/Forms/Upload"

// Define interfaces
interface Address {
  address: string
  village: string
  postOffice: string
  thana: string
  district: string
  state: string
  country: string
  zipCode: string
}

interface Education {
  degree: string
  institution: string
  year: string
  specialization: string
}

interface Certification {
  name: string
  issuedBy: string
  year: string
  description: string
}

interface Experience {
  organization: string
  position: string
  from: string
  to: string
  description: string
}

interface BankDetails {
  accountName: string
  accountNumber: string
  bankName: string
  branchName: string
  ifscCode: string
}

interface EmergencyContact {
  name: string
  relation: string
  phone: string
}

interface SocialMedia {
  facebook: string
  twitter: string
  youtube: string
  linkedin: string
  instagram: string
}

interface FormData {
  teacherId: string
  teacherSerial: string
  name: string
  englishName: string
  phone: string
  email: string
  smartIdCard: string
  bloodGroup: string
  gender: string
  dateOfBirth: string
  nationality: string
  religion: string
  maritalStatus: string
  permanentAddress: Address
  currentAddress: Address
  designation: string
  department: string
  joiningDate: string
  monthlySalary: string
  staffType: string
  residenceType: string
  subjectsTaught: string[]
  classesAssigned: string[]
  education: Education[]
  certifications: Certification[]
  skills: string[]
  experience: Experience[]
  emergencyContact: EmergencyContact
  socialMedia: SocialMedia
  status: string
  language: string
  activeSession: string
  bankDetails: BankDetails
  sameAsPermanent: boolean
}

// Add interface for TeacherFormProps
interface TeacherFormProps {
  id?: string
}

const steps = ["Basic", "Address", "Professional", "Education", "Social"]

// Initialize default form state
const initialFormState = {
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
  designation: "",
  department: "",
  joiningDate: "",
  monthlySalary: "",
  staffType: "",
  residenceType: "",
  subjectsTaught: [],
  classesAssigned: [],
  education: [{ degree: "", institution: "", year: "", specialization: "" }],
  certifications: [{ name: "", issuedBy: "", year: "", description: "" }],
  skills: [],
  experience: [{ organization: "", position: "", from: "", to: "", description: "" }],
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
  status: "",
  language: "",
  activeSession: "",
  bankDetails: {
    accountName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
  },
  sameAsPermanent: false,
}

// Replace the function declaration with this
export default function TeacherForm({ id }: TeacherFormProps = {}) {
  const theme = useTheme()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Add API hooks
  const [createTeacher] = useCreateTeacherMutation()
  const [updateTeacher] = useUpdateTeacherMutation({})
  const { data, isLoading } = useGetSingleTeacherQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  )

  // Add formData state with proper initialization
  const [formData, setFormData] = useState<FormData>(initialFormState)

  // Add useEffect to set form data when data is loaded
  useEffect(() => {
    if (data?.data) {
      const teacherData = data.data
      setFormData({
        ...initialFormState,
        ...teacherData,
        sameAsPermanent: teacherData.sameAsPermanent || false,
        permanentAddress: teacherData.permanentAddress || initialFormState.permanentAddress,
        currentAddress: teacherData.currentAddress || initialFormState.currentAddress,
        education: teacherData.education || [{ degree: "", institution: "", year: "", specialization: "" }],
        certifications: teacherData.certifications || [{ name: "", issuedBy: "", year: "", description: "" }],
        experience: teacherData.experience || [{ organization: "", position: "", from: "", to: "", description: "" }],
        emergencyContact: teacherData.emergencyContact || initialFormState.emergencyContact,
        socialMedia: teacherData.socialMedia || initialFormState.socialMedia,
        bankDetails: teacherData.bankDetails || initialFormState.bankDetails,
      })

      if (teacherData.subjectsTaught) {
        setSelectedSubjects(teacherData.subjectsTaught)
      }
    }
  }, [data])

  // Fixed handleInputChange function
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    section?: keyof FormData,
    index?: number,
  ) => {
    const { name, value } = e.target

    if (section && index !== undefined) {
      // Handle nested array fields (education, certifications, experience)
      setFormData((prev) => {
        const newArray = [...(prev[section] as any[])]
        newArray[index] = { ...newArray[index], [name]: value }
        return { ...prev, [section]: newArray }
      })
    } else if (section) {
      // Handle nested object fields (permanentAddress, currentAddress, etc.)
      setFormData((prev) => ({
        ...prev,
        [section]: { ...(prev[section] as any), [name]: value },
      }))
    } else {
      // Handle top-level fields
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Add handleSwitchChange function
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))

    if (name === "sameAsPermanent" && checked) {
      setFormData((prev) => ({
        ...prev,
        currentAddress: { ...prev.permanentAddress },
      }))
    }
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "", specialization: "" }],
    }))
  }

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuedBy: "", year: "", description: "" }],
    }))
  }

  // Remove certification entry
  const removeCertification = (index: number) => {
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
  const removeExperience = (index: number) => {
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

  // Fixed handleSubmit function
  const handleSubmit = async (e: any) => {
    e.preventDefault() // Prevent default form submission
    console.log("Form submitted", formData)
    setIsSubmitting(true)

    try {
      // Use the formData state directly which contains all the input values
      const submissionData = {
        ...formData,
        subjectsTaught: selectedSubjects,
      }

      if (id) {
        const res = await updateTeacher({ id, ...submissionData }).unwrap()

        if (res.success) {
          setSuccess(true)
          setSnackbar({
            open: true,
            message: "Teacher updated successfully!",
            severity: "success",
          })

          setTimeout(() => {
            router.push("/dashboard/super_admin/teacher/list")
          }, 2000)
        }
      } else {
        const res = await createTeacher(submissionData).unwrap()
        console.log(res)
        if (res.success) {
          setSuccess(true)
          setSnackbar({
            open: true,
            message: "Teacher registered successfully!",
            severity: "success",
          })

          setTimeout(() => {
            router.push("/dashboard/super_admin/teacher/list")
          }, 2000)
        }
      }
    } catch (error: any) {
      console.error("❌ Submission error:", error)
      setSnackbar({
        open: true,
        message: error?.data?.message || "Error processing teacher data.",
        severity: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add handleCloseSnackbar function
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  // Render form content based on active step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Basic Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Teacher ID"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <Fingerprint sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Teacher Serial"
                  name="teacherSerial"
                  value={formData.teacherSerial}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Smart ID Card"
                  name="smartIdCard"
                  value={formData.smartIdCard}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <AccountCircle sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="English Name (if different)"
                  name="englishName"
                  value={formData.englishName}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <AccountCircle sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <Email sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  size="medium"
                  //   InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftSelectWithIcon
                  name="bloodGroup"
                  size="medium"
                  label="Blood Group"
                  placeholder="Select blood group"
                  items={bloodGroup}
                  adornment={<Bloodtype color="action" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftSelectWithIcon
                  name="gender"
                  size="medium"
                  label="Gender"
                  placeholder="Select Gender"
                  items={genders}
                  adornment={<Wc color="action" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <Language sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <VerifiedUser sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CraftSelectWithIcon
                  name="maritalStatus"
                  size="medium"
                  label="Marital Status"
                  placeholder="Select Marital Status"
                  items={maritalStatuses}
                  adornment={<Group color="action" />}
                />
              </Grid>
              <Grid item xs={12}>
                <FileUploadWithIcon name="teacherPhoto" label="Teacher Photo" />
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
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Address Line"
                  name="address"
                  value={formData.permanentAddress.address}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  size="medium"
                  InputProps={{
                    startAdornment: <Home sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CraftInputWithIcon
                  fullWidth
                  label="Village/Area"
                  name="village"
                  value={formData.permanentAddress.village}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  size="medium"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CraftInputWithIcon
                  fullWidth
                  label="Post Office"
                  name="postOffice"
                  value={formData.permanentAddress.postOffice}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  size="medium"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CraftInputWithIcon
                  fullWidth
                  label="Thana/Police Station"
                  name="thana"
                  value={formData.permanentAddress.thana}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  size="medium"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="District"
                  name="district"
                  value={formData.permanentAddress.district}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  size="medium"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="State/Province"
                  name="state"
                  value={formData.permanentAddress.state}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  size="medium"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.permanentAddress.country}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  size="medium"
                  InputProps={{
                    startAdornment: <Language sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="Zip/Postal Code"
                  name="zipCode"
                  value={formData.permanentAddress.zipCode}
                  onChange={(e) => handleInputChange(e, "permanentAddress")}
                  size="medium"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.sameAsPermanent}
                    onChange={handleSwitchChange}
                    name="sameAsPermanent"
                    color="primary"
                  />
                }
                label="Current address same as permanent address"
              />
            </Box>

            {!formData.sameAsPermanent && (
              <>
                <Typography variant="h6" color="primary" gutterBottom>
                  Current Address
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="Address Line"
                      name="address"
                      value={formData.currentAddress.address}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      size="medium"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Village/Area"
                      name="village"
                      value={formData.currentAddress.village}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      size="medium"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Post Office"
                      name="postOffice"
                      value={formData.currentAddress.postOffice}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      size="medium"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Thana/Police Station"
                      name="thana"
                      value={formData.currentAddress.thana}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      size="medium"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="District"
                      name="district"
                      value={formData.currentAddress.district}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      size="medium"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <CraftInputWithIcon
                      fullWidth
                      label="State/Province"
                      name="state"
                      value={formData.currentAddress.state}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      size="medium"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="Country"
                      name="country"
                      value={formData.currentAddress.country}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      size="medium"
                      InputProps={{
                        startAdornment: <Language sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Zip/Postal Code"
                      name="zipCode"
                      value={formData.currentAddress.zipCode}
                      onChange={(e) => handleInputChange(e, "currentAddress")}
                      size="medium"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
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
                <CraftSelectWithIcon
                  required
                  name="designation"
                  size="medium"
                  label="Designation"
                  placeholder="Select Designation"
                  items={designations}
                  adornment={<BusinessCenter color="action" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftSelectWithIcon
                  required
                  name="department"
                  size="medium"
                  label="Department"
                  placeholder="Select Department"
                  items={departments}
                  adornment={<Apartment color="action" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  size="medium"
                  //   InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <EventNote sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  required
                  fullWidth
                  label="Monthly Salary"
                  name="monthlySalary"
                  type="number"
                  value={formData.monthlySalary}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftSelectWithIcon
                  required
                  name="staffType"
                  size="medium"
                  label="Staff Type"
                  placeholder="Select Staff Type"
                  items={staffTypes}
                  adornment={<Work color="action" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftSelectWithIcon
                  name="residenceType"
                  size="medium"
                  label="Residence Type"
                  placeholder="Select Residence Type"
                  items={residenceTypes}
                  adornment={<Home color="action" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftSelectWithIcon
                  name="subjectsTaught"
                  size="medium"
                  label="Subjects Taught"
                  placeholder="Select Subjects"
                  items={subjects}
                  adornment={<School color="action" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                  Bank Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="Account Holder Name"
                  name="accountName"
                  value={formData.bankDetails.accountName}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                  size="medium"
                  InputProps={{
                    startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                  size="medium"
                  InputProps={{
                    startAdornment: <CreditCard sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="Bank Name"
                  name="bankName"
                  value={formData.bankDetails.bankName}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                  size="medium"
                  InputProps={{
                    startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="Branch Name"
                  name="branchName"
                  value={formData.bankDetails.branchName}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                  size="medium"
                  InputProps={{
                    startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="IFSC Code"
                  name="ifscCode"
                  value={formData.bankDetails.ifscCode}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                  size="medium"
                  InputProps={{
                    startAdornment: <CreditCard sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
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
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="Degree/Certificate"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleInputChange(e, "education", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="Institution"
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleInputChange(e, "education", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="Year of Completion"
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleInputChange(e, "education", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Specialization"
                      name="specialization"
                      value={edu.specialization}
                      onChange={(e) => handleInputChange(e, "education", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
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
                    <CraftInputWithIcon
                      fullWidth
                      label="Certificate Name"
                      name="name"
                      value={cert.name}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Issued By"
                      name="issuedBy"
                      value={cert.issuedBy}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Year"
                      name="year"
                      value={cert.year}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Description"
                      name="description"
                      value={cert.description}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
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
                    <CraftInputWithIcon
                      fullWidth
                      label="Organization"
                      name="organization"
                      value={exp.organization}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Position"
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="From (Year)"
                      name="from"
                      value={exp.from}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="To (Year or Present)"
                      name="to"
                      value={exp.to}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={2}
                      value={exp.description}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <BusinessCenter sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
                        ),
                      }}
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
                <CraftInputWithIcon
                  fullWidth
                  label="Contact Name"
                  name="name"
                  size="medium"
                  InputProps={{
                    startAdornment: <AccountCircle sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="Relationship"
                  name="relation"
                  size="medium"
                  InputProps={{
                    startAdornment: <Group sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CraftInputWithIcon
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  size="medium"
                  InputProps={{
                    startAdornment: <ContactPhone sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 4 }}>
              Social Media Profiles
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="Facebook Profile"
                  name="facebook"
                  value={formData.socialMedia.facebook}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  size="medium"
                  InputProps={{
                    startAdornment: <Facebook sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="Twitter Profile"
                  name="twitter"
                  value={formData.socialMedia.twitter}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  size="medium"
                  InputProps={{
                    startAdornment: <Twitter sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="YouTube Channel"
                  name="youtube"
                  value={formData.socialMedia.youtube}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  size="medium"
                  InputProps={{
                    startAdornment: <YouTube sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="LinkedIn Profile"
                  name="linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  size="medium"
                  InputProps={{
                    startAdornment: <LinkedIn sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftInputWithIcon
                  fullWidth
                  label="Instagram Profile"
                  name="instagram"
                  value={formData.socialMedia.instagram}
                  onChange={(e) => handleInputChange(e, "socialMedia")}
                  size="medium"
                  InputProps={{
                    startAdornment: <Instagram sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 4 }}>
              Other Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CraftSelectWithIcon
                  required
                  name="status"
                  size="medium"
                  label="Status"
                  placeholder="Select Status"
                  items={statusOptions}
                  adornment={<VerifiedUser color="action" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CraftSelectWithIcon
                  name="language"
                  size="medium"
                  label="Preferred Language"
                  placeholder="Select Language"
                  items={languages}
                  adornment={<Language color="action" />}
                />
              </Grid>
              <Grid item xs={12}>
                <CraftInputWithIcon
                  fullWidth
                  label="Active Session"
                  name="activeSession"
                  value={formData.activeSession}
                  onChange={handleInputChange}
                  size="medium"
                  InputProps={{
                    startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )
      default:
        return "Unknown step"
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            {id ? "Edit Teacher" : "New Teacher Registration"}
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ mb: 4 }} />

        <CraftForm onSubmit={handleSubmit}>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowBack />} variant="outlined">
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? undefined : handleNext}
              type={activeStep === steps.length - 1 ? "submit" : "button"}
              endIcon={activeStep === steps.length - 1 ? <Check /> : <ArrowForward />}
              disabled={isSubmitting}
            >
              {activeStep === steps.length - 1
                ? isSubmitting
                  ? id
                    ? "Updating..."
                    : "Submitting..."
                  : id
                    ? "Update Teacher"
                    : "Register Teacher"
                : "Next"}
            </Button>
          </Box>
        </CraftForm>
      </Paper>

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
            {id
              ? "Teacher has been updated successfully. Redirecting to teacher list..."
              : "Teacher has been registered successfully. Redirecting to teacher list..."}
          </Typography>
          <CircularProgress size={24} sx={{ color: "primary.main" }} />
        </Box>
      </Backdrop>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
