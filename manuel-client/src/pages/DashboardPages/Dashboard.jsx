import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Typography, 
  Stack, 
  Card, 
  CardContent, 
  Box,
  Grid,
  Divider,
  LinearProgress
} from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';

const activityData = [
  { id: 1, user: 'Jon Snow', action: 'Logged in', timestamp: '2 hours ago', status: 'success' },
  { id: 2, user: 'Cersei Lannister', action: 'Updated profile', timestamp: '4 hours ago', status: 'success' },
  { id: 3, user: 'Daenerys Targaryen', action: 'Created report', timestamp: '6 hours ago', status: 'success' },
  { id: 4, user: 'Arya Stark', action: 'Accessed dashboard', timestamp: '1 day ago', status: 'success' },
];

const users = [
  { id: 1, name: 'Jon Snow', status: 'Active' },
  { id: 2, name: 'Cersei Lannister', status: 'Active' },
  { id: 3, name: 'Daenerys Targaryen', status: 'Inactive' },
  { id: 4, name: 'Arya Stark', status: 'Active' },
];

// KPI Card Component
const KPICard = ({ title, value, icon: Icon, trend, trendValue, color = '#2196F3' }) => (
  <Card sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <CardContent>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography color="textSecondary" variant="body2" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Box
            sx={{
              p: 1,
              borderRadius: '50%',
              backgroundColor: `${color}20`,
            }}
          >
            {Icon && <Icon sx={{ color, fontSize: 20 }} />}
          </Box>
        </Stack>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
        {trend && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            {trend === 'up' ? (
              <TrendingUpIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 16, color: '#f44336' }} />
            )}
            <Typography
              variant="caption"
              sx={{ color: trend === 'up' ? '#4CAF50' : '#f44336', fontWeight: 500 }}
            >
              {trendValue}
            </Typography>
          </Stack>
        )}
      </Stack>
    </CardContent>
  </Card>
);

function DashboardPage() {
  const location = useLocation();
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const userEngagement = Math.round((activeUsers / totalUsers) * 100);

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
          Dashboard Overview
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Welcome back! Here's your performance summary.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Total Users"
            value={totalUsers}
            icon={PeopleAltIcon}
            color="#2196F3"
            trend="up"
            trendValue="+8.5% this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Active Users"
            value={activeUsers}
            icon={PeopleAltIcon}
            color="#4CAF50"
            trend="up"
            trendValue="+5.2% this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="User Engagement"
            value={`${userEngagement}%`}
            icon={AssignmentIcon}
            color="#FF9800"
            trend="up"
            trendValue="+12% from last week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Total Reports"
            value="24"
            icon={AssignmentIcon}
            color="#9C27B0"
            trend="down"
            trendValue="-3% from last week"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* User Growth Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                User Growth Trend
              </Typography>
              <LineChart
                series={[
                  { data: [4, 5, 6, 7, 8, 9, 10], label: 'New Users' },
                ]}
                height={300}
                xAxis={[
                  {
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    scaleType: 'point',
                  },
                ]}
                margin={{ top: 10, bottom: 20, left: 60, right: 10 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Activity Distribution
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 40, label: 'Active Sessions' },
                      { id: 1, value: 30, label: 'Idle Users' },
                      { id: 2, value: 20, label: 'Offline' },
                      { id: 3, value: 10, label: 'New Visitors' },
                    ],
                  },
                ]}
                width={400}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Activity Feed and User List */}
      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {activityData.map((activity) => (
                  <Box key={activity.id}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {activity.user}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {activity.action}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="textSecondary">
                        {activity.timestamp}
                      </Typography>
                    </Stack>
                    {activity !== activityData[activityData.length - 1] && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Users Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Users Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {users.map((user) => (
                  <Box key={user.id}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2">{user.name}</Typography>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '12px',
                          backgroundColor:
                            user.status === 'Active'
                              ? 'rgba(76, 175, 80, 0.1)'
                              : 'rgba(158, 158, 158, 0.1)',
                          color: user.status === 'Active' ? '#4CAF50' : '#9E9E9E',
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {user.status}
                        </Typography>
                      </Box>
                    </Stack>
                    {user !== users[users.length - 1] && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Metrics */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                System Performance
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Server Uptime</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      99.8%
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={99.8} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Database Performance</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      95%
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={95} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">API Response Time</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      92%
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={92} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;