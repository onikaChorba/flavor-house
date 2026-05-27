import { useState } from 'react';
import {
  Dialog, DialogContent, TextField, Button, Box, Typography, IconButton, InputAdornment
} from '@mui/material';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

import type { FormEvent } from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') setError('Цей Email вже зареєстровано 🚫');
      else if (err.code === 'auth/weak-password') setError('Пароль має бути не менше 6 символів 🔑');
      else if (err.code === 'auth/invalid-credential') setError('Невірна пошта або пароль ❌');
      else setError(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'var(--bg-cards)',
            color: '#fff',
            borderRadius: '16px',
            border: '1px solid var(--borders)',
            padding: '16px',
            maxWidth: '400px',
            width: '100%'
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {mode === 'login' ? 'Вхід у Flavor House' : 'Реєстрація'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'var(--text-secondary)' }}>
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>

          {mode === 'register' && (
            <TextField
              label="Ваше ім'я"
              variant="outlined"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              slotProps={{ inputLabel: { style: { color: 'var(--text-secondary)' } } }}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'var(--borders)' } } }}
            />
          )}

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{ inputLabel: { style: { color: 'var(--text-secondary)' } } }}
            sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'var(--borders)' } } }}
          />

          <TextField
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              inputLabel: { style: { color: 'var(--text-secondary)' } },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'var(--text-secondary)' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'var(--borders)' } } }}
          />

          {error && (
            <Typography variant="body2" sx={{ color: '#ff4444', fontWeight: 600, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: 'var(--primary)',
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { backgroundColor: 'var(--btn-hover)' }
            }}
          >
            {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Button
              onClick={toggleMode}
              sx={{ color: 'var(--text-secondary)', textTransform: 'none', fontSize: '0.85rem', '&:hover': { color: 'var(--primary)' } }}
            >
              {mode === 'login' ? 'Немає акаунту? Створити' : 'Вже є акаунт? Увійти'}
            </Button>
          </Box>

        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { AuthModal };