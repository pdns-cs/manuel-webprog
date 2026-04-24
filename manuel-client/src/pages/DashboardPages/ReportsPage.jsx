import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

const reportStats = [
  {
    title: 'Revenue',
    value: '$82.4K',
    change: '+14.8%',
    detail: 'Compared to last month',
    icon: PaidRoundedIcon,
    color: '#0f766e',
    bg: 'rgba(15, 118, 110, 0.10)',
  },
  {
    title: 'Orders',
    value: '3,284',
    change: '+9.2%',
    detail: '184 new orders this week',
    icon: ReceiptLongRoundedIcon,
    color: '#7c3aed',
    bg: 'rgba(124, 58, 237, 0.10)',
  },
  {
    title: 'Conversion',
    value: '6.3%',
    change: '+1.1%',
    detail: 'Landing pages performing better',
    icon: TrendingUpRoundedIcon,
    color: '#ea580c',
    bg: 'rgba(234, 88, 12, 0.10)',
  },
  {
    title: 'Global Reach',
    value: '42 countries',
    change: '+6',
    detail: 'New active regions this quarter',
    icon: PublicRoundedIcon,
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.10)',
  },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const revenueSeries = [41, 49, 46, 58, 63, 71, 82];
const orderSeries = [180, 210, 205, 244, 268, 301, 328];

const acquisitionChannels = [
  { label: 'Organic Search', value: 38, color: '#2563eb' },
  { label: 'Social Media', value: 24, color: '#7c3aed' },
  { label: 'Direct', value: 19, color: '#f97316' },
  { label: 'Email', value: 12, color: '#14b8a6' },
  { label: 'Referral', value: 7, color: '#64748b' },
];

const regionalPerformance = [
  { region: 'North America', revenue: 32, target: 88, growth: '+12%' },
  { region: 'Europe', revenue: 24, target: 71, growth: '+8%' },
  { region: 'Asia Pacific', revenue: 18, target: 63, growth: '+16%' },
  { region: 'Latin America', revenue: 8, target: 42, growth: '+5%' },
];

const topProducts = [
  { name: 'Analytics Pro', sales: 9200 },
  { name: 'Growth Suite', sales: 7600 },
  { name: 'Team Insights', sales: 6400 },
  { name: 'Starter Plan', sales: 4100 },
];

function MetricCard({ title, value, change, detail, icon: Icon, color, bg }) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 22px 50px rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 700, color: '#0f172a' }}>
                {value}
              </Typography>
            </Box>
            <Box sx={{ borderRadius: 3, backgroundColor: bg, p: 1.25 }}>
              <Icon sx={{ color, fontSize: 24 }} />
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={change}
              size="small"
              sx={{
                backgroundColor: 'rgba(22, 163, 74, 0.12)',
                color: '#15803d',
                fontWeight: 700,
              }}
            />
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              {detail}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function ReportsPage() {
  return (
    <Stack spacing={3.5}>
      <Box
        sx={{
          borderRadius: 5,
          px: { xs: 3, md: 4 },
          py: { xs: 3, md: 4 },
          color: '#eff6ff',
          background:
            'radial-gradient(circle at top left, rgba(59,130,246,0.45), transparent 30%), linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)',
          boxShadow: '0 24px 60px rgba(37, 99, 235, 0.25)',
        }}
      >
        <Stack spacing={1}>
          <Typography variant="overline" sx={{ letterSpacing: '0.16em', color: '#bfdbfe' }}>
            Reporting Center
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Reports & Data Visualization
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 760, color: '#dbeafe' }}>
            Track revenue growth, order trends, customer acquisition, and regional performance from a single analytics workspace.
          </Typography>
        </Stack>
      </Box>

      <Grid container spacing={2.5}>
        {reportStats.map((stat) => (
          <Grid key={stat.title} item xs={12} sm={6} xl={3}>
            <MetricCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 5,
              background:
                'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.07)',
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                spacing={1}
                sx={{ mb: 3 }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Revenue Trend
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Monthly revenue performance against order volume.
                  </Typography>
                </Box>
                <Chip
                  label="Updated 5 min ago"
                  sx={{ alignSelf: 'flex-start', backgroundColor: '#dbeafe', color: '#1d4ed8' }}
                />
              </Stack>

              <LineChart
                height={340}
                xAxis={[{ scaleType: 'point', data: months }]}
                series={[
                  {
                    data: revenueSeries,
                    label: 'Revenue (K)',
                    color: '#2563eb',
                    curve: 'monotoneX',
                  },
                  {
                    data: orderSeries,
                    label: 'Orders (x10)',
                    color: '#14b8a6',
                    curve: 'monotoneX',
                  },
                ]}
                margin={{ top: 20, right: 20, bottom: 30, left: 45 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} xl={4}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 5,
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.07)',
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Acquisition Mix
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#64748b' }}>
                Customer sources contributing to total traffic.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  height={280}
                  width={320}
                  series={[
                    {
                      innerRadius: 52,
                      outerRadius: 100,
                      paddingAngle: 3,
                      cornerRadius: 6,
                      data: acquisitionChannels.map((item, index) => ({
                        id: index,
                        value: item.value,
                        label: item.label,
                        color: item.color,
                      })),
                    },
                  ]}
                  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                />
              </Box>

              <Stack spacing={1.25} sx={{ mt: 1 }}>
                {acquisitionChannels.map((channel) => (
                  <Stack
                    key={channel.label}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '999px',
                          backgroundColor: channel.color,
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        {channel.label}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 700 }}>
                      {channel.value}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 5,
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.07)',
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Top Product Revenue
              </Typography>
              <Typography variant="body2" sx={{ mb: 2.5, color: '#64748b' }}>
                Compare the strongest-performing products this month.
              </Typography>

              <BarChart
                height={320}
                xAxis={[
                  {
                    scaleType: 'band',
                    data: topProducts.map((product) => product.name),
                  },
                ]}
                series={[
                  {
                    data: topProducts.map((product) => product.sales),
                    label: 'Sales',
                    color: '#7c3aed',
                  },
                ]}
                borderRadius={10}
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                grid={{ horizontal: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 5,
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.07)',
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Regional Performance
              </Typography>
              <Typography variant="body2" sx={{ mb: 2.5, color: '#64748b' }}>
                Revenue share and progress toward each region's target.
              </Typography>

              <Stack spacing={2.25}>
                {regionalPerformance.map((region) => (
                  <Box key={region.region}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                          {region.region}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          ${region.revenue}K revenue
                        </Typography>
                      </Box>
                      <Chip
                        label={region.growth}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(37, 99, 235, 0.1)',
                          color: '#1d4ed8',
                          fontWeight: 700,
                        }}
                      />
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={region.target}
                      sx={{
                        mt: 1,
                        height: 10,
                        borderRadius: 999,
                        backgroundColor: '#e2e8f0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 999,
                          background: 'linear-gradient(90deg, #2563eb 0%, #14b8a6 100%)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={1.25}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155' }}>
                  Key Insight
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Asia Pacific is showing the fastest momentum, while North America remains the top revenue driver.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ReportsPage;
