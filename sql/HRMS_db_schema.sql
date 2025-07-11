USE [master]
GO
/****** Object:  Database [HRMS_db]    Script Date: 7/8/2025 4:31:18 AM ******/
CREATE DATABASE [HRMS_db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HRMS_db', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\HRMS_db.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'HRMS_db_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\HRMS_db_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [HRMS_db] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HRMS_db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [HRMS_db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HRMS_db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HRMS_db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HRMS_db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HRMS_db] SET ARITHABORT OFF 
GO
ALTER DATABASE [HRMS_db] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [HRMS_db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HRMS_db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HRMS_db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HRMS_db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [HRMS_db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HRMS_db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HRMS_db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HRMS_db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HRMS_db] SET  ENABLE_BROKER 
GO
ALTER DATABASE [HRMS_db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HRMS_db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HRMS_db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HRMS_db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [HRMS_db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HRMS_db] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [HRMS_db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HRMS_db] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [HRMS_db] SET  MULTI_USER 
GO
ALTER DATABASE [HRMS_db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [HRMS_db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HRMS_db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [HRMS_db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [HRMS_db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [HRMS_db] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [HRMS_db] SET QUERY_STORE = ON
GO
ALTER DATABASE [HRMS_db] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [HRMS_db]
GO
/****** Object:  User [hrmsUser]    Script Date: 7/8/2025 4:31:19 AM ******/
CREATE USER [hrmsUser] FOR LOGIN [hrmsUser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [bob_user]    Script Date: 7/8/2025 4:31:19 AM ******/
CREATE USER [bob_user] FOR LOGIN [bob_user] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alice_user]    Script Date: 7/8/2025 4:31:19 AM ******/
CREATE USER [alice_user] FOR LOGIN [alice_user] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  DatabaseRole [HR_Manager]    Script Date: 7/8/2025 4:31:19 AM ******/
CREATE ROLE [HR_Manager]
GO
/****** Object:  DatabaseRole [Employee]    Script Date: 7/8/2025 4:31:19 AM ******/
CREATE ROLE [Employee]
GO
ALTER ROLE [db_owner] ADD MEMBER [hrmsUser]
GO
ALTER ROLE [Employee] ADD MEMBER [bob_user]
GO
ALTER ROLE [HR_Manager] ADD MEMBER [alice_user]
GO
/****** Object:  Table [dbo].[LeaveTypes]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaveTypes](
	[LeaveTypeID] [int] IDENTITY(1,1) NOT NULL,
	[TypeName] [varchar](50) NOT NULL,
	[MaxDaysPerYear] [int] NULL,
	[RequiresApproval] [bit] NOT NULL,
	[CarryForwardPolicy] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LeaveTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[TypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeaveStatus]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaveStatus](
	[StatusID] [tinyint] NOT NULL,
	[StatusName] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[EmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[DOB] [date] NULL,
	[DeptID] [int] NULL,
	[RoleID] [int] NULL,
	[JoinDate] [date] NOT NULL,
	[ReportsTo] [int] NULL,
	[IsActive] [bit] NOT NULL,
	[TerminationDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeaveRequests]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaveRequests](
	[LeaveID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[StatusID] [tinyint] NULL,
	[LeaveTypeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[LeaveID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_LeaveReqStatus]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- Updated view to show the leave type name from the new table.
CREATE   VIEW [dbo].[vw_LeaveReqStatus] AS
SELECT
    lr.LeaveID,
    e.EmployeeID,
    e.Name,
    lt.TypeName AS LeaveType, -- Now joins to the new table
    lr.StartDate,
    lr.EndDate,
    ls.StatusName
FROM
    LeaveRequests lr
JOIN
    Employees e ON lr.EmployeeID = e.EmployeeID
JOIN
    LeaveStatus ls ON lr.StatusID = ls.StatusID
JOIN
    LeaveTypes lt ON lr.LeaveTypeID = lt.LeaveTypeID; -- Join to the new table

GO
/****** Object:  Table [dbo].[Attendance]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Attendance](
	[EntryID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[Date] [date] NULL,
	[CheckInTime] [datetime] NULL,
	[CheckOutTime] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[EntryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_EmployeeAttendance]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_EmployeeAttendance] AS
SELECT 
    E.EmployeeID,
    E.Name,
    A.Date,
    A.CheckInTime,
    A.CheckOutTime
FROM 
    Attendance A
JOIN 
    Employees E ON A.EmployeeID = E.EmployeeID;
GO
/****** Object:  Table [dbo].[Payroll]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payroll](
	[PayrollID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[PayPeriodStart] [date] NOT NULL,
	[PayPeriodEnd] [date] NOT NULL,
	[BasicSalary] [money] NOT NULL,
	[Deductions] [money] NULL,
	[ProcessedDate] [datetime] NULL,
	[Status] [varchar](20) NULL,
	[HousingAllowance] [money] NOT NULL,
	[TransportAllowance] [money] NOT NULL,
	[OtherAllowances] [money] NOT NULL,
	[NetPay]  AS (((([BasicSalary]+[HousingAllowance])+[TransportAllowance])+[OtherAllowances])-[Deductions]) PERSISTED,
PRIMARY KEY CLUSTERED 
(
	[PayrollID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_PayrollOverview]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================================================
-- CORRECTED PAYROLL OVERVIEW VIEW
-- =============================================================================
-- This script updates the vw_PayrollOverview view to use the new salary
-- component columns (HousingAllowance, TransportAllowance, etc.),
-- resolving the binding error.
-- =============================================================================

CREATE   VIEW [dbo].[vw_PayrollOverview] AS
SELECT
    E.EmployeeID,
    E.Name,
    P.PayPeriodStart,
    P.PayPeriodEnd,
    P.BasicSalary,
    -- Corrected: Select the new, specific allowance columns instead of the old one
    P.HousingAllowance,
    P.TransportAllowance,
    P.OtherAllowances,
    P.Deductions,
    P.NetPay
FROM
    Payroll P
JOIN
    Employees E ON P.EmployeeID = E.EmployeeID;
GO
/****** Object:  Table [dbo].[Appraisals]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appraisals](
	[AppraisalID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[ReviewerID] [int] NULL,
	[ReviewCycle] [varchar](20) NULL,
	[ReviewDate] [date] NOT NULL,
	[Score] [decimal](3, 2) NULL,
	[Feedback] [varchar](max) NULL,
	[PromotionRecommended] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[AppraisalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_EmployeeAppraisals]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_EmployeeAppraisals] AS
SELECT 
    E.EmployeeID,
    E.Name,
    A.ReviewCycle,
    A.ReviewDate,
    A.Score,
    A.Feedback,
    A.PromotionRecommended
FROM 
    Appraisals A
JOIN 
    Employees E ON A.EmployeeID = E.EmployeeID;
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DeptID] [int] IDENTITY(1,1) NOT NULL,
	[DeptName] [nvarchar](30) NULL,
	[ManagerID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[DeptID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_DepartmentEmployeeCount]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_DepartmentEmployeeCount] AS
SELECT 
    D.DeptName,
    COUNT(E.EmployeeID) AS EmployeeCount
FROM 
    Departments D
LEFT JOIN 
    Employees E ON D.DeptID = E.DeptID
GROUP BY 
    D.DeptName;
GO
/****** Object:  Table [dbo].[Candidates]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Candidates](
	[CandidateID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [varchar](100) NOT NULL,
	[Email] [varchar](100) NULL,
	[Phone] [varchar](20) NULL,
	[PositionApplied] [varchar](100) NULL,
	[ResumeURL] [varchar](255) NULL,
	[Status] [varchar](20) NULL,
	[ApplicationDate] [date] NULL,
	[Hired] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[CandidateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_CandidateStatusSummary]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_CandidateStatusSummary] AS
SELECT 
    Status,
    COUNT(CandidateID) AS CandidateCount
FROM 
    Candidates
GROUP BY 
    Status;
GO
/****** Object:  Table [dbo].[SalaryGrades]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SalaryGrades](
	[GradeID] [int] IDENTITY(1,1) NOT NULL,
	[GradeName] [varchar](10) NOT NULL,
	[MinSalary] [money] NOT NULL,
	[MidSalary] [money] NULL,
	[MaxSalary] [money] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[GradeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleTitle] [nvarchar](30) NULL,
	[GradeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_SalaryDistributionByGrade]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_SalaryDistributionByGrade] AS
SELECT 
    SG.GradeName,
    COUNT(E.EmployeeID) AS EmployeeCount,
    AVG(P.BasicSalary) AS AvgSalary
FROM 
    Employees E
JOIN 
    Roles R ON E.RoleID = R.RoleID
JOIN 
    SalaryGrades SG ON R.GradeID = SG.GradeID
JOIN 
    Payroll P ON E.EmployeeID = P.EmployeeID
GROUP BY 
    SG.GradeName;
GO
/****** Object:  View [dbo].[vw_LeaveSummaryByEmployee]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_LeaveSummaryByEmployee] AS
SELECT 
    E.EmployeeID,
    E.Name,
    COUNT(L.LeaveID) AS TotalLeaveRequests,
    SUM(DATEDIFF(DAY, L.StartDate, L.EndDate) + 1) AS TotalLeaveDays
FROM 
    LeaveRequests L
JOIN 
    Employees E ON L.EmployeeID = E.EmployeeID
WHERE 
    L.StartDate >= '2025-01-01'
GROUP BY 
    E.EmployeeID, E.Name;
GO
/****** Object:  Table [dbo].[Assets]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Assets](
	[AssetID] [int] IDENTITY(1,1) NOT NULL,
	[AssetName] [varchar](100) NOT NULL,
	[CategoryID] [int] NOT NULL,
	[SerialNumber] [varchar](100) NULL,
	[PurchaseDate] [date] NULL,
	[Status] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AssetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[SerialNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetAssignments]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetAssignments](
	[AssignmentID] [int] IDENTITY(1,1) NOT NULL,
	[AssetID] [int] NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[AssignedDate] [date] NOT NULL,
	[ReturnedDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[AssignmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_AssignedAssets]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_AssignedAssets] AS
SELECT
    S.AssignmentID,
    A.AssetID,
    A.AssetName,
    E.Name,
    S.AssignedDate
FROM AssetAssignments AS S
JOIN Assets AS A ON A.AssetID = S.AssetID
JOIN Employees AS E ON S.EmployeeID = E.EmployeeID;
GO
/****** Object:  Table [dbo].[AssetCategories]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetCategories](
	[CategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[CategoryName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_AssetInventory]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   VIEW [dbo].[vw_AssetInventory] AS
SELECT
    a.AssetID,
    ac.CategoryName,
    a.AssetName,
    a.SerialNumber,
    a.Status,
    e.EmployeeID AS AssignedToEmployeeID,
    e.Name AS AssignedToEmployeeName,
    aa.AssignedDate
FROM
    Assets a
JOIN
    AssetCategories ac ON a.CategoryID = ac.CategoryID
LEFT JOIN
    AssetAssignments aa ON a.AssetID = aa.AssetID AND aa.ReturnedDate IS NULL
LEFT JOIN
    Employees e ON aa.EmployeeID = e.EmployeeID;
GO
/****** Object:  View [dbo].[vw_EmployeeAssets]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   VIEW [dbo].[vw_EmployeeAssets] AS
SELECT
    e.EmployeeID,
    e.Name AS EmployeeName,
    a.AssetID,
    ac.CategoryName,
    a.AssetName,
    a.SerialNumber,
    aa.AssignedDate
FROM
    AssetAssignments aa
JOIN
    Assets a ON aa.AssetID = a.AssetID
JOIN
    AssetCategories ac ON a.CategoryID = ac.CategoryID
JOIN
    Employees e ON aa.EmployeeID = e.EmployeeID
WHERE
    aa.ReturnedDate IS NULL;
GO
/****** Object:  Table [dbo].[EmployeeRoleHistory]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeRoleHistory](
	[RoleHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[RoleID] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeDepartmentHistory]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeDepartmentHistory](
	[DeptHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[DeptID] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[DeptHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_CurrentEmployeeDetails]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_CurrentEmployeeDetails] AS
SELECT
    e.EmployeeID,
    e.Name,
    r.RoleID,
    r.RoleTitle,
    d.DeptID,
    d.DeptName
FROM Employees e
JOIN EmployeeRoleHistory erh ON e.EmployeeID = erh.EmployeeID AND erh.EndDate IS NULL
JOIN Roles r ON erh.RoleID = r.RoleID
JOIN EmployeeDepartmentHistory edh ON e.EmployeeID = edh.EmployeeID AND edh.EndDate IS NULL
JOIN Departments d ON edh.DeptID = d.DeptID;

GO
/****** Object:  Table [dbo].[SalaryHistory]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SalaryHistory](
	[SalaryHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[GradeID] [int] NOT NULL,
	[EffectiveDate] [date] NOT NULL,
	[ReasonForChange] [varchar](255) NULL,
	[BasicSalary] [money] NOT NULL,
	[HousingAllowance] [money] NOT NULL,
	[TransportAllowance] [money] NOT NULL,
	[OtherAllowances] [money] NOT NULL,
	[TotalSalary]  AS ((([BasicSalary]+[HousingAllowance])+[TransportAllowance])+[OtherAllowances]),
PRIMARY KEY CLUSTERED 
(
	[SalaryHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_CurrentEmployeeSalaries]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Updated view to show the current salary breakdown
CREATE   VIEW [dbo].[vw_CurrentEmployeeSalaries] AS
WITH LatestSalary AS (
    SELECT
        EmployeeID,
        BasicSalary,
        HousingAllowance,
        TransportAllowance,
        OtherAllowances,
        TotalSalary,
        EffectiveDate,
        ROW_NUMBER() OVER(PARTITION BY EmployeeID ORDER BY EffectiveDate DESC) as rn
    FROM SalaryHistory
    WHERE EffectiveDate <= GETDATE()
)
SELECT
    e.EmployeeID,
    e.Name,
    ls.BasicSalary,
    ls.HousingAllowance,
    ls.TransportAllowance,
    ls.OtherAllowances,
    ls.TotalSalary,
    ls.EffectiveDate
FROM Employees e
JOIN LatestSalary ls ON e.EmployeeID = ls.EmployeeID
WHERE ls.rn = 1;

GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetEmployeeSalaryHistory]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

    CREATE FUNCTION [dbo].[fn_GetEmployeeSalaryHistory] (@EmployeeID INT)
    RETURNS TABLE
    AS
    RETURN
    (
        SELECT
            EmployeeID,
            EffectiveDate,
            SalaryAmount,
            GradeID,
            ReasonForChange
        FROM SalaryHistory
        WHERE EmployeeID = @EmployeeID
    );
    
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[ClientName] [varchar](150) NOT NULL,
	[ContactPerson] [varchar](100) NULL,
	[ContactEmail] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[ClientName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[ProjectID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectName] [varchar](150) NOT NULL,
	[ClientID] [int] NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NULL,
	[Status] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectAssignments]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectAssignments](
	[ProjectAssignmentID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectID] [int] NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[RoleInProject] [varchar](100) NULL,
	[AssignedDate] [date] NOT NULL,
	[UnassignedDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProjectAssignmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TimeEntries]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TimeEntries](
	[TimeEntryID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectAssignmentID] [int] NOT NULL,
	[EntryDate] [date] NOT NULL,
	[HoursWorked] [decimal](4, 2) NOT NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[TimeEntryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_ProjectOverview]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   VIEW [dbo].[vw_ProjectOverview] AS
SELECT
    p.ProjectID,
    p.ProjectName,
    c.ClientName,
    p.StartDate,
    p.EndDate,
    p.Status,
    (SELECT COUNT(*) FROM ProjectAssignments pa WHERE pa.ProjectID = p.ProjectID AND pa.UnassignedDate IS NULL) AS TeamSize,
    (SELECT SUM(te.HoursWorked) FROM TimeEntries te JOIN ProjectAssignments pa ON te.ProjectAssignmentID = pa.ProjectAssignmentID WHERE pa.ProjectID = p.ProjectID) AS TotalHoursLogged
FROM
    Projects p
LEFT JOIN
    Clients c ON p.ClientID = c.ClientID;

GO
/****** Object:  View [dbo].[vw_ProjectTeams]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   VIEW [dbo].[vw_ProjectTeams] AS
SELECT
    p.ProjectID,
    p.ProjectName,
    e.EmployeeID,
    e.Name AS EmployeeName,
    pa.RoleInProject,
    pa.AssignedDate
FROM
    ProjectAssignments pa
JOIN
    Projects p ON pa.ProjectID = p.ProjectID
JOIN
    Employees e ON pa.EmployeeID = e.EmployeeID
WHERE
    pa.UnassignedDate IS NULL;

GO
/****** Object:  View [dbo].[vw_EmployeeMaster]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- This command replaces the old view with the new, corrected version.
CREATE   VIEW [dbo].[vw_EmployeeMaster] AS
SELECT
    d.EmployeeID,
    d.Name,
    d.RoleTitle,
    d.DeptName,
    s.TotalSalary AS CurrentSalary,
    s.EffectiveDate AS SalaryEffectiveDate,
    e.IsActive -- NEW: Include IsActive from the Employees table
FROM
    vw_CurrentEmployeeDetails d
JOIN
    vw_CurrentEmployeeSalaries s ON d.EmployeeID = s.EmployeeID
JOIN
    Employees e ON d.EmployeeID = e.EmployeeID; -- NEW: Join to Employees table to get IsActive
GO
/****** Object:  View [dbo].[vw_EmployeeTimesheets]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   VIEW [dbo].[vw_EmployeeTimesheets] AS
SELECT
    e.EmployeeID,
    e.Name AS EmployeeName,
    p.ProjectName,
    te.EntryDate,
    te.HoursWorked,
    te.Description
FROM
    TimeEntries te
JOIN
    ProjectAssignments pa ON te.ProjectAssignmentID = pa.ProjectAssignmentID
JOIN
    Employees e ON pa.EmployeeID = e.EmployeeID
JOIN
    Projects p ON pa.ProjectID = p.ProjectID;

GO
/****** Object:  View [dbo].[vw_EmployeesCurrentlyOnLeave]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   VIEW [dbo].[vw_EmployeesCurrentlyOnLeave] AS
SELECT
    e.EmployeeID,
    e.Name,
    d.DeptName,
    lr.Type AS LeaveType,
    lr.StartDate,
    lr.EndDate
FROM
    LeaveRequests lr
JOIN
    Employees e ON lr.EmployeeID = e.EmployeeID
JOIN
    LeaveStatus ls ON lr.StatusID = ls.StatusID
JOIN
    vw_CurrentEmployeeDetails d ON e.EmployeeID = d.EmployeeID
WHERE
    ls.StatusName = 'Approved'
    AND GETDATE() BETWEEN lr.StartDate AND lr.EndDate;

GO
/****** Object:  View [dbo].[vw_SalaryCompaRatio]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Re-run this script after updating vw_EmployeeMaster to ensure dependencies are correct.
CREATE   VIEW [dbo].[vw_SalaryCompaRatio] AS
SELECT
    em.EmployeeID,
    em.Name,
    em.RoleTitle,
    sg.GradeName,
    em.CurrentSalary, -- This now correctly reads the TotalSalary from the master view
    sg.MinSalary,
    sg.MidSalary,
    sg.MaxSalary,
    CASE
        WHEN sg.MidSalary IS NOT NULL AND sg.MidSalary > 0
        THEN CAST(em.CurrentSalary / sg.MidSalary AS DECIMAL(10, 2))
        ELSE NULL
    END AS CompaRatio
FROM
    vw_EmployeeMaster em
JOIN
    vw_CurrentEmployeeDetails ced ON em.EmployeeID = ced.EmployeeID
JOIN
    Roles r ON ced.RoleID = r.RoleID
JOIN
    SalaryGrades sg ON r.GradeID = sg.GradeID;

GO
/****** Object:  View [dbo].[vw_EmployeeHierarchy]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   VIEW [dbo].[vw_EmployeeHierarchy] AS
WITH EmployeeCTE AS (
    -- Anchor member: Employees who report to no one (top-level managers)
    SELECT
        EmployeeID,
        Name,
        ReportsTo,
        1 AS HierarchyLevel,
        CAST(Name AS VARCHAR(MAX)) AS OrgPath
    FROM
        Employees
    WHERE
        ReportsTo IS NULL

    UNION ALL

    -- Recursive member: Employees who report to someone in the previous level
    SELECT
        e.EmployeeID,
        e.Name,
        e.ReportsTo,
        ecte.HierarchyLevel + 1,
        CAST(ecte.OrgPath + ' -> ' + e.Name AS VARCHAR(MAX))
    FROM
        Employees e
    INNER JOIN
        EmployeeCTE ecte ON e.ReportsTo = ecte.EmployeeID
)
SELECT
    e.EmployeeID,
    e.Name AS EmployeeName,
    e.HierarchyLevel,
    ISNULL(m.Name, 'Top Level') AS ManagerName,
    e.OrgPath
FROM
    EmployeeCTE e
LEFT JOIN
    Employees m ON e.ReportsTo = m.EmployeeID;

GO
/****** Object:  View [dbo].[vw_EmployeeJourney]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- This command replaces the old view with the new, corrected version.
CREATE   VIEW [dbo].[vw_EmployeeJourney] AS
-- Select all role changes
SELECT
    erh.EmployeeID,
    erh.StartDate AS EventDate,
    'Role Change' AS EventType,
    'Role changed to ' + r.RoleTitle AS EventDescription
FROM
    EmployeeRoleHistory erh
JOIN
    Roles r ON erh.RoleID = r.RoleID

UNION ALL

-- Select all department changes
SELECT
    edh.EmployeeID,
    edh.StartDate AS EventDate,
    'Department Transfer' AS EventType,
    'Transferred to ' + d.DeptName AS EventDescription
FROM
    EmployeeDepartmentHistory edh
JOIN
    Departments d ON edh.DeptID = d.DeptID

UNION ALL

-- Select all salary changes (Corrected to use TotalSalary)
SELECT
    sh.EmployeeID,
    sh.EffectiveDate AS EventDate,
    'Salary Update' AS EventType,
    'Total Salary updated to ' + FORMAT(sh.TotalSalary, 'C', 'en-US') + ' (' + sh.ReasonForChange + ')' AS EventDescription
FROM
    SalaryHistory sh;

GO
/****** Object:  Table [dbo].[EmployeeLeaveBalances]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeLeaveBalances](
	[BalanceID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[LeaveTypeID] [int] NOT NULL,
	[AccruedDays] [decimal](5, 2) NOT NULL,
	[TakenDays] [decimal](5, 2) NOT NULL,
	[Balance]  AS ([AccruedDays]-[TakenDays]),
PRIMARY KEY CLUSTERED 
(
	[BalanceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_EmployeeLeaveBalances]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   VIEW [dbo].[vw_EmployeeLeaveBalances] AS
SELECT
    e.EmployeeID,
    e.Name,
    lt.TypeName,
    ISNULL(elb.AccruedDays, 0) AS AccruedDays,
    ISNULL(elb.TakenDays, 0) AS TakenDays,
    ISNULL(elb.Balance, 0) AS RemainingBalance
FROM
    Employees e
CROSS JOIN
    LeaveTypes lt -- Show a record for every employee for every leave type
LEFT JOIN
    EmployeeLeaveBalances elb ON e.EmployeeID = elb.EmployeeID AND lt.LeaveTypeID = elb.LeaveTypeID
WHERE
    e.IsActive = 1;

GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetEmployeeSnapshotAtDate]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   FUNCTION [dbo].[fn_GetEmployeeSnapshotAtDate] (
    @EmployeeID INT,
    @SnapshotDate DATE
)
RETURNS TABLE
AS
RETURN
(
    -- Use CROSS APPLY to find the correct historical records for the given date
    SELECT
        e.EmployeeID,
        e.Name,
        @SnapshotDate AS AsOfDate,
        r.RoleTitle AS RoleOnDate,
        d.DeptName AS DepartmentOnDate
    FROM
        Employees e
    -- Find the active role on the snapshot date
    CROSS APPLY (
        SELECT TOP 1 RoleID
        FROM EmployeeRoleHistory
        WHERE EmployeeID = e.EmployeeID
          AND StartDate <= @SnapshotDate
          AND (EndDate IS NULL OR EndDate >= @SnapshotDate)
        ORDER BY StartDate DESC
    ) AS RoleHist
    -- Find the active department on the snapshot date
    CROSS APPLY (
        SELECT TOP 1 DeptID
        FROM EmployeeDepartmentHistory
        WHERE EmployeeID = e.EmployeeID
          AND StartDate <= @SnapshotDate
          AND (EndDate IS NULL OR EndDate >= @SnapshotDate)
        ORDER BY StartDate DESC
    ) AS DeptHist
    -- Join to get the names
    JOIN Roles r ON RoleHist.RoleID = r.RoleID
    JOIN Departments d ON DeptHist.DeptID = d.DeptID
    WHERE
        e.EmployeeID = @EmployeeID
);

GO
/****** Object:  View [dbo].[vw_RoleOccupancyHistory]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   VIEW [dbo].[vw_RoleOccupancyHistory] AS
SELECT
    r.RoleID,
    r.RoleTitle,
    e.Name AS EmployeeName,
    erh.StartDate,
    erh.EndDate,
    -- Calculate the duration in days. If EndDate is NULL, they are the current occupant.
    DATEDIFF(day, erh.StartDate, ISNULL(erh.EndDate, GETDATE())) AS DaysInRole
FROM
    EmployeeRoleHistory erh
JOIN
    Employees e ON erh.EmployeeID = e.EmployeeID
JOIN
    Roles r ON erh.RoleID = r.RoleID;

GO
/****** Object:  Table [dbo].[EmployeeContactDetails]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeContactDetails](
	[ContactID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[PersonalEmail] [varchar](100) NULL,
	[MobilePhone] [varchar](25) NULL,
	[HomeAddressLine1] [varchar](255) NULL,
	[HomeAddressLine2] [varchar](255) NULL,
	[City] [varchar](100) NULL,
	[Country] [varchar](100) NULL,
	[EmergencyContactName] [varchar](100) NULL,
	[EmergencyContactPhone] [varchar](25) NULL,
	[EmergencyContactRelationship] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ContactID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_EmployeeFullProfile]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_EmployeeFullProfile] AS
SELECT
    m.*,
    cd.PersonalEmail,
    cd.MobilePhone,
    cd.HomeAddressLine1,
    cd.EmergencyContactName,
    cd.EmergencyContactPhone
FROM
    vw_EmployeeMaster m
JOIN
    EmployeeContactDetails cd ON m.EmployeeID = cd.EmployeeID;
GO
/****** Object:  Table [dbo].[EmployeeOnboardingSteps]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeOnboardingSteps](
	[OnboardingStepID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[StepName] [varchar](255) NOT NULL,
	[IsCompleted] [bit] NOT NULL,
	[CompletionDate] [date] NULL,
	[ResponsibleDept] [varchar](100) NULL,
	[Notes] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[OnboardingStepID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_EmployeeOnboardingStatus]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   VIEW [dbo].[vw_EmployeeOnboardingStatus] AS
SELECT
    eos.EmployeeID,
    e.Name AS EmployeeName,
    eos.StepName,
    eos.ResponsibleDept,
    CASE WHEN eos.IsCompleted = 1 THEN 'Completed' ELSE 'Pending' END AS Status,
    eos.CompletionDate,
    eos.Notes
FROM
    EmployeeOnboardingSteps eos
JOIN
    Employees e ON eos.EmployeeID = e.EmployeeID;

GO
/****** Object:  Table [dbo].[AuditLogs]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuditLogs](
	[LogID] [int] IDENTITY(1,1) NOT NULL,
	[ActionType] [varchar](50) NULL,
	[TableName] [varchar](50) NULL,
	[RecordID] [int] NULL,
	[OldValue] [text] NULL,
	[NewValue] [text] NULL,
	[ActionPerformedBy] [int] NULL,
	[ActionTimestamp] [datetime] NULL,
	[Description] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[LogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 7/8/2025 4:31:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[PasswordHash] [nvarchar](255) NOT NULL,
	[RoleID] [int] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Assets] ADD  DEFAULT ('Available') FOR [Status]
GO
ALTER TABLE [dbo].[AuditLogs] ADD  DEFAULT (getdate()) FOR [ActionTimestamp]
GO
ALTER TABLE [dbo].[Candidates] ADD  DEFAULT ('Applied') FOR [Status]
GO
ALTER TABLE [dbo].[Candidates] ADD  DEFAULT (getdate()) FOR [ApplicationDate]
GO
ALTER TABLE [dbo].[Candidates] ADD  DEFAULT ((0)) FOR [Hired]
GO
ALTER TABLE [dbo].[EmployeeLeaveBalances] ADD  DEFAULT ((0)) FOR [AccruedDays]
GO
ALTER TABLE [dbo].[EmployeeLeaveBalances] ADD  DEFAULT ((0)) FOR [TakenDays]
GO
ALTER TABLE [dbo].[EmployeeOnboardingSteps] ADD  DEFAULT ((0)) FOR [IsCompleted]
GO
ALTER TABLE [dbo].[Employees] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[LeaveTypes] ADD  DEFAULT ((1)) FOR [RequiresApproval]
GO
ALTER TABLE [dbo].[LeaveTypes] ADD  DEFAULT ((0)) FOR [CarryForwardPolicy]
GO
ALTER TABLE [dbo].[Payroll] ADD  DEFAULT ((0)) FOR [Deductions]
GO
ALTER TABLE [dbo].[Payroll] ADD  DEFAULT (getdate()) FOR [ProcessedDate]
GO
ALTER TABLE [dbo].[Payroll] ADD  DEFAULT ('Pending') FOR [Status]
GO
ALTER TABLE [dbo].[Payroll] ADD  DEFAULT ((0)) FOR [HousingAllowance]
GO
ALTER TABLE [dbo].[Payroll] ADD  DEFAULT ((0)) FOR [TransportAllowance]
GO
ALTER TABLE [dbo].[Payroll] ADD  DEFAULT ((0)) FOR [OtherAllowances]
GO
ALTER TABLE [dbo].[Projects] ADD  DEFAULT ('Active') FOR [Status]
GO
ALTER TABLE [dbo].[SalaryHistory] ADD  DEFAULT ((0)) FOR [BasicSalary]
GO
ALTER TABLE [dbo].[SalaryHistory] ADD  DEFAULT ((0)) FOR [HousingAllowance]
GO
ALTER TABLE [dbo].[SalaryHistory] ADD  DEFAULT ((0)) FOR [TransportAllowance]
GO
ALTER TABLE [dbo].[SalaryHistory] ADD  DEFAULT ((0)) FOR [OtherAllowances]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Appraisals]  WITH CHECK ADD  CONSTRAINT [FK_Appraisal_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Appraisals] CHECK CONSTRAINT [FK_Appraisal_Employee]
GO
ALTER TABLE [dbo].[Appraisals]  WITH CHECK ADD  CONSTRAINT [FK_Appraisal_Reviewer] FOREIGN KEY([ReviewerID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Appraisals] CHECK CONSTRAINT [FK_Appraisal_Reviewer]
GO
ALTER TABLE [dbo].[AssetAssignments]  WITH CHECK ADD  CONSTRAINT [FK_AssetAssignments_Asset] FOREIGN KEY([AssetID])
REFERENCES [dbo].[Assets] ([AssetID])
GO
ALTER TABLE [dbo].[AssetAssignments] CHECK CONSTRAINT [FK_AssetAssignments_Asset]
GO
ALTER TABLE [dbo].[AssetAssignments]  WITH CHECK ADD  CONSTRAINT [FK_AssetAssignments_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[AssetAssignments] CHECK CONSTRAINT [FK_AssetAssignments_Employee]
GO
ALTER TABLE [dbo].[Assets]  WITH CHECK ADD  CONSTRAINT [FK_Assets_Category] FOREIGN KEY([CategoryID])
REFERENCES [dbo].[AssetCategories] ([CategoryID])
GO
ALTER TABLE [dbo].[Assets] CHECK CONSTRAINT [FK_Assets_Category]
GO
ALTER TABLE [dbo].[Attendance]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Departments]  WITH CHECK ADD  CONSTRAINT [FK_Department_Manager] FOREIGN KEY([ManagerID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Departments] CHECK CONSTRAINT [FK_Department_Manager]
GO
ALTER TABLE [dbo].[EmployeeContactDetails]  WITH CHECK ADD  CONSTRAINT [FK_ContactDetails_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeeContactDetails] CHECK CONSTRAINT [FK_ContactDetails_Employee]
GO
ALTER TABLE [dbo].[EmployeeDepartmentHistory]  WITH CHECK ADD  CONSTRAINT [FK_DeptHistory_Department] FOREIGN KEY([DeptID])
REFERENCES [dbo].[Departments] ([DeptID])
GO
ALTER TABLE [dbo].[EmployeeDepartmentHistory] CHECK CONSTRAINT [FK_DeptHistory_Department]
GO
ALTER TABLE [dbo].[EmployeeDepartmentHistory]  WITH CHECK ADD  CONSTRAINT [FK_DeptHistory_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeeDepartmentHistory] CHECK CONSTRAINT [FK_DeptHistory_Employee]
GO
ALTER TABLE [dbo].[EmployeeLeaveBalances]  WITH CHECK ADD  CONSTRAINT [FK_LeaveBalances_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeeLeaveBalances] CHECK CONSTRAINT [FK_LeaveBalances_Employee]
GO
ALTER TABLE [dbo].[EmployeeLeaveBalances]  WITH CHECK ADD  CONSTRAINT [FK_LeaveBalances_LeaveType] FOREIGN KEY([LeaveTypeID])
REFERENCES [dbo].[LeaveTypes] ([LeaveTypeID])
GO
ALTER TABLE [dbo].[EmployeeLeaveBalances] CHECK CONSTRAINT [FK_LeaveBalances_LeaveType]
GO
ALTER TABLE [dbo].[EmployeeOnboardingSteps]  WITH CHECK ADD  CONSTRAINT [FK_OnboardingSteps_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeeOnboardingSteps] CHECK CONSTRAINT [FK_OnboardingSteps_Employee]
GO
ALTER TABLE [dbo].[EmployeeRoleHistory]  WITH CHECK ADD  CONSTRAINT [FK_RoleHistory_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeeRoleHistory] CHECK CONSTRAINT [FK_RoleHistory_Employee]
GO
ALTER TABLE [dbo].[EmployeeRoleHistory]  WITH CHECK ADD  CONSTRAINT [FK_RoleHistory_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[EmployeeRoleHistory] CHECK CONSTRAINT [FK_RoleHistory_Role]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD FOREIGN KEY([DeptID])
REFERENCES [dbo].[Departments] ([DeptID])
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employee_ReportsTo] FOREIGN KEY([ReportsTo])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employee_ReportsTo]
GO
ALTER TABLE [dbo].[LeaveRequests]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[LeaveRequests]  WITH CHECK ADD FOREIGN KEY([StatusID])
REFERENCES [dbo].[LeaveStatus] ([StatusID])
GO
ALTER TABLE [dbo].[LeaveRequests]  WITH CHECK ADD  CONSTRAINT [FK_LeaveRequests_LeaveType] FOREIGN KEY([LeaveTypeID])
REFERENCES [dbo].[LeaveTypes] ([LeaveTypeID])
GO
ALTER TABLE [dbo].[LeaveRequests] CHECK CONSTRAINT [FK_LeaveRequests_LeaveType]
GO
ALTER TABLE [dbo].[Payroll]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[ProjectAssignments]  WITH CHECK ADD  CONSTRAINT [FK_ProjectAssignments_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[ProjectAssignments] CHECK CONSTRAINT [FK_ProjectAssignments_Employee]
GO
ALTER TABLE [dbo].[ProjectAssignments]  WITH CHECK ADD  CONSTRAINT [FK_ProjectAssignments_Project] FOREIGN KEY([ProjectID])
REFERENCES [dbo].[Projects] ([ProjectID])
GO
ALTER TABLE [dbo].[ProjectAssignments] CHECK CONSTRAINT [FK_ProjectAssignments_Project]
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Client] FOREIGN KEY([ClientID])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[Projects] CHECK CONSTRAINT [FK_Projects_Client]
GO
ALTER TABLE [dbo].[Roles]  WITH CHECK ADD FOREIGN KEY([GradeID])
REFERENCES [dbo].[SalaryGrades] ([GradeID])
GO
ALTER TABLE [dbo].[SalaryHistory]  WITH CHECK ADD  CONSTRAINT [FK_SalaryHistory_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[SalaryHistory] CHECK CONSTRAINT [FK_SalaryHistory_Employee]
GO
ALTER TABLE [dbo].[SalaryHistory]  WITH CHECK ADD  CONSTRAINT [FK_SalaryHistory_Grade] FOREIGN KEY([GradeID])
REFERENCES [dbo].[SalaryGrades] ([GradeID])
GO
ALTER TABLE [dbo].[SalaryHistory] CHECK CONSTRAINT [FK_SalaryHistory_Grade]
GO
ALTER TABLE [dbo].[TimeEntries]  WITH CHECK ADD  CONSTRAINT [FK_TimeEntries_ProjectAssignment] FOREIGN KEY([ProjectAssignmentID])
REFERENCES [dbo].[ProjectAssignments] ([ProjectAssignmentID])
GO
ALTER TABLE [dbo].[TimeEntries] CHECK CONSTRAINT [FK_TimeEntries_ProjectAssignment]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles]
GO
/****** Object:  StoredProcedure [dbo].[AccrueAnnualLeave]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[AccrueAnnualLeave]
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @AnnualLeaveID INT, @AnnualLeaveDays INT;
    SELECT @AnnualLeaveID = LeaveTypeID, @AnnualLeaveDays = MaxDaysPerYear FROM LeaveTypes WHERE TypeName = 'Annual Leave';

    MERGE EmployeeLeaveBalances AS target
    USING (SELECT EmployeeID FROM Employees WHERE IsActive = 1) AS source
    ON (target.EmployeeID = source.EmployeeID AND target.LeaveTypeID = @AnnualLeaveID)
    WHEN MATCHED THEN
        UPDATE SET AccruedDays = target.AccruedDays + @AnnualLeaveDays
    WHEN NOT MATCHED BY TARGET THEN
        INSERT (EmployeeID, LeaveTypeID, AccruedDays)
        VALUES (source.EmployeeID, @AnnualLeaveID, @AnnualLeaveDays);

    PRINT 'Annual leave has been accrued for all active employees.';
END

GO
/****** Object:  StoredProcedure [dbo].[AddAsset]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[AddAsset]
	@CategoryName varchar(100),
	@AssetName varchar(100),
	@SerialNumber varchar(100),
	@PurchaseDate DATE
AS
BEGIN
	DECLARE @CategoryID int;
	SELECT @CategoryID = CategoryID FROM AssetCategories WHERE CategoryName=@CategoryName;

	IF @CategoryName IS NULL
	BEGIN
		RAISERROR('Asset category does not exist.', 16, 1);
		RETURN;
	END

	INSERT INTO Assets(CategoryID, AssetName, SerialNumber, PurchaseDate, Status)
	VALUES (@CategoryID,@AssetName,@SerialNumber,@PurchaseDate, 'Available')
END	
GO
/****** Object:  StoredProcedure [dbo].[AddEmployee]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[AddEmployee]
    @Name NVARCHAR(50),
    @DOB DATE,
    @DeptID INT,
    @RoleID INT,
    @JoinDate DATE,
    -- NEW: Add initial salary components as parameters for the first salary history entry
    @BasicSalary MONEY = 0, -- Default to 0 if not provided
    @HousingAllowance MONEY = 0,
    @TransportAllowance MONEY = 0,
    @OtherAllowances MONEY = 0,
    @GradeID INT = NULL -- The GradeID associated with their initial role/salary
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmployeeID INT; -- To store the newly inserted EmployeeID

    -- Start a transaction for atomicity
    BEGIN TRANSACTION;
    BEGIN TRY

        -- 1. Insert into Employees table
        INSERT INTO Employees (Name, DOB, DeptID, RoleID, JoinDate, IsActive)
        VALUES (@Name, @DOB, @DeptID, @RoleID, @JoinDate, 1); -- Ensure IsActive is 1 for new hires

        SELECT @EmployeeID = SCOPE_IDENTITY(); -- Get the ID of the newly inserted employee

        -- 2. Insert into EmployeeRoleHistory
        INSERT INTO EmployeeRoleHistory (EmployeeID, RoleID, StartDate, EndDate)
        VALUES (@EmployeeID, @RoleID, @JoinDate, NULL); -- EndDate is NULL for current role

        -- 3. Insert into EmployeeDepartmentHistory
        INSERT INTO EmployeeDepartmentHistory (EmployeeID, DeptID, StartDate, EndDate)
        VALUES (@EmployeeID, @DeptID, @JoinDate, NULL); -- EndDate is NULL for current department

        -- 4. Insert initial SalaryHistory record
        -- Need to get the GradeID associated with the RoleID or provide it directly
        IF @GradeID IS NULL
        BEGIN
            SELECT @GradeID = GradeID FROM Roles WHERE RoleID = @RoleID;
        END

        INSERT INTO SalaryHistory (
            EmployeeID, GradeID, EffectiveDate, BasicSalary,
            HousingAllowance, TransportAllowance, OtherAllowances, ReasonForChange
        )
        VALUES (
            @EmployeeID, @GradeID, @JoinDate, @BasicSalary,
            @HousingAllowance, @TransportAllowance, @OtherAllowances, 'Initial Hire Salary'
        );

        -- Commit the transaction if all steps succeed
        COMMIT TRANSACTION;

        -- Return the new EmployeeID
        SELECT @EmployeeID AS EmployeeID;

    END TRY
    BEGIN CATCH
        -- Rollback transaction if any error occurs
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Re-raise the error to the caller
        DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrMsg, 16, 1);
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[ApplyLeave]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Updated procedure to apply for leave using the new ID.
CREATE   PROCEDURE [dbo].[ApplyLeave]
    @EmployeeID INT,
    @LeaveTypeID INT, -- Changed from VARCHAR to INT
    @StartDate DATE,
    @EndDate DATE
AS
BEGIN
    SET NOCOUNT ON;
    -- Optional: Add validation to check leave balance here (see next section).
    INSERT INTO LeaveRequests (EmployeeID, LeaveTypeID, StartDate, EndDate, StatusID)
    VALUES (@EmployeeID, @LeaveTypeID, @StartDate, @EndDate, 0); -- Status 0 = Pending

    SELECT SCOPE_IDENTITY() AS LeaveID;
END;

GO
/****** Object:  StoredProcedure [dbo].[AssignAssetToEmployee]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[AssignAssetToEmployee]
    @AssetID INT,
    @EmployeeID INT,
    @AssignedDate DATE
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Start transaction
        BEGIN TRANSACTION;

        -- Validation: Asset must exist and be available
        IF NOT EXISTS (
            SELECT 1 FROM Assets 
            WHERE AssetID = @AssetID AND Status = 'Available'
        )
        BEGIN
            RAISERROR('Asset does not exist or is not available for assignment.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Validation: Employee must exist and be active
        IF NOT EXISTS (
            SELECT 1 FROM Employees 
            WHERE EmployeeID = @EmployeeID AND IsActive = 1
        )
        BEGIN
            RAISERROR('Employee does not exist or is not active.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Update asset status
        UPDATE Assets 
        SET Status = 'Assigned' 
        WHERE AssetID = @AssetID;

        -- Insert assignment record
        INSERT INTO AssetAssignments (AssetID, EmployeeID, AssignedDate, ReturnedDate)
        VALUES (@AssetID, @EmployeeID, @AssignedDate, NULL);

        -- Commit transaction
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Roll back and re-raise in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrMsg, 16, 1);
    END CATCH
END;

GO
/****** Object:  StoredProcedure [dbo].[AssignEmployeeToProject]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[AssignEmployeeToProject]
    @EmployeeID INT,
    @ProjectID INT,
    @RoleInProject VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO ProjectAssignments (EmployeeID, ProjectID, RoleInProject, AssignedDate)
    VALUES (@EmployeeID, @ProjectID, @RoleInProject, GETDATE());
END

GO
/****** Object:  StoredProcedure [dbo].[AuthenticateUser]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[AuthenticateUser]
    @Username NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        u.UserID,
        u.Username,
        u.PasswordHash,
        u.RoleID,
        r.RoleTitle AS RoleName, -- FIX: Select RoleTitle and alias it as RoleName
        u.IsActive
    FROM
        Users u
    JOIN
        Roles r ON u.RoleID = r.RoleID
    WHERE
        u.Username = @Username
        AND u.IsActive = 1;
END;
GO
/****** Object:  StoredProcedure [dbo].[CalculateGratuity]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[CalculateGratuity]
    @EmployeeID INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @JoinDate DATE, @TerminationDate DATE, @LastBasicSalary MONEY;
    DECLARE @YearsOfService DECIMAL(10, 2);
    DECLARE @GratuityAmount MONEY = 0;
    DECLARE @DailyWage MONEY;
    DECLARE @GratuityDays DECIMAL(10, 2) = 0;

    -- Step 1: Get the employee's details
    -- Get Join and Termination dates from the Employees table
    SELECT
        @JoinDate = JoinDate,
        @TerminationDate = TerminationDate
    FROM Employees
    WHERE EmployeeID = @EmployeeID AND IsActive = 0;

    -- Get the last basic salary from the SalaryHistory table
    SELECT TOP 1 @LastBasicSalary = BasicSalary
    FROM SalaryHistory
    WHERE EmployeeID = @EmployeeID AND EffectiveDate <= @TerminationDate
    ORDER BY EffectiveDate DESC;

    -- Validate that we have all the necessary information
    IF @JoinDate IS NULL OR @TerminationDate IS NULL OR @LastBasicSalary IS NULL
    BEGIN
        RAISERROR('Cannot calculate gratuity. Employee not found, not terminated, or has no salary history.', 16, 1);
        RETURN;
    END

    -- Step 2: Calculate Years of Service
    SET @YearsOfService = DATEDIFF(DAY, @JoinDate, @TerminationDate) / 365.25;

    -- If service is less than 1 year, no gratuity is paid
    IF @YearsOfService < 1
    BEGIN
        SET @GratuityAmount = 0;
    END
    ELSE
    BEGIN
        -- Step 3: Calculate the daily wage based on the last basic salary
        SET @DailyWage = @LastBasicSalary / 30.0; -- Standard practice uses 30 days per month

        -- Step 4: Apply the tiered calculation logic
        IF @YearsOfService <= 5
        BEGIN
            -- 21 days for each year of service
            SET @GratuityDays = 21 * @YearsOfService;
        END
        ELSE
        BEGIN
            -- 21 days for the first 5 years, plus 30 days for each additional year
            SET @GratuityDays = (21 * 5) + (30 * (@YearsOfService - 5));
        END

        SET @GratuityAmount = @DailyWage * @GratuityDays;
    END

    -- Step 5: Apply the cap (Total gratuity cannot exceed two years' total salary)
    DECLARE @TwoYearTotalSalary MONEY;
    SELECT @TwoYearTotalSalary = TotalSalary * 24 FROM vw_CurrentEmployeeSalaries WHERE EmployeeID = @EmployeeID; -- Using the total salary for the cap

    IF @GratuityAmount > @TwoYearTotalSalary
    BEGIN
        SET @GratuityAmount = @TwoYearTotalSalary;
    END

    -- Step 6: Return the results
    SELECT
        @EmployeeID AS EmployeeID,
        (SELECT Name FROM Employees WHERE EmployeeID = @EmployeeID) AS EmployeeName,
        @JoinDate AS JoinDate,
        @TerminationDate AS TerminationDate,
        @YearsOfService AS YearsOfService,
        @LastBasicSalary AS LastBasicSalary,
        @GratuityDays AS TotalGratuityDays,
        @GratuityAmount AS FinalGratuityAmount;
END

GO
/****** Object:  StoredProcedure [dbo].[ChangeEmployeeRole]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ChangeEmployeeRole]
    @EmployeeID INT,
    @NewRoleID INT,
    @EffectiveDate DATE
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    UPDATE EmployeeRoleHistory
    SET EndDate = DATEADD(day, -1, @EffectiveDate)
    WHERE EmployeeID = @EmployeeID AND EndDate IS NULL;

    INSERT INTO EmployeeRoleHistory (EmployeeID, RoleID, StartDate, EndDate)
    VALUES (@EmployeeID, @NewRoleID, @EffectiveDate, NULL);

    COMMIT TRANSACTION;
END

GO
/****** Object:  StoredProcedure [dbo].[CompleteOnboardingStep]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[CompleteOnboardingStep]
    @EmployeeID INT,
    @StepName VARCHAR(255),
    @Notes NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE EmployeeOnboardingSteps
    SET
        IsCompleted = 1,
        CompletionDate = GETDATE(),
        Notes = @Notes
    WHERE
        EmployeeID = @EmployeeID AND StepName = @StepName;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('Task could not be marked as complete. Ensure the task name is correct and assigned to this employee.', 16, 1);
    END
END

GO
/****** Object:  StoredProcedure [dbo].[CreateProject]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[CreateProject]
    @ProjectName VARCHAR(150),
    @ClientID INT = NULL,
    @StartDate DATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Projects (ProjectName, ClientID, StartDate)
    VALUES (@ProjectName, @ClientID, @StartDate);
END

GO
/****** Object:  StoredProcedure [dbo].[DeletePayroll]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeletePayroll]
    @PayrollID INT
AS
BEGIN
    DELETE FROM Payroll
    WHERE PayrollID = @PayrollID;
END;
GO
/****** Object:  StoredProcedure [dbo].[ExecuteOffboarding]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[ExecuteOffboarding]
	@EmployeeID INT,
	@TerminationDate DATE
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM EMPLOYEES WHERE EmployeeID=@EmployeeID AND IsActive=1)
	BEGIN
		RAISERROR('No active employees with that EmployeeID',16,1)
		RETURN;
	END

	BEGIN TRANSACTION;
	BEGIN TRY
		
		PRINT'STEP 1: Deactivating employee and closing history records';
		EXEC RemoveEmployee
			@EmployeeID=@EmployeeID,
			@EffectiveTerminationDate = @TerminationDate;
		PRINT'Employee Deactivated successfully'

		PRINT'STEP 2: Processing asset returns';
		DECLARE @AssetID INT
        DECLARE asset_cursor CURSOR FOR
            SELECT AssetID FROM vw_EmployeeAssets WHERE EmployeeID = @EmployeeID;

        OPEN asset_cursor;
        FETCH NEXT FROM asset_cursor INTO @AssetID;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            PRINT '...Returning AssetID: ' + CAST(@AssetID AS VARCHAR);
            EXEC ReturnAsset
                @AssetID = @AssetID,
                @ReturnDate = @TerminationDate;

            FETCH NEXT FROM asset_cursor INTO @AssetID;
        END
		CLOSE asset_cursor;
        DEALLOCATE asset_cursor;
		PRINT '...All assigned assets have been returned.';

        COMMIT TRANSACTION;
        PRINT 'Offboarding process committed successfully.';


        PRINT 'Step 4: Calculating final gratuity payment...';
        EXEC CalculateGratuity @EmployeeID = @EmployeeID;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        PRINT 'An error occurred during offboarding. Transaction has been rolled back.';

        THROW;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserProfile]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[GetUserProfile]
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        u.UserID,
        u.Username,
        u.RoleID,
        r.RoleTitle,
        u.CreatedAt,
        u.IsActive
    FROM
        Users u
    JOIN
        Roles r ON u.RoleID = r.RoleID
    WHERE
        u.UserID = @UserID;
END;
GO
/****** Object:  StoredProcedure [dbo].[InitiateOnboardingProcess]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- This procedure assigns the standard set of onboarding tasks to a new employee.
-- It should be called right after a new employee is added to the system.
CREATE   PROCEDURE [dbo].[InitiateOnboardingProcess]
    @EmployeeID INT
AS
BEGIN

    INSERT INTO EmployeeOnboardingSteps (EmployeeID, StepName, ResponsibleDept)
    VALUES
    (@EmployeeID, 'Sign Employment Contract', 'HR'),
    (@EmployeeID, 'Submit Passport and Visa Copies', 'HR'),
    (@EmployeeID, 'Create Email and System Accounts', 'IT'),
    (@EmployeeID, 'Assign Laptop and Phone', 'IT'),
    (@EmployeeID, 'Conduct Team Introduction', 'Manager'),
    (@EmployeeID, 'Complete Compliance Training', 'HR');

    PRINT 'Standard onboarding checklist has been assigned to EmployeeID ' + CAST(@EmployeeID AS VARCHAR);
END

GO
/****** Object:  StoredProcedure [dbo].[InsertAppraisal]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertAppraisal]
    @EmployeeID INT,
    @ReviewerID INT,
    @ReviewCycle VARCHAR(20),
    @ReviewDate DATE,
    @Score DECIMAL(3,2),
    @Feedback VARCHAR(MAX),
    @PromotionRecommended BIT
AS
BEGIN
    -- Insert the new appraisal record
    INSERT INTO Appraisals (EmployeeID, ReviewerID, ReviewCycle, ReviewDate, Score, Feedback, PromotionRecommended)
    VALUES (@EmployeeID, @ReviewerID, @ReviewCycle, @ReviewDate, @Score, @Feedback, @PromotionRecommended);

    -- Get the AppraisalID of the newly inserted record
    DECLARE @AppraisalID INT = SCOPE_IDENTITY();

END;
GO
/****** Object:  StoredProcedure [dbo].[InsertPayroll]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertPayroll] 
@EmployeeID INT, @PayPeriodStart DATE, @PayPeriodEnd DATE, @BasicSalary MONEY, @HousingAllowance MONEY, @TransportAllowance MONEY, @OtherAllowances MONEY, @Deductions MONEY = 0 
AS 
BEGIN 
INSERT INTO Payroll ( EmployeeID, PayPeriodStart, PayPeriodEnd, BasicSalary, HousingAllowance, TransportAllowance, OtherAllowances, Deductions ) VALUES ( @EmployeeID, @PayPeriodStart, @PayPeriodEnd, @BasicSalary, @HousingAllowance, @TransportAllowance, @OtherAllowances, @Deductions ); 
SELECT SCOPE_IDENTITY() AS PayrollID; 
END;
GO
/****** Object:  StoredProcedure [dbo].[LogAttendance]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[LogAttendance]
    @EmployeeID INT,
    @ActionType VARCHAR(10) 
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CurrentDate DATE = CAST(GETDATE() AS DATE);

    IF @ActionType = 'CheckIn'
    BEGIN

        IF EXISTS (SELECT 1 FROM Attendance WHERE EmployeeID = @EmployeeID AND Date = @CurrentDate)
        BEGIN

            RAISERROR('This employee has already checked in today.', 16, 1);
            RETURN;
        END

        INSERT INTO Attendance (EmployeeID, Date, CheckInTime, CheckOutTime)
        VALUES (@EmployeeID, @CurrentDate, GETDATE(), NULL);

        PRINT 'Employee ' + CAST(@EmployeeID AS VARCHAR) + ' checked in successfully at ' + CONVERT(VARCHAR, GETDATE(), 120);
    END

    ELSE IF @ActionType = 'CheckOut'
    BEGIN
        DECLARE @AttendanceID INT;
        SELECT @AttendanceID = EntryID
        FROM Attendance
        WHERE EmployeeID = @EmployeeID
          AND Date = @CurrentDate
          AND CheckOutTime IS NULL;
        IF @AttendanceID IS NOT NULL
        BEGIN
            UPDATE Attendance
            SET CheckOutTime = GETDATE()
            WHERE EntryID = @AttendanceID;

            PRINT 'Employee ' + CAST(@EmployeeID AS VARCHAR) + ' checked out successfully at ' + CONVERT(VARCHAR, GETDATE(), 120);
        END
        ELSE
        BEGIN
            RAISERROR('Cannot check out. No active check-in record found for today.', 16, 1);
            RETURN;
        END
    END
    ELSE
    BEGIN
        RAISERROR('Invalid ActionType. Please use ''CheckIn'' or ''CheckOut''.', 16, 1);
        RETURN;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[LogAuditAction]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LogAuditAction]
    @ActionType VARCHAR(50),
    @TableName VARCHAR(50),
    @RecordID INT,
    @OldValue TEXT = NULL,
    @NewValue TEXT = NULL,
    @ActionPerformedBy INT,
    @Description TEXT = NULL
AS
BEGIN
    INSERT INTO AuditLogs (ActionType, TableName, RecordID, OldValue, NewValue, ActionPerformedBy, Description)
    VALUES (@ActionType, @TableName, @RecordID, @OldValue, @NewValue, @ActionPerformedBy, @Description);
END;
GO
/****** Object:  StoredProcedure [dbo].[LogTimeToProject]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[LogTimeToProject]
    @EmployeeID INT,
    @ProjectID INT,
    @EntryDate DATE,
    @HoursWorked DECIMAL(4,2),
    @Description NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ProjectAssignmentID INT;

    SELECT @ProjectAssignmentID = ProjectAssignmentID
    FROM ProjectAssignments
    WHERE EmployeeID = @EmployeeID AND ProjectID = @ProjectID AND UnassignedDate IS NULL;

    IF @ProjectAssignmentID IS NULL
    BEGIN
        RAISERROR('Employee is not actively assigned to this project.', 16, 1);
        RETURN;
    END

    INSERT INTO TimeEntries (ProjectAssignmentID, EntryDate, HoursWorked, Description)
    VALUES (@ProjectAssignmentID, @EntryDate, @HoursWorked, @Description);
END

GO
/****** Object:  StoredProcedure [dbo].[RegisterUser]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[RegisterUser]
    @Username NVARCHAR(50),
    @PasswordHash NVARCHAR(255),
    @RoleID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if username already exists
    IF EXISTS (SELECT 1 FROM Users WHERE Username = @Username)
    BEGIN
        RAISERROR('Username already exists.', 16, 1);
        RETURN -1; -- Custom return code for existing username
    END

    -- Check if RoleID is valid
    IF NOT EXISTS (SELECT 1 FROM Roles WHERE RoleID = @RoleID)
    BEGIN
        RAISERROR('Invalid RoleID supplied.', 16, 1);
        RETURN -2; -- Custom return code for invalid role
    END

    INSERT INTO Users (Username, PasswordHash, RoleID)
    VALUES (@Username, @PasswordHash, @RoleID);

    SELECT SCOPE_IDENTITY() AS UserID; -- Return the new UserID
END;
GO
/****** Object:  StoredProcedure [dbo].[RemoveEmployee]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[RemoveEmployee]
    @EmployeeID INT,
    @EffectiveTerminationDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Employees WHERE EmployeeID = @EmployeeID AND IsActive = 1)
    BEGIN
        RAISERROR('Employee does not exist or is already inactive.', 16, 1);
        RETURN;
    END

    BEGIN TRANSACTION;

    UPDATE Employees
    SET
        IsActive = 0,
        TerminationDate = @EffectiveTerminationDate
    WHERE
        EmployeeID = @EmployeeID;

    UPDATE EmployeeRoleHistory
    SET EndDate = @EffectiveTerminationDate
    WHERE
        EmployeeID = @EmployeeID
        AND EndDate IS NULL;

    UPDATE EmployeeDepartmentHistory
    SET EndDate = @EffectiveTerminationDate
    WHERE
        EmployeeID = @EmployeeID
        AND EndDate IS NULL;

    COMMIT TRANSACTION;

    PRINT 'Employee offboarding process completed successfully.';
END

GO
/****** Object:  StoredProcedure [dbo].[ReturnAsset]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[ReturnAsset]
    @AssetID INT,
    @ReturnDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @AssignmentID INT;
    SELECT @AssignmentID = AssignmentID
    FROM AssetAssignments
    WHERE AssetID = @AssetID AND ReturnedDate IS NULL;

    IF @AssignmentID IS NULL
    BEGIN
        RAISERROR('No active assignment found for this asset. It may have already been returned or was never assigned.', 16, 1);
        RETURN;
    END

    BEGIN TRANSACTION;

    UPDATE Assets
    SET Status = 'Available'
    WHERE AssetID = @AssetID;

    UPDATE AssetAssignments
    SET ReturnedDate = @ReturnDate
    WHERE AssignmentID = @AssignmentID;

    COMMIT TRANSACTION;

    PRINT 'AssetID ' + CAST(@AssetID AS VARCHAR) + ' has been successfully returned and marked as available.';
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateAppraisal]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateAppraisal]
    @AppraisalID INT,
    @Score DECIMAL(3,2),
    @Feedback TEXT,
    @PromotionRecommended BIT
AS
BEGIN
    UPDATE Appraisals
    SET 
        Score = @Score,
        Feedback = @Feedback,
        PromotionRecommended = @PromotionRecommended
    WHERE AppraisalID = @AppraisalID;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateEmployeeDetails]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[UpdateEmployeeDetails]
    @EmployeeID INT,
    @Name NVARCHAR(50),
    @DOB DATE,
    @DeptID INT,
    @RoleID INT,
    @JoinDate DATE,
    @IsActive BIT -- Allow updating active status here
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Update basic employee details
        UPDATE Employees
        SET
            Name = @Name,
            DOB = @DOB,
            JoinDate = @JoinDate,
            IsActive = @IsActive -- Update active status
        WHERE EmployeeID = @EmployeeID;

        -- Update EmployeeRoleHistory if RoleID changed or needs to be set
        -- Close old role if different and new role is provided
        IF EXISTS (SELECT 1 FROM EmployeeRoleHistory WHERE EmployeeID = @EmployeeID AND EndDate IS NULL AND RoleID <> @RoleID)
        BEGIN
            UPDATE EmployeeRoleHistory
            SET EndDate = DATEADD(day, -1, GETDATE()) -- End yesterday
            WHERE EmployeeID = @EmployeeID AND EndDate IS NULL;

            INSERT INTO EmployeeRoleHistory (EmployeeID, RoleID, StartDate, EndDate)
            VALUES (@EmployeeID, @RoleID, GETDATE(), NULL); -- New role starts today
        END
        -- Or if there's no current role history, insert one
        ELSE IF NOT EXISTS (SELECT 1 FROM EmployeeRoleHistory WHERE EmployeeID = @EmployeeID AND EndDate IS NULL)
        BEGIN
            INSERT INTO EmployeeRoleHistory (EmployeeID, RoleID, StartDate, EndDate)
            VALUES (@EmployeeID, @RoleID, GETDATE(), NULL);
        END


        -- Update EmployeeDepartmentHistory if DeptID changed or needs to be set
        -- Close old department if different and new department is provided
        IF EXISTS (SELECT 1 FROM EmployeeDepartmentHistory WHERE EmployeeID = @EmployeeID AND EndDate IS NULL AND DeptID <> @DeptID)
        BEGIN
            UPDATE EmployeeDepartmentHistory
            SET EndDate = DATEADD(day, -1, GETDATE()) -- End yesterday
            WHERE EmployeeID = @EmployeeID AND EndDate IS NULL;

            INSERT INTO EmployeeDepartmentHistory (EmployeeID, DeptID, StartDate, EndDate)
            VALUES (@EmployeeID, @DeptID, GETDATE(), NULL); -- New department starts today
        END
        -- Or if there's no current department history, insert one
        ELSE IF NOT EXISTS (SELECT 1 FROM EmployeeDepartmentHistory WHERE EmployeeID = @EmployeeID AND EndDate IS NULL)
        BEGIN
            INSERT INTO EmployeeDepartmentHistory (EmployeeID, DeptID, StartDate, EndDate)
            VALUES (@EmployeeID, @DeptID, GETDATE(), NULL);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrMsg, 16, 1);
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdatePayroll]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdatePayroll]
    @PayrollID INT,
    @BasicSalary MONEY,
    @Allowances MONEY,
    @Deductions MONEY
AS
BEGIN
    UPDATE Payroll
    SET BasicSalary = @BasicSalary,
        Allowances = @Allowances,
        Deductions = @Deductions
    WHERE PayrollID = @PayrollID;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateSalary]    Script Date: 7/8/2025 4:31:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Updated procedure to handle salary changes with components
CREATE   PROCEDURE [dbo].[UpdateSalary]
    @EmployeeID INT,
    @EffectiveDate DATE,
    @BasicSalary MONEY,
    @HousingAllowance MONEY,
    @TransportAllowance MONEY,
    @OtherAllowances MONEY,
    @NewGradeID INT,
    @Reason VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO SalaryHistory (
        EmployeeID, EffectiveDate, BasicSalary, HousingAllowance,
        TransportAllowance, OtherAllowances, GradeID, ReasonForChange
    )
    VALUES (
        @EmployeeID, @EffectiveDate, @BasicSalary, @HousingAllowance,
        @TransportAllowance, @OtherAllowances, @NewGradeID, @Reason
    );
END

GO
USE [master]
GO
ALTER DATABASE [HRMS_db] SET  READ_WRITE 
GO
