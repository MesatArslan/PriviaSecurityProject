'use client';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 2, minWidth: '350px' }
      }}
    >
      <DialogTitle sx={{ fontSize: 20, fontWeight: 'medium', display: 'flex', alignItems: 'center', gap: 1 }}>
        <DeleteIcon color="error" /> Kullanıcı Sil
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ minWidth: '80px' }}
        >
          İptal
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{ minWidth: '80px' }}
        >
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
} 