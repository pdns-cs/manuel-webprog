import { createElement, useRef } from 'react';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

const reportStats = [
  {
    title: 'Article Reads',
    value: '8,240',
    change: '+14.8%',
    detail: 'DinoWorld reads this month',
    icon: PaidRoundedIcon,
    color: '#257572',
    bg: 'rgba(37, 117, 114, 0.12)',
  },
  {
    title: 'PH Users',
    value: '1,320',
    change: '+2',
    detail: 'Registered Metro Manila users',
    icon: ReceiptLongRoundedIcon,
    color: '#BBAE3A',
    bg: 'rgba(187, 174, 58, 0.16)',
  },
  {
    title: 'Quiz Completion',
    value: '78%',
    change: '+6%',
    detail: 'Finished dinosaur review sets',
    icon: TrendingUpRoundedIcon,
    color: '#CF842C',
    bg: 'rgba(207, 132, 44, 0.14)',
  },
  {
    title: 'PH Reach',
    value: '6 cities',
    change: '+1',
    detail: 'Philippine visitor locations',
    icon: PublicRoundedIcon,
    color: '#1E5D3B',
    bg: 'rgba(30, 93, 59, 0.12)',
  },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const articleReadSeries = [41, 49, 46, 58, 63, 71, 82];
const profileViewSeries = [180, 210, 205, 244, 268, 301, 328];

const acquisitionChannels = [
  { label: 'Article Search', value: 38, color: '#1E5D3B' },
  { label: 'Social Links', value: 24, color: '#257572' },
  { label: 'Direct Visits', value: 19, color: '#CF842C' },
  { label: 'Newsletter', value: 12, color: '#BBAE3A' },
  { label: 'Class Referrals', value: 7, color: '#821400' },
];

const regionalPerformance = [
  { region: 'Manila', reads: 32, target: 88, growth: '+12%' },
  { region: 'Quezon City', reads: 24, target: 71, growth: '+8%' },
  { region: 'Pasig', reads: 18, target: 63, growth: '+16%' },
  { region: 'Makati', reads: 14, target: 54, growth: '+9%' },
  { region: 'Taguig', reads: 12, target: 48, growth: '+7%' },
  { region: 'Sampaloc', reads: 8, target: 42, growth: '+5%' },
];

const topProducts = [
  { name: 'Theropods', reads: 9200 },
  { name: 'Sauropods', reads: 7600 },
  { name: 'Fossils', reads: 6400 },
  { name: 'Ankylosaurs', reads: 4100 },
];

function MetricCard({ title, value, change, detail, icon: Icon, color, bg }) {
  return (
    <Card
      sx={{
        height: '100%',
        border: '1px solid rgba(30, 93, 59, 0.10)',
        borderRadius: 2,
        boxShadow: '0 16px 38px rgba(30, 93, 59, 0.08)',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="flex-start" spacing={1.5}>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" sx={{ color: '#5f6f5d', fontWeight: 700 }}>
                {title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  fontSize: { xs: '1.75rem', md: '1.95rem', xl: '2rem' },
                  fontWeight: 700,
                  color: '#1f2937',
                  lineHeight: 1.1,
                }}
              >
                {value}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto', flexShrink: 0, borderRadius: 2, backgroundColor: bg, p: 1.25 }}>
              {createElement(Icon, { sx: { color, fontSize: 24 } })}
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={change}
              size="small"
              sx={{
                backgroundColor: 'rgba(30, 93, 59, 0.12)',
                color: '#1E5D3B',
                fontWeight: 700,
              }}
            />
            <Typography variant="body2" sx={{ color: '#5f6f5d' }}>
              {detail}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function ReportsPage() {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900');

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page {
              size: A4;
              margin: 16mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #0f172a;
            }

            .report-shell {
              padding: 28px;
            }

            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #cbd5e1;
            }

            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }

            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #475569;
              line-height: 1.5;
            }

            .report-content .print-hide {
              display: none !important;
            }

            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e2e8f0;
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .report-content .MuiCardContent-root {
              padding: 20px;
            }

            .report-content svg {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>DinoWorld overview for article reads, dinosaur profile views, Philippine user activity, and city performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Stack ref={printRef} spacing={3} sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          border: '2px solid #1a3324',
          borderRadius: 2,
          px: { xs: 3, md: 4 },
          py: { xs: 3, md: 4 },
          color: '#F7F8EF',
          background: 'linear-gradient(135deg, #1E5D3B 0%, #257572 100%)',
          boxShadow: '0 18px 45px rgba(30, 93, 59, 0.18)',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
        >
          <Stack spacing={1} sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="overline" sx={{ letterSpacing: '0.16em', color: '#FAEDCB' }}>
              Reporting Center
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              DinoWorld Reports
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 760, color: 'rgba(247, 248, 239, 0.88)' }}>
              Track article reads, dinosaur profile views, Philippine learner activity, and city-based engagement.
            </Typography>
          </Stack>

          <Button
            className="print-hide"
            variant="contained"
            color="inherit"
            startIcon={<PrintRoundedIcon />}
            onClick={handlePrint}
            sx={{
              alignSelf: { xs: 'stretch', md: 'center' },
              ml: { md: 'auto' },
              flexShrink: 0,
              border: '1px solid #1a3324',
              backgroundColor: '#FAEDCB',
              color: '#1E5D3B',
              fontWeight: 700,
              '&:hover': {
                backgroundColor: '#f3dfad',
              },
            }}
          >
            Export PDF
          </Button>
        </Stack>
      </Box>

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
        }}
      >
        {reportStats.map((stat) => (
          <Box key={stat.title} sx={{ minWidth: 0 }}>
            <MetricCard {...stat} />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            xl: 'minmax(0, 8fr) minmax(0, 4fr)',
          },
          gap: 2.5,
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: '100%',
              border: '1px solid rgba(30, 93, 59, 0.10)',
              borderRadius: 2,
              background: '#fffdf6',
              boxShadow: '0 16px 38px rgba(30, 93, 59, 0.08)',
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
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                    DinoWorld Learning Trend
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5f6f5d' }}>
                    Monthly article reads compared with dinosaur profile views.
                  </Typography>
                </Box>
                <Chip
                  label="Updated 5 min ago"
                  sx={{ alignSelf: 'flex-start', backgroundColor: '#FAEDCB', color: '#1E5D3B' }}
                />
              </Stack>

              <LineChart
                height={340}
                xAxis={[{ scaleType: 'point', data: months }]}
                series={[
                  {
                    data: articleReadSeries,
                    label: 'Article Reads (x100)',
                    color: '#1E5D3B',
                    curve: 'monotoneX',
                  },
                  {
                    data: profileViewSeries,
                    label: 'Profile Views (x10)',
                    color: '#257572',
                    curve: 'monotoneX',
                  },
                ]}
                margin={{ top: 20, right: 20, bottom: 30, left: 45 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: '100%',
              border: '1px solid rgba(30, 93, 59, 0.10)',
              borderRadius: 2,
              background: '#fffdf6',
              boxShadow: '0 16px 38px rgba(30, 93, 59, 0.08)',
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                Visitor Source Mix
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#5f6f5d' }}>
                How Philippine visitors reach DinoWorld learning pages.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', minWidth: 0, overflow: 'hidden' }}>
                <PieChart
                  height={260}
                  width={280}
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
                      <Typography variant="body2" sx={{ color: '#374151', fontWeight: 600 }}>
                        {channel.label}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 700 }}>
                      {channel.value}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            xl: 'minmax(0, 8fr) minmax(0, 4fr)',
          },
          gap: 2.5,
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: '100%',
              border: '1px solid rgba(30, 93, 59, 0.10)',
              borderRadius: 2,
              background: '#fffdf6',
              boxShadow: '0 16px 38px rgba(30, 93, 59, 0.08)',
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                Top Dino Topics
              </Typography>
              <Typography variant="body2" sx={{ mb: 2.5, color: '#5f6f5d' }}>
                Compare the most-read DinoWorld article categories this month.
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
                    data: topProducts.map((product) => product.reads),
                    label: 'Reads',
                    color: '#BBAE3A',
                  },
                ]}
                borderRadius={10}
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                grid={{ horizontal: true }}
              />
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: '100%',
              border: '1px solid rgba(30, 93, 59, 0.10)',
              borderRadius: 2,
              background: '#fffdf6',
              boxShadow: '0 16px 38px rgba(30, 93, 59, 0.08)',
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                Philippine City Performance
              </Typography>
              <Typography variant="body2" sx={{ mb: 2.5, color: '#5f6f5d' }}>
                Article-read share and progress from user locations in the Philippines.
              </Typography>

              <Stack spacing={2.25}>
                {regionalPerformance.map((region) => (
                  <Box key={region.region}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1f2937' }}>
                          {region.region}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#5f6f5d' }}>
                          {region.reads}K article reads
                        </Typography>
                      </Box>
                      <Chip
                        label={region.growth}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(250, 237, 203, 0.9)',
                          color: '#1E5D3B',
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
                        backgroundColor: 'rgba(30, 93, 59, 0.12)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 999,
                          background: 'linear-gradient(90deg, #1E5D3B 0%, #257572 100%)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={1.25}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#374151' }}>
                  Key Insight
                </Typography>
                <Typography variant="body2" sx={{ color: '#5f6f5d' }}>
                  Pasig is showing the fastest momentum, while Manila remains the top DinoWorld activity driver.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Stack>
  );
}

export default ReportsPage;
