'use client';

import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface UserToolbarProps {
  onAdd: () => void;
}

export default function UserToolbar({ onAdd }: UserToolbarProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onAdd}
        startIcon={<AddIcon />}
        sx={{ 
          borderRadius: 2,
          fontWeight: 'medium'
        }}
      >
        Yeni Kullanıcı Ekle
      </Button>
    </Box>
  );
} 