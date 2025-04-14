/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { CardContent, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { AccountBalance, AccountBalanceWallet, Apartment, ArrowForwardIos, CalendarMonth, Language, LocalPrintshop, MonetizationOn, NoteAlt, School, Sms, VolunteerActivism, Work, WorkspacePremium } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import bg from '../../../assets/img/bg.webp'

const ColorfulIcon = ({ children, color }: any) => {
    return <div style={{ color: color, display: "flex", }}>{children}</div>
}

const modules = [
    {
        title: 'Manage Branch',
        description: 'Branch List, Update, Delete',
        icon: (
            <ColorfulIcon color="#4285F4">
                <AccountBalance />
            </ColorfulIcon>
        ),
        path: '/branch',
    },
    {
        title: 'Donation',
        description: 'Donor List, Update, Delete',
        icon: (
            <ColorfulIcon color="#DB4437">
                <VolunteerActivism />
            </ColorfulIcon>
        ),

        path: '/donation',
    },
    {
        title: 'Certificate',
        description: 'Create Certificate, Update, Delete',
        icon: (
            <ColorfulIcon color="#F4B400">
                <WorkspacePremium />
            </ColorfulIcon>
        ),

        path: '/certificate',
    },
    {
        title: 'Payroll',
        description: 'Teacher Salary Create, Update, Delete',
        icon: (
            <ColorfulIcon color="#4285F4">
                <Work />
            </ColorfulIcon>
        ),
        path: '/payroll',
    },
    {
        title: 'Website',
        description: 'Notice, Events, Blog, Contact',
        icon: (
            <ColorfulIcon color="#EA4335">
                <Language />
            </ColorfulIcon>
        ),

        path: '/website',
    },
    {
        title: 'Academic',
        description: 'Class, Batch, Student, Attendance',
        icon: (
            <ColorfulIcon color="#0F9D58">
                <School />
            </ColorfulIcon>
        ),

        path: '/academic',
    },
    {
        title: 'Exam',
        description: 'Grading, Exam, Result, Marksheet',
        icon: (
            <ColorfulIcon color="#FBBC05">
                <NoteAlt />
            </ColorfulIcon>
        ),
        path: '/exam',
    },
    {
        title: 'Accounting',
        description: 'Income, Expense, Transactions, Reports',
        icon: (
            <ColorfulIcon color="#34A853">
                <AccountBalanceWallet />
            </ColorfulIcon>
        ),
        path: '/accounting',
    },
    {
        title: 'Fees',
        description: 'Fee, Discounts, Fine, Collection',
        icon: (
            <ColorfulIcon color="#34A853">
                <MonetizationOn />
            </ColorfulIcon>
        ),
        path: '/fees',
    },
    {
        title: 'Print',
        description: 'ID Card, Admit Card, Result',
        icon: (
            <ColorfulIcon color="#DB4437">
                <LocalPrintshop />
            </ColorfulIcon>
        ),
        path: '/print',
    },
    {
        title: 'SMS',
        description: 'Send SMS and notice to teachers, students',
        icon: (
            <ColorfulIcon color="#4285F4">
                <Sms />
            </ColorfulIcon>
        ),
        path: '/sms',
    },
    {
        title: 'Attendance',
        description: 'Manage Attendance, Send attendance SMS',
        icon: (
            <ColorfulIcon color="#DB4437">
                <CalendarMonth />
            </ColorfulIcon>
        ),
        path: '/attendance',
    },
    {
        title: 'Department',
        description: 'Faculty And Department',
        icon: (
            <ColorfulIcon color="#4285F4">
                <Apartment />
            </ColorfulIcon>
        ),
        path: '/department',
    },
]

const DashboardHome = () => {
    const router = useRouter()

    return (
        <div className="relative w-full h-screen overflow-y-auto rounded-2xl">

            {/* Fullscreen background image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={bg}
                    alt="Background"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'top center',
                    }}
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-10" />
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                    {modules.map((mod, index) => (
                        <div key={index}>
                            <div
                                className="transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer rounded-2xl border border-gray-200 bg-white backdrop-blur-sm bg-opacity-90"
                                onClick={() => router.push(mod.path)}
                            >
                                <CardContent className="flex items-start justify-between gap-3">
                                    <Box>
                                        <div className="text-3xl mb-2">{mod.icon}</div>
                                        <Typography variant="subtitle1" className="font-semibold text-gray-800">
                                            {mod.title}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-500">
                                            {mod.description}
                                        </Typography>
                                    </Box>
                                    <ArrowForwardIos fontSize="small" className="text-gray-400 mt-2" />
                                </CardContent>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashboardHome
