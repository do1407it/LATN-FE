import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile.jpg';

const navItems = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    text: 'Client',
    icon: null,
  },
  {
    text: 'Products',
    icon: <ShoppingCartOutlined />,
  },
  {
    text: 'Customers',
    icon: <Groups2Outlined />,
  },
  {
    text: 'Transactions',
    icon: <ReceiptLongOutlined />,
  },
  {
    text: 'Geography',
    icon: <PublicOutlined />,
  },
  {
    text: 'Sales',
    icon: null,
  },
  {
    text: 'Overview',
    icon: <PointOfSaleOutlined />,
  },
  {
    text: 'Daily',
    icon: <TodayOutlined />,
  },
  {
    text: 'Monthly',
    icon: <CalendarMonthOutlined />,
  },
  {
    text: 'Breakdown',
    icon: <PieChartOutlined />,
  },
  {
    text: 'Management',
    icon: null,
  },
  {
    text: 'Admin',
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: 'Performance',
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  const [activePath, setActivePath] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  
  useEffect(() => {
    setActivePath(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component='nav'>
      {isSidebarOpen && (
        <Drawer
          sx={{
            width: drawerWidth,
            position: 'relative',
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth,
            },
          }}
          variant={isNonMobile ? 'persistent' : 'temporary'}
          anchor='left'
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        >
          <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 3rem'>
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display='flex' alignItems='center' gap='0.5rem'>
                  <Typography variant='h4' fontWeight='bold'>
                    ADMIN
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                const lowCaseText = text.toLowerCase();
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  );
                } else {
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lowCaseText}`);
                          setActivePath(lowCaseText);
                        }}
                        sx={{
                          backgroundColor:
                            activePath === lowCaseText
                              ? theme.palette.secondary[300]
                              : 'transparent',
                          color:
                            activePath === lowCaseText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: '2rem',
                            color:
                              activePath === lowCaseText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {activePath === lowCaseText && <ChevronRightOutlined sx={{ ml: 'auto' }} />}
                      </ListItemButton>
                    </ListItem>
                  );
                }
              })}
            </List>
          </Box>

          <Box position='absolute' bottom='2rem'>
            <Divider />
            <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0 3rem'>
              <Box
                component='img'
                alt='profile'
                src={profileImage}
                height='40px'
                width='40px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              {user && (
                <Box textAlign='left'>
                  <Typography
                    fontWeight='bold'
                    fontSize='0.9rem'
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography fontSize='0.8rem' sx={{ color: theme.palette.secondary[200] }}>
                    {user?.occupation}
                  </Typography>
                </Box>
              )}
              <IconButton>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: '25px ',
                  }}
                />
              </IconButton>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
