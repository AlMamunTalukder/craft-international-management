import { ReactNode } from "react";

export type UserRole = "admin" | "teacher" | "student" | "super_admin";

export const userRoles: UserRole[] = ["admin", "teacher", "student", "super_admin"];
export interface NavigationItem {
    title: string
    path?: string
    icon: ReactNode
    roles?: UserRole[] 
    children?: NavigationItem[]
    segment?: string
  }
  