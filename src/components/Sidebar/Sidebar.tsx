"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import {
  Dashboard,
  Info,
  ShoppingCart,
  ContactPage,
  NoteAlt,
  Reviews,
  PhotoLibrary,
  ExpandMore,
  ChevronRight
} from '@mui/icons-material';

// Define Navigation Item Type
interface NavigationItem {
  title: string;
  icon?: React.ReactNode;
  path?: string;
  children?: NavigationItem[];
}

// Navigation Items Configuration
const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    icon: <Dashboard />,
    path: '/super_admin/dashboard'
  },
  {
    title: 'About',
    icon: <Info />,
    children: [
      { title: 'Add About', path: '/super_admin/about/add' },
      { title: 'List About', path: '/super_admin/about/list' }
    ]
  },
  {
    title: 'Shop',
    icon: <ShoppingCart />,
    children: [
      { title: 'Add Shop', path: '/super_admin/shop/add' },
      { title: 'List Shop', path: '/super_admin/shop/list' }
    ]
  },
  {
    title: 'Contact',
    icon: <ContactPage />,
    children: [
      { title: 'Add Contact', path: '/super_admin/contact/add' },
      { title: 'List Contact', path: '/super_admin/contact/list' }
    ]
  },
  {
    title: 'Blog',
    icon: <NoteAlt />,
    children: [
      { title: 'Add Blog', path: '/super_admin/blog/add' },
      { title: 'List Blog', path: '/super_admin/blog/list' }
    ]
  },
  {
    title: 'Review',
    icon: <Reviews />,
    children: [
      { title: 'Add Review', path: '/super_admin/review/add' },
      { title: 'List Review', path: '/super_admin/review/list' }
    ]
  },
  {
    title: 'Stock Image',
    icon: <PhotoLibrary />,
    children: [
      { title: 'All Images', path: '/super_admin/stock/images' },
      { title: 'Folders', path: '/super_admin/stock/folders' }
    ]
  }
];

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleNestedList = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderNavigationItems = (items: NavigationItem[], nested = false) => {
    return items.map((item) => (
      <React.Fragment key={item.title}>
        {item.path ? (
          <Link href={item.path} passHref>
            <ListItem
              component="div"
              onClick={() => item.children && toggleNestedList(item.title)}
              sx={{
                pl: nested ? 4 : 2,
                justifyContent: !open && !nested ? 'center' : 'flex-start',
                cursor: 'pointer'
              }}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    mr: open ? 2 : 0,
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}
              {open && <ListItemText primary={item.title} />}
              {item.children && open && (
                openItems[item.title] ? <ExpandMore /> : <ChevronRight />
              )}
            </ListItem>
          </Link>
        ) : (
          <ListItem
            component="div"
            onClick={() => toggleNestedList(item.title)}
            sx={{
              pl: nested ? 4 : 2,
              justifyContent: !open && !nested ? 'center' : 'flex-start',
              cursor: 'pointer'
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  mr: open ? 2 : 0,
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            {open && <ListItemText primary={item.title} />}
            {item.children && open && (
              openItems[item.title] ? <ExpandMore /> : <ChevronRight />
            )}
          </ListItem>
        )}

        {item.children && (
          <Collapse
            in={open && openItems[item.title]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <Link key={child.title} href={child.path || ''} passHref>
                  <ListItem
                    component="div"
                    sx={{
                      pl: 4,
                      justifyContent: !open ? 'center' : 'flex-start',
                      cursor: 'pointer'
                    }}
                  >
                    {open && <ListItemText primary={child.title} />}
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 200 : 72,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? 200 : 72,
          boxSizing: 'border-box',
          overflowX: 'hidden'
        },
      }}
    >
      <List>
        {renderNavigationItems(navigationItems)}
      </List>
    </Drawer>
  );
};

export default Sidebar;