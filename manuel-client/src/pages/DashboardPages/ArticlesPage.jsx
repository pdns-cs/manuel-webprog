import { useEffect, useMemo, useState } from 'react';
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
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import {
  createArticle,
  fetchArticles,
  updateArticle,
} from '../../services/ArticleService';

const blankArticle = {
  slug: '',
  title: '',
  preview: '',
  paragraphsText: '',
  url: '',
  isActive: true,
};

const textFieldSx = {
  '& .MuiInputLabel-root': {
    backgroundColor: '#fffdf6',
    px: 0.75,
  },
};

const normalizeArticle = (article, index) => ({
  ...article,
  id: article._id || article.id || index + 1,
  slug: String(article.slug ?? '').trim(),
  title: String(article.title ?? '').trim(),
  preview: String(article.preview ?? '').trim(),
  paragraphs: Array.isArray(article.paragraphs) ? article.paragraphs : [],
  url: String(article.url ?? '').trim(),
  isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
});

const getArticlesFromResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.articles)) {
    return data.articles;
  }

  return [];
};

const toSlug = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function ArticlesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [articles, setArticles] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankArticle);
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({ search: '', status: 'all' });
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState('');

  const loadArticles = async () => {
    setLoading(true);
    setPageError('');

    try {
      const { data } = await fetchArticles();
      setArticles(getArticlesFromResponse(data).map(normalizeArticle));
    } catch (error) {
      console.error('Error fetching articles:', error);
      setPageError(
        error.response?.data?.message ||
          error.message ||
          'Unable to load articles. Please check if the backend server is running.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch = search
        ? [article.slug, article.title, article.preview].some((value) =>
            String(value ?? '').toLowerCase().includes(search),
          )
        : true;
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'active' ? article.isActive : !article.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [articles, filters]);

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null });
    setForm(
      article
        ? {
            slug: article.slug,
            title: article.title,
            preview: article.preview,
            paragraphsText: article.paragraphs.join('\n\n'),
            url: article.url,
            isActive: article.isActive,
          }
        : blankArticle,
    );
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankArticle);
    setErrors({});
  };

  const handleChange = ({ target: { name, value } }) => {
    const nextValue = name === 'slug' ? toSlug(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleTitleChange = ({ target: { value } }) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: modal.id || prev.slug ? prev.slug : toSlug(value),
    }));
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.slug.trim()) {
      nextErrors.slug = 'Slug is required.';
    }

    if (!form.title.trim()) {
      nextErrors.title = 'Title is required.';
    }

    if (!form.preview.trim()) {
      nextErrors.preview = 'Preview is required.';
    }

    if (!form.paragraphsText.trim()) {
      nextErrors.paragraphsText = 'At least one paragraph is required.';
    }

    if (
      !nextErrors.slug &&
      articles.some((article) => article.id !== modal.id && article.slug === form.slug)
    ) {
      nextErrors.slug = 'Slug already exists.';
    }

    return nextErrors;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      preview: form.preview.trim(),
      paragraphs: form.paragraphsText
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      url: form.url.trim(),
      isActive: form.isActive,
    };

    setLoading(true);
    setPageError('');

    try {
      if (modal.id) {
        await updateArticle(modal.id, payload);
      } else {
        await createArticle(payload);
      }

      await loadArticles();
      closeModal();
    } catch (error) {
      console.error('Error saving article:', error);
      setPageError(error.response?.data?.message || 'Unable to save article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (article) => {
    setLoading(true);
    setPageError('');

    try {
      await updateArticle(article.id, {
        slug: article.slug,
        title: article.title,
        preview: article.preview,
        paragraphs: article.paragraphs,
        url: article.url,
        isActive: !article.isActive,
      });
      await loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
      setPageError(error.response?.data?.message || 'Unable to update article status.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 110,
      valueGetter: (_, row) => String(row.id).slice(-6).toUpperCase(),
    },
    { field: 'slug', headerName: 'Slug', minWidth: 170, flex: 0.8 },
    { field: 'title', headerName: 'Title', minWidth: 220, flex: 1 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 130,
      valueGetter: (_, row) => row.paragraphs.length,
    },
    { field: 'preview', headerName: 'Preview', minWidth: 260, flex: 1.2 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
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
      width: 210,
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
            Articles
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: '#5f6f5d' }}>
            Manage dashboard article records and publishing status.
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
          Add Article
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

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              label="Search Articles"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <TextField
              select
              label="Status Filter"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              sx={{ minWidth: { xs: '100%', md: 180 } }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Stack>

          <Box sx={{ height: { xs: 520, sm: 580 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
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
        </CardContent>
      </Card>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSave}>
          <DialogTitle sx={{ color: '#1f2937', fontWeight: 700 }}>
            {modal.id ? 'Edit Article' : 'Add Article'}
          </DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                name="title"
                label="Title"
                value={form.title}
                onChange={handleTitleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                fullWidth
                sx={textFieldSx}
              />
              <TextField
                name="slug"
                label="Slug"
                value={form.slug}
                onChange={handleChange}
                error={Boolean(errors.slug)}
                helperText={errors.slug}
                fullWidth
                sx={textFieldSx}
              />
              <TextField
                name="preview"
                label="Preview"
                placeholder="Write a short article summary."
                value={form.preview}
                onChange={handleChange}
                error={Boolean(errors.preview)}
                helperText={errors.preview}
                fullWidth
                multiline
                rows={2}
                sx={textFieldSx}
              />
              <TextField
                name="paragraphsText"
                label="Paragraphs"
                placeholder="Write each paragraph, separated by a blank line."
                value={form.paragraphsText}
                onChange={handleChange}
                error={Boolean(errors.paragraphsText)}
                helperText={errors.paragraphsText || 'Separate paragraphs with a blank line.'}
                fullWidth
                multiline
                rows={7}
                sx={textFieldSx}
              />
              <TextField
                name="url"
                label="Source URL"
                value={form.url}
                onChange={handleChange}
                fullWidth
                sx={textFieldSx}
              />
              <TextField
                select
                name="isActive"
                label="Status"
                value={form.isActive ? 'active' : 'inactive'}
                onChange={({ target: { value } }) =>
                  setForm((prev) => ({ ...prev, isActive: value === 'active' }))
                }
                fullWidth
                sx={textFieldSx}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
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
              {loading ? 'Saving...' : modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
}

export default ArticlesPage;
