import { 
  Typography, 
  Stack, 
  Card, 
  CardContent, 
  Box,
  Divider,
  LinearProgress
} from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import usersSeed from '../../assets/users.json';

const activityData = [
  { id: 1, user: 'Alicia Reyes', action: 'Published a sauropod article update', timestamp: '2 hours ago' },
  { id: 2, user: 'Marco Santos', action: 'Reviewed visitor activity from Manila', timestamp: '4 hours ago' },
  { id: 3, user: 'Bianca Cruz', action: 'Updated the fossil discovery report', timestamp: '6 hours ago' },
  { id: 4, user: 'Nathan Diaz', action: 'Checked the DinoWorld dashboard', timestamp: '1 day ago' },
];

const users = usersSeed.map((user, index) => ({
  id: index + 1,
  name: `${user.firstName} ${user.lastName}`,
  location: user.address,
  status: user.isActive ? 'Active' : 'Inactive',
}));

const cardSx = {
  height: '100%',
  border: '1px solid rgba(30, 93, 59, 0.10)',
  borderRadius: 2,
  backgroundColor: '#fffdf6',
  boxShadow: '0 16px 38px rgba(30, 93, 59, 0.08)',
};

const sectionGridSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'minmax(0, 1fr)',
    md: 'repeat(2, minmax(0, 1fr))',
  },
  gap: 2.5,
  alignItems: 'stretch',
  width: '100%',
};

// KPI Card Component
const KPICard = ({ title, value, icon: Icon, trend, trendValue, color = '#2196F3' }) => (
  <Card sx={cardSx}>
    <CardContent>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="flex-start" spacing={1.5}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" sx={{ color: '#5f6f5d', fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ mt: 1, color: '#1f2937', fontWeight: 700 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: 'auto',
              flexShrink: 0,
              p: 1,
              borderRadius: 2,
              backgroundColor: `${color}20`,
            }}
          >
            {Icon && <Icon sx={{ color, fontSize: 20 }} />}
          </Box>
        </Stack>
        {trend && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            {trend === 'up' ? (
              <TrendingUpIcon sx={{ fontSize: 16, color: '#1E5D3B' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 16, color: '#821400' }} />
            )}
            <Typography
              variant="caption"
              sx={{ color: trend === 'up' ? '#1E5D3B' : '#821400', fontWeight: 700 }}
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
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const userEngagement = Math.round((activeUsers / totalUsers) * 100);

  return (
    <Stack spacing={3} sx={{ width: '100%', minWidth: 0 }}>
      {/* Header */}
      <Box>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 700, mb: 0.5 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" sx={{ color: '#5f6f5d' }}>
          Monitor DinoWorld articles, Philippine users, and learning activity in one workspace.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            xl: 'repeat(4, minmax(0, 1fr))',
          },
          gap: 2.5,
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <KPICard
            title="Total Users"
            value={totalUsers}
            icon={PeopleAltIcon}
            color="#1E5D3B"
            trend="up"
            trendValue="+2 new Metro Manila accounts"
          />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <KPICard
            title="Active Users"
            value={activeUsers}
            icon={PeopleAltIcon}
            color="#257572"
            trend="up"
            trendValue="Currently managing DinoWorld"
          />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <KPICard
            title="Learning Engagement"
            value={`${userEngagement}%`}
            icon={AssignmentIcon}
            color="#CF842C"
            trend="up"
            trendValue="+12% article reads this week"
          />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <KPICard
            title="Dino Reports"
            value="24"
            icon={AssignmentIcon}
            color="#821400"
            trend="down"
            trendValue="4 reports updated today"
          />
        </Box>
      </Box>

      {/* Charts Section */}
      <Box sx={sectionGridSx}>
        {/* User Growth Chart */}
        <Box sx={{ minWidth: 0 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#1f2937', fontWeight: 700 }}>
                DinoWorld User Growth
              </Typography>
              <LineChart
                series={[
                  { data: [4, 5, 6, 7, 8, 9, 10], label: 'Registered PH users', color: '#1E5D3B' },
                ]}
                height={300}
                xAxis={[
                  {
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    scaleType: 'point',
                  },
                ]}
                margin={{ top: 10, bottom: 20, left: 60, right: 10 }}
                grid={{ horizontal: true, vertical: true }}
              />
            </CardContent>
          </Card>
        </Box>

        {/* Activity Distribution Chart */}
        <Box sx={{ minWidth: 0 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#1f2937', fontWeight: 700 }}>
                Visitor Activity Mix
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 0, overflow: 'hidden' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 40, label: 'Article Reads', color: '#1E5D3B' },
                        { id: 1, value: 30, label: 'Dino Profiles', color: '#257572' },
                        { id: 2, value: 20, label: 'Report Views', color: '#CF842C' },
                        { id: 3, value: 10, label: 'New Visitors', color: '#BBAE3A' },
                      ],
                    },
                  ]}
                  width={320}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Activity Feed and User List */}
      <Box sx={sectionGridSx}>
        {/* Recent Activity */}
        <Box sx={{ minWidth: 0 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#1f2937', fontWeight: 700 }}>
                Recent DinoWorld Activity
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {activityData.map((activity) => (
                  <Box key={activity.id}>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 700 }}>
                          {activity.user}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#5f6f5d' }}>
                          {activity.action}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ ml: 'auto', flexShrink: 0, color: '#5f6f5d', fontWeight: 700 }}
                      >
                        {activity.timestamp}
                      </Typography>
                    </Stack>
                    {activity !== activityData[activityData.length - 1] && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Users Overview */}
        <Box sx={{ minWidth: 0 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#1f2937', fontWeight: 700 }}>
                Philippine Users Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {users.map((user) => (
                  <Box key={user.id}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 700 }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#5f6f5d' }}>
                          {user.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          ml: 'auto',
                          flexShrink: 0,
                          width: 96,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 999,
                          textAlign: 'center',
                          backgroundColor:
                            user.status === 'Active'
                              ? 'rgba(30, 93, 59, 0.12)'
                              : 'rgba(130, 20, 0, 0.10)',
                          color: user.status === 'Active' ? '#1E5D3B' : '#821400',
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
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
        </Box>
      </Box>

      {/* Performance Metrics */}
      <Box sx={{ width: '100%', minWidth: 0 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, color: '#1f2937', fontWeight: 700 }}>
                DinoWorld System Health
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 700 }}>Article Library Uptime</Typography>
                    <Typography variant="body2" sx={{ color: '#1E5D3B', fontWeight: 700 }}>
                      99.8%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={99.8}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(30, 93, 59, 0.12)',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#1E5D3B' },
                    }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 700 }}>User Records Health</Typography>
                    <Typography variant="body2" sx={{ color: '#257572', fontWeight: 700 }}>
                      95%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={95}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(30, 93, 59, 0.12)',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#257572' },
                    }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 700 }}>Report Loading Speed</Typography>
                    <Typography variant="body2" sx={{ color: '#CF842C', fontWeight: 700 }}>
                      92%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={92}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(30, 93, 59, 0.12)',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#CF842C' },
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
      </Box>
    </Stack>
  );
}

export default DashboardPage;
