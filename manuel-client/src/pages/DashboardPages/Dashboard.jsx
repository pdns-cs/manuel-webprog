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
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
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

const totalUsersDisplay = '1,432';

const cityCoordinates = {
  Manila: { x: 29, y: 42 },
  Sampaloc: { x: 32, y: 31 },
  Tondo: { x: 25, y: 33 },
  'Quezon City': { x: 43, y: 18 },
  Pasig: { x: 57, y: 43 },
  Makati: { x: 47, y: 55 },
  Taguig: { x: 58, y: 68 },
};

const getCityFromAddress = (address) => {
  const knownCity = Object.keys(cityCoordinates).find((city) => address.includes(city));

  return knownCity || address.split(',')[0];
};

const locationMarkers = users.reduce((markers, user) => {
  const city = getCityFromAddress(user.location);
  const coordinates = cityCoordinates[city] || cityCoordinates.Manila;
  const existingMarker = markers.find((marker) => marker.city === city);

  if (existingMarker) {
    existingMarker.users += 1;
    existingMarker.activeUsers += user.status === 'Active' ? 1 : 0;
    return markers;
  }

  return [
    ...markers,
    {
      city,
      users: 1,
      activeUsers: user.status === 'Active' ? 1 : 0,
      ...coordinates,
    },
  ];
}, []);

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

function LocationMapCard() {
  const totalMappedUsers = locationMarkers.reduce((total, marker) => total + marker.users, 0);
  const displayedMappedUsers = totalUsersDisplay;

  return (
    <Card sx={cardSx}>
      <CardContent>
        <Stack spacing={3} sx={{ minWidth: 0 }}>
          <Box sx={{ minWidth: 0 }}>
            <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 2 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: 'rgba(30, 93, 59, 0.12)',
                  color: '#1E5D3B',
                  lineHeight: 0,
                }}
              >
                <PlaceRoundedIcon fontSize="small" />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700 }}>
                  Metro Manila Location Map
                </Typography>
                <Typography variant="body2" sx={{ color: '#5f6f5d' }}>
                  User locations plotted from the current DinoWorld account list.
                </Typography>
              </Box>
            </Stack>

            <Box
              sx={{
                position: 'relative',
                height: { xs: 340, sm: 420, lg: 480 },
                overflow: 'hidden',
                borderRadius: 2,
                border: '1px solid rgba(30, 93, 59, 0.14)',
                backgroundColor: '#E7EFEA',
              }}
            >
              <Box
                component="iframe"
                title="Metro Manila location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=120.9000%2C14.4500%2C121.1500%2C14.7600&layer=mapnik&marker=14.5995%2C120.9842"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  border: 0,
                  filter: 'saturate(0.88) contrast(0.96)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background:
                    'linear-gradient(180deg, rgba(255, 253, 246, 0.04) 0%, rgba(30, 93, 59, 0.08) 100%)',
                }}
              />

              {locationMarkers.map((marker) => (
                <Box
                  key={marker.city}
                  sx={{
                    position: 'absolute',
                    left: `${marker.x}%`,
                    top: `${marker.y}%`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    pointerEvents: 'none',
                  }}
                >
                  <Box
                    sx={{
                      width: 16 + marker.users * 3,
                      height: 16 + marker.users * 3,
                      minWidth: 18,
                      borderRadius: '50%',
                      border: '3px solid #fffdf6',
                      backgroundColor: marker.activeUsers > 0 ? '#1E5D3B' : '#821400',
                      boxShadow: '0 10px 24px rgba(30, 93, 59, 0.34)',
                    }}
                  />
                  <Box
                    sx={{
                      maxWidth: 118,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1.5,
                      backgroundColor: 'rgba(255, 253, 246, 0.92)',
                      boxShadow: '0 8px 20px rgba(30, 93, 59, 0.12)',
                    }}
                  >
                    <Typography variant="caption" sx={{ display: 'block', color: '#1f2937', fontWeight: 700, lineHeight: 1.1 }}>
                      {marker.city}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5f6f5d', lineHeight: 1.1 }}>
                      {marker.city === 'Manila' ? displayedMappedUsers : marker.users} user{marker.users > 1 ? 's' : ''}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#5f6f5d', fontWeight: 700 }}>
                  Location Coverage
                </Typography>
                <Typography variant="h5" sx={{ color: '#1f2937', fontWeight: 700 }}>
                  {locationMarkers.length} cities
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#5f6f5d', fontWeight: 700 }}>
                {displayedMappedUsers} mapped users
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'minmax(0, 1fr)',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(3, minmax(0, 1fr))',
                },
                gap: 1.5,
              }}
            >
              {locationMarkers.map((marker) => (
                <Box
                  key={marker.city}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid rgba(30, 93, 59, 0.10)',
                    backgroundColor: 'rgba(255, 253, 246, 0.72)',
                    p: 1.5,
                    minWidth: 0,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: marker.activeUsers > 0 ? '#1E5D3B' : '#821400',
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 700 }}>
                        {marker.city}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#5f6f5d' }}>
                        {marker.activeUsers} active of {marker.users} mapped user{marker.users > 1 ? 's' : ''}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#1E5D3B', fontWeight: 700 }}>
                      {Math.round((marker.users / totalMappedUsers) * 100)}%
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

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
            value={totalUsersDisplay}
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

      <Box sx={{ width: '100%', minWidth: 0 }}>
        <LocationMapCard />
      </Box>
    </Stack>
  );
}

export default DashboardPage;
