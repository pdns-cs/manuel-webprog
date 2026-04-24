import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    minWidth: 180,
    flex: 1.2,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function UsersPage() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
          Users List
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.75, color: '#64748b' }}>
          Demo user records based on the MUI sample data, ready for the next activity.
        </Typography>
      </Box>

      <Card
        sx={{
          borderRadius: 5,
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.07)',
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={1.5}
            sx={{ mb: 2.5 }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                User Details Table
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Editable sample rows for testing layout, selection, and pagination.
              </Typography>
            </Box>
            <Chip
              label={`${rows.length} sample users`}
              sx={{
                backgroundColor: '#dbeafe',
                color: '#1d4ed8',
                fontWeight: 700,
              }}
            />
          </Stack>

          <Box sx={{ height: 560, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: 3,
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8fafc',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default UsersPage;
