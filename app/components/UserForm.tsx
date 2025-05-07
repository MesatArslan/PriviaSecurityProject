'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { User } from '../types/user';
import { useState, useEffect } from 'react';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, 'id' | 'createdAt'>) => void;
  user?: User | null;
}

export default function UserForm({ open, onClose, onSave, user }: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      });
      setErrors({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });
      setErrors({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
      });
    }
  }, [user]);

  const validatePhone = (value: string) => {
    // Sadece rakamları kabul et
    const numericValue = value.replace(/\D/g, '');
    
    // 10 karakterden fazlasını kesip almak
    return numericValue.slice(0, 10);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = validatePhone(value);
    setFormData({ ...formData, phone: formattedValue });
    setErrors({
      ...errors,
      phone: formattedValue.length !== 10 && formattedValue.length > 0
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    
    // Basit email doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors({
      ...errors,
      email: !emailRegex.test(value) && value.length > 0
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulaması
    const newErrors = {
      firstName: formData.firstName.trim() === '',
      lastName: formData.lastName.trim() === '',
      email: !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      phone: formData.phone.length !== 10
    };
    
    setErrors(newErrors);
    
    // Herhangi bir hata varsa gönderme
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: 24, fontWeight: 'medium', pb: 1 }}>
        {user ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField
              label="İsim"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
              helperText={errors.firstName ? 'İsim alanı zorunludur' : ''}
              fullWidth
              autoFocus
              required
              variant="outlined"
            />
            <TextField
              label="Soyisim"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
              helperText={errors.lastName ? 'Soyisim alanı zorunludur' : ''}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="E-posta"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              error={errors.email}
              helperText={errors.email ? 'Geçerli bir e-posta adresi giriniz' : ''}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Telefon"
              value={formData.phone}
              onChange={handlePhoneChange}
              error={errors.phone}
              helperText={errors.phone ? '10 haneli telefon numarası giriniz' : 'Format: 10 haneli numara'}
              fullWidth
              required
              variant="outlined"
              placeholder="5551234567"
              inputProps={{
                maxLength: 10,
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} variant="outlined">İptal</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={errors.firstName || errors.lastName || errors.email || errors.phone}
          >
            Kaydet
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 