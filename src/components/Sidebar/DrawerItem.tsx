import {
  Dashboard,
  School,
  Person,
  Payments,
  Print,
  Description,
  // Volunteer,
  AccountBalance,
  Assignment,
  EventNote,
  AssignmentTurnedIn,
  Grading,
  Sms,
  SupervisorAccount,
  FileCopy,
  Business,
  MenuBook,
  HowToReg,
  Groups,
  PhotoLibrary,
  Settings,
  Help,
  CalendarViewDay,
  Favorite,
  // Add these new imports
  AccessTime,
  Class,
  Group,
  MenuBook as Curriculum,
  AssignmentInd,
  Subject,
  Schedule,
  Assessment,
  BarChart,
  CloudUpload,
  Image,
  CompareArrows,
  SwapHoriz,
  AttachMoney,
  Category,
  LocalOffer,
  MoneyOff,
  Receipt,
  ReceiptLong,
  NotificationsActive,
  Delete,
  Badge,
  CardMembership,
  ConfirmationNumber,
  Score,
  TableChart,
  MonetizationOn,
  PieChart,
  FormatListNumbered,
  RequestPage,
  Paid,
  FactCheck,
  AccountBox,
  HomeWork,
  MeetingRoom,
  Timer,
  EventSeat,
  Download,
  Grade,
  Category as ExamCategory,
  Layers,
  Event,
  TableRows,
  Message,
  AccountBalance as Balance,
  Email,
  Report,
  People,
  FolderSpecial,
  Info,
  ContactPhone,
  EmojiTransportation,
  Group as GoverningBody,
  Work,
  Announcement,
  Celebration,
  PhotoAlbum,
  Person as Author,
  Category as BlogCategory,
  Article,
  Menu,
  Pages,
  School as Faculty,
  Domain,
  VideoLibrary,
  AdminPanelSettings,
  Tune,
  LiveHelp,
  VideoSettings,
} from "@mui/icons-material"

// Colorful icon wrapper component
const ColorfulIcon = ({ children, color }) => {
  return <div style={{ color: color, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
}

// Update the navigationItems array with appropriate icons for submenus
export const navigationItems = [
  {
    title: "Dashboard",
    icon: (
      <ColorfulIcon color="#4285F4">
        <Dashboard />
      </ColorfulIcon>
    ),
    path: "/",
  },
  {
    title: "Class",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <School />
      </ColorfulIcon>
    ),
    children: [
      {
        title: "Session ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <AccessTime />
          </ColorfulIcon>
        ),
        path: "/dashboard/super_admin/session",
      },
      {
        title: "Sections",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <AccessTime />
          </ColorfulIcon>
        ),
        path: "/dashboard/super_admin/section/list",
      },
      {
        title: "Classes",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Class />
          </ColorfulIcon>
        ),
        path: "/dashboard/super_admin/classes",
      },
      {
        title: "Batches",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Group />
          </ColorfulIcon>
        ),
        path: "/super_admin/about/add",
      },
      {
        title: "Curriculum",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Curriculum />
          </ColorfulIcon>
        ),
        path: "/super_admin/about/add",
      },
      {
        title: "Assign Teachers ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <AssignmentInd />
          </ColorfulIcon>
        ),
        path: "/super_admin/list",
      },
      {
        title: "Assign Subjects ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Subject />
          </ColorfulIcon>
        ),
        path: "/super_admin/about/list",
      },
      {
        title: "Assign Routines ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Schedule />
          </ColorfulIcon>
        ),
        path: "/super_admin/about/list",
      },
      {
        title: "New Report ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Assessment />
          </ColorfulIcon>
        ),
        path: "/super_admin/about/list",
      },
      {
        title: "Class Report List ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <BarChart />
          </ColorfulIcon>
        ),
        path: "/super_admin/about/list",
      },
    ],
  },
  {
    title: "Student",
    icon: (
      <ColorfulIcon color="#DB4437">
        <Person />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/shop/add",
        title: "Students",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Group />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/shop/list",
        title: "Upload Student",
        icon: (
          <ColorfulIcon color="#DB4437">
            <CloudUpload />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/shop/list",
        title: "Upload Student Image",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Image />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/shop/list",
        title: "Migrate Student",
        icon: (
          <ColorfulIcon color="#DB4437">
            <CompareArrows />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/shop/list",
        title: "Migrate Status ",
        icon: (
          <ColorfulIcon color="#DB4437">
            <SwapHoriz />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/shop/list",
        title: "Migrate Branch ",
        icon: (
          <ColorfulIcon color="#DB4437">
            <CompareArrows />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    segment: "super_admin/contact",
    title: "Fees",
    icon: (
      <ColorfulIcon color="#F4B400">
        <Payments />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/contact/add",
        title: "Fine Types  ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <AttachMoney />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Fees Types ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Category />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Discount",
        icon: (
          <ColorfulIcon color="#F4B400">
            <LocalOffer />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Assign Fees ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Payments />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Assign Discount ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <MoneyOff />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Assign Fines ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <AttachMoney />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Collect Fee Setting ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Settings />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Collect Fees ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Receipt />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Collected Fees Statement",
        icon: (
          <ColorfulIcon color="#F4B400">
            <ReceiptLong />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Send Late Fee SMS ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <NotificationsActive />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/contact/list",
        title: "Deleted Fees ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Delete />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    segment: "super_admin/blog",
    title: "Print",
    icon: (
      <ColorfulIcon color="#4285F4">
        <Print />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/blog/add",
        title: "ID Cards ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Badge />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Teacher ID Cards ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <CardMembership />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Admission Token  ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <ConfirmationNumber />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Admit Cards ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <CardMembership />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Tabular Result",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Score />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Income Statement ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <TableChart />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Summary Income Statement ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <MonetizationOn />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Monthly Income Statement ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <PieChart />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Student List",
        icon: (
          <ColorfulIcon color="#4285F4">
            <FormatListNumbered />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Salary Sheet ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <RequestPage />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Teacher Salary Repo ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Paid />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Employee Salary Repo ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <FactCheck />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/blog/list",
        title: "Forms & Certificate ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Description />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Forms & Certificates ",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <Description />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/topbar/list",
        title: "List Top Bar",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <FormatListNumbered />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    segment: "super_admin/review",
    title: "Donation",
    icon: (
      <ColorfulIcon color="#EA4335">
        <Favorite />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/review/add",
        title: "New Account ",
        icon: (
          <ColorfulIcon color="#EA4335">
            <AccountBox />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/review/list",
        title: "Account List ",
        icon: (
          <ColorfulIcon color="#EA4335">
            <FormatListNumbered />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/review/list",
        title: "Instant Donation ",
        icon: (
          <ColorfulIcon color="#EA4335">
            <Favorite />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/review/list",
        title: "Donar Category List ",
        icon: (
          <ColorfulIcon color="#EA4335">
            <Category />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/review/list",
        title: "Donar List ",
        icon: (
          <ColorfulIcon color="#EA4335">
            <People />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/review/list",
        title: "Receive Donations List ",
        icon: (
          <ColorfulIcon color="#EA4335">
            <Receipt />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/review/list",
        title: "Donation Project List ",
        icon: (
          <ColorfulIcon color="#EA4335">
            <FolderSpecial />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Accounting",
    icon: (
      <ColorfulIcon color="#34A853">
        <AccountBalance />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Setup ",
        icon: (
          <ColorfulIcon color="#34A853">
            <Settings />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/folder",
        title: "Income / Expense ",
        icon: (
          <ColorfulIcon color="#34A853">
            <MonetizationOn />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Home Work",
    icon: (
      <ColorfulIcon color="#FBBC05">
        <Assignment />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Home Works ",
        icon: (
          <ColorfulIcon color="#FBBC05">
            <HomeWork />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Attendance",
    icon: (
      <ColorfulIcon color="#4285F4">
        <EventNote />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Setup ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Settings />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/folder",
        title: "Attendance Report ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Assessment />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/folder",
        title: "Leave ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <EventNote />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Seat Plan",
    icon: (
      <ColorfulIcon color="#DB4437">
        <CalendarViewDay />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Exam Halls ",
        icon: (
          <ColorfulIcon color="#DB4437">
            <MeetingRoom />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Exam Duration ",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Timer />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Seat Plans ",
        icon: (
          <ColorfulIcon color="#DB4437">
            <EventSeat />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Download Seat Plans",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Download />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Exam",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <AssignmentTurnedIn />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Gradings ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Grade />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Exam Category ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <ExamCategory />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Exam Group ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Layers />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Exams",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <AssignmentTurnedIn />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Exam Routines ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Event />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Result",
    icon: (
      <ColorfulIcon color="#F4B400">
        <Grading />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Result",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Score />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "combined Result ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <TableRows />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Upload Result Sheet",
        icon: (
          <ColorfulIcon color="#F4B400">
            <CloudUpload />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Subject wise Mark Input ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Subject />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Excel Mark Input ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <TableChart />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Download Marksheet ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Download />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Send Result SMS",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Message />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "SMS",
    icon: (
      <ColorfulIcon color="#4285F4">
        <Sms />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Send Instant Message ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Message />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "SMS Balance ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Balance />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "All SMS",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Email />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Send SMS ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Sms />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Send Late Fee SMS ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <NotificationsActive />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "SMS Report ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Report />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Teacher",
    icon: (
      <ColorfulIcon color="#DB4437">
        <SupervisorAccount />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Teachers / Staffs",
        icon: (
          <ColorfulIcon color="#DB4437">
            <People />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Salary Report",
        icon: (
          <ColorfulIcon color="#DB4437">
            <ReceiptLong />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Documents",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <FileCopy />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Document Category",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Category />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Documents",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Description />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Institute ",
    icon: (
      <ColorfulIcon color="#F4B400">
        <Business />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Institute Messages ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Info />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Contacts",
        icon: (
          <ColorfulIcon color="#F4B400">
            <ContactPhone />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Facilities",
        icon: (
          <ColorfulIcon color="#F4B400">
            <EmojiTransportation />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Governing Body ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <GoverningBody />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Jobs ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Work />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Publication",
    icon: (
      <ColorfulIcon color="#4285F4">
        <MenuBook />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Notices ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Announcement />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Events ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Celebration />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Gallery ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <PhotoAlbum />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Authors ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Author />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Blog Category ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <BlogCategory />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Blogs ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Article />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Menu ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Menu />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Page ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Pages />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Admission",
    icon: (
      <ColorfulIcon color="#DB4437">
        <HowToReg />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Admission Info",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Info />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Online Applications",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Description />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Faculty",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <Groups />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "New Faculty",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Faculty />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Faculty List",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <FormatListNumbered />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "New Department",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Domain />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Department List",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <FormatListNumbered />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Institute Media ",
    icon: (
      <ColorfulIcon color="#F4B400">
        <PhotoLibrary />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "New Media ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <PhotoLibrary />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Media List",
        icon: (
          <ColorfulIcon color="#F4B400">
            <FormatListNumbered />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "New Video",
        icon: (
          <ColorfulIcon color="#F4B400">
            <VideoLibrary />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Video List",
        icon: (
          <ColorfulIcon color="#F4B400">
            <FormatListNumbered />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Administration",
    icon: (
      <ColorfulIcon color="#4285F4">
        <Business />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Staffs Users",
        icon: (
          <ColorfulIcon color="#4285F4">
            <AdminPanelSettings />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Teachers",
        icon: (
          <ColorfulIcon color="#4285F4">
            <SupervisorAccount />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/allimg",
        title: "Students",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Person />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Settings",
    icon: (
      <ColorfulIcon color="#DB4437">
        <Settings />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/allimg",
        title: "Default Settings",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Tune />
          </ColorfulIcon>
        ),
      },
    ],
  },
  {
    title: "Help",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <Help />
      </ColorfulIcon>
    ),
    children: [
      {
        path: "/super_admin/stock/help",
        title: "Help",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <LiveHelp />
          </ColorfulIcon>
        ),
      },
      {
        path: "/super_admin/stock/help",
        title: "Tutorials",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <VideoSettings />
          </ColorfulIcon>
        ),
      },
    ],
  },
]

