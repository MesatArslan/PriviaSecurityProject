'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Button, Typography, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { User } from './types/user';
import { userStore } from './store/userStore';
import UserForm from './components/UserForm';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import UserToolbar from './components/UserToolbar';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Sayfa yüklendiğinde verileri getir
  useEffect(() => {
    setUsers(userStore.getUsers());
  }, []);

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'İsim', flex: 1, minWidth: 120 },
    { field: 'lastName', headerName: 'Soyisim', flex: 1, minWidth: 120 },
    { field: 'email', headerName: 'E-posta', flex: 1.5, minWidth: 200 },
    { field: 'phone', headerName: 'Telefon', flex: 1, minWidth: 130 },
    {
      field: 'actions',
      headerName: 'İşlemler',
      flex: 1,
      minWidth: 150,
      sortable: false, // Sıralama özelliğini kaldır
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => handleEdit(params.row)}
          >
            Düzenle
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            Sil
          </Button>
        </Box>
      ),
    },
  ];

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setOpenDelete(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      userStore.deleteUser(userToDelete);
      setUsers(userStore.getUsers());
      setOpenDelete(false);
      setUserToDelete(null);
    }
  };

  const handleSave = (userData: Omit<User, 'id' | 'createdAt'>) => {
    if (selectedUser) {
      userStore.updateUser({ ...userData, id: selectedUser.id, createdAt: selectedUser.createdAt });
    } else {
      userStore.addUser(userData);
    }
    setUsers(userStore.getUsers());
    setOpenForm(false);
    setSelectedUser(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
          Kullanıcı Yönetim Sistemi
        </Typography>
        <UserToolbar onAdd={() => setOpenForm(true)} />
      </Paper>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            disableRowSelectionOnClick
            localeText={{
              noRowsLabel: 'Kayıt bulunamadı',
              footerRowSelected: count => `${count} satır seçildi`,
              columnMenuLabel: 'Menü',
              columnMenuShowColumns: 'Sütunları göster',
              columnMenuFilter: 'Filtrele',
              columnMenuHideColumn: 'Gizle',
              columnMenuUnsort: 'Sıralamayı temizle',
              columnMenuSortAsc: 'Artan sırala',
              columnMenuSortDesc: 'Azalan sırala',
              filterOperatorContains: 'içerir',
              filterOperatorEquals: 'eşittir',
              filterOperatorStartsWith: 'ile başlar',
              filterOperatorEndsWith: 'ile biter',
              filterOperatorIs: 'şudur',
              filterOperatorNot: 'şu değildir',
              filterOperatorAfter: 'sonra',
              filterOperatorOnOrAfter: 'tarihinde veya sonra',
              filterOperatorBefore: 'önce',
              filterOperatorOnOrBefore: 'tarihinde veya önce',
              filterOperatorIsEmpty: 'boş',
              filterOperatorIsNotEmpty: 'boş değil',
              filterPanelAddFilter: 'Filtre Ekle',
              filterPanelDeleteIconLabel: 'Sil',
              filterPanelOperator: 'Mantıksal operatör',
              filterValueAny: 'herhangi',
              filterValueTrue: 'doğru',
              filterValueFalse: 'yanlış',
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from}-${to} / ${count !== -1 ? count : `${to}'den fazla`}`,
                labelRowsPerPage: 'Sayfa başına satır:',
              },
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#fafafa',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f0f7ff',
              },
            }}
          />
        </Box>
      </Paper>

      <UserForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedUser(null);
        }}
        onSave={handleSave}
        user={selectedUser}
      />

      <DeleteConfirmDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </Container>
  );
} 