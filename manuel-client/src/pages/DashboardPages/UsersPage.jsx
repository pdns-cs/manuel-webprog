import { useEffect, useMemo, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import {
  createUser,
  fetchUsers,
  updateUser,
} from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const normalizeUser = (user, index) => ({
  ...user,
  id: user._id || user.id || index + 1,
  firstName: String(user.firstName ?? '').trim(),
  lastName: String(user.lastName ?? '').trim(),
  age: String(user.age ?? '').trim(),
  gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
    ? String(user.gender ?? '').trim().toLowerCase()
    : '',
  contactNumber: String(user.contactNumber ?? '').trim(),
  email: String(user.email ?? '').trim().toLowerCase(),
  role: roles.includes(String(user.role ?? '').trim().toLowerCase())
    ? String(user.role ?? '').trim().toLowerCase()
    : 'editor',
  username: String(user.username ?? '').trim().toLowerCase(),
  password: String(user.password ?? ''),
  address: String(user.address ?? '').trim(),
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
});

const getUsersFromResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.users)) {
    return data.users;
  }

  return [];
};

function UsersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    role: 'all',
    gender: 'all',
    status: 'all',
  });

  const loadUsers = async () => {
    setLoading(true);
    setPageError('');

    try {
      const { data } = await fetchUsers();
      setUsers(getUsersFromResponse(data).map(normalizeUser));
    } catch (error) {
      console.error('Error fetching users:', error);
      setPageError(
        error.response?.data?.message ||
          error.message ||
          'Unable to load users. Please check if the backend server is running.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = search
        ? [user.firstName, user.lastName, user.email, user.username].some((value) =>
            String(value ?? '').toLowerCase().includes(search),
          )
        : true;
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesGender = filters.gender === 'all' || user.gender === filters.gender;
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'active' ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [filters, users]);

  const resetForm = () => {
    setForm(blankForm);
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user, password: '' } : blankForm);
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.age && !/^\d+$/.test(form.age.trim())) {
      nextErrors.age = 'Age must be a number only.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim())) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.';
    }

    if (!modal.id && !String(form.password).trim()) {
      nextErrors.password = 'Password is required.';
    }

    if (!nextErrors.password && form.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (
      !nextErrors.email &&
      users.some((user) => user.id !== modal.id && user.email === email)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    if (
      !nextErrors.username &&
      users.some((user) => user.id !== modal.id && user.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: form.isActive,
    };

    if (form.password) {
      nextUser.password = form.password;
    }

    setLoading(true);
    setPageError('');

    try {
      if (modal.id) {
        await updateUser(modal.id, nextUser);
      } else {
        await createUser(nextUser);
      }

      await loadUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error);
      setPageError(error.response?.data?.message || 'Unable to save user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (user) => {
    setLoading(true);
    setPageError('');

    try {
      const editableUser = { ...user };
      delete editableUser.password;

      await updateUser(user.id, {
        ...editableUser,
        isActive: !user.isActive,
      });
      await loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      setPageError(error.response?.data?.message || 'Unable to update user status.');
    } finally {
      setLoading(false);
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full name',
      minWidth: 180,
      flex: 1,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            disabled={loading}
            onClick={() => toggleStatus(row)}
            sx={{
              backgroundColor: row.isActive ? '#CF842C' : '#1E5D3B',
              '&:hover': {
                backgroundColor: row.isActive ? '#b87322' : '#16452d',
              },
            }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
            Users
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: '#5f6f5d' }}>
            Search, filter, add, edit, and manage user records.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            backgroundColor: '#1E5D3B',
            '&:hover': {
              backgroundColor: '#16452d',
            },
          }}
        >
          Add User
        </Button>
      </Box>

      <Card
        sx={{
          border: '1px solid rgba(30, 93, 59, 0.10)',
          borderRadius: 2,
          backgroundColor: '#fffdf6',
          boxShadow: '0 16px 38px rgba(30, 93, 59, 0.08)',
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          {pageError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {pageError}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Search users"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="First name, last name, email, or username"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2.33}>
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All roles</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={2.33}>
              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All genders</MenuItem>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={2.33}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                User Details Table
              </Typography>
              <Typography variant="body2" sx={{ color: '#5f6f5d' }}>
                Showing {filteredUsers.length} of {users.length} records.
              </Typography>
            </Box>
            <Chip
              label={`${users.filter((user) => user.isActive).length} active users`}
              sx={{
                alignSelf: { xs: 'flex-start', sm: 'center' },
                backgroundColor: 'rgba(250, 237, 203, 0.9)',
                color: '#1E5D3B',
                fontWeight: 700,
              }}
            />
          </Stack>

          {users.length ? (
            <Box sx={{ height: { xs: 520, sm: 580 }, width: '100%', minWidth: 0 }}>
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                loading={loading}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5, page: 0 } },
                }}
                sx={{
                  border: '1px solid rgba(30, 93, 59, 0.14)',
                  borderRadius: 2,
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#F7F8EF',
                    color: '#1E5D3B',
                  },
                  '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                    outline: 'none',
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'rgba(250, 237, 203, 0.28)',
                  },
                }}
              />
            </Box>
          ) : (
            <Alert severity="info">
              {loading ? 'Loading users...' : 'No users found. Use Add User to create your first record.'}
            </Alert>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ color: '#1f2937', fontWeight: 700 }}>
            {modal.id ? 'Edit User' : 'Add User'}
          </DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(event) => event.preventDefault()}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: '#1E5D3B',
                '&:hover': {
                  backgroundColor: '#16452d',
                },
              }}
            >
              {loading ? 'Saving...' : modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
}

export default UsersPage;
