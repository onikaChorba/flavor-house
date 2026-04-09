import { Box, Typography } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GrassIcon from '@mui/icons-material/Grass';
import GrainIcon from '@mui/icons-material/Grain';

const BurgerHero = ({ BurgerImg }: any) => {
  return (
    <Box sx={{
      position: 'relative',
      width: { xs: '320px', sm: '450px', md: '550px' },
      height: { xs: '320px', sm: '450px', md: '550px' },
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box sx={{
        position: 'absolute',
        width: '70%',
        height: '70%',
        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        opacity: 0.25,
        filter: 'blur(60px)',
        zIndex: 0,
        animation: 'pulse 4s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.2 },
          '50%': { transform: 'scale(1.2)', opacity: 0.35 },
        }
      }} />

      <Box sx={{
        position: 'absolute',
        bottom: '15%',
        right: '15%',
        width: '120px',
        height: '120px',
        background: 'var(--accent)',
        filter: 'blur(50px)',
        opacity: 0.15,
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        zIndex: 2,
        animation: 'floatIcon 4s ease-in-out infinite',
        '@keyframes floatIcon': {
          '0%, 100%': { transform: 'translateY(0) rotate(-10deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        }
      }}>
        <LocalFireDepartmentIcon sx={{ color: 'var(--primary)', fontSize: '40px', filter: 'drop-shadow(0 0 10px var(--primary))' }} />
      </Box>

      <Box sx={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        zIndex: 2,
        animation: 'floatIconReverse 6s ease-in-out infinite',
        '@keyframes floatIconReverse': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-20deg)' },
        }
      }}>
        <GrassIcon sx={{ color: 'var(--accent)', fontSize: '35px', opacity: 0.6 }} />
      </Box>

      <Box sx={{
        position: 'absolute',
        top: '25%',
        right: '10%',
        zIndex: 2,
        animation: 'spin 10s linear infinite',
        '@keyframes spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        }
      }}>
        <GrainIcon sx={{ color: 'var(--text-secondary)', fontSize: '25px', opacity: 0.4 }} />
      </Box>

      <Box sx={{
        position: 'absolute',
        top: '15%',
        right: '0',
        zIndex: 3,
        bgcolor: 'var(--accent)',
        color: 'var(--bg)',
        p: '12px',
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 20px rgba(46, 211, 183, 0.4)',
        fontWeight: 900,
        transform: 'rotate(15deg)',
        animation: 'floatBadge 5s ease-in-out infinite',
        '@keyframes floatBadge': {
          '0%, 100%': { transform: 'rotate(15deg) translateY(0)' },
          '50%': { transform: 'rotate(10deg) translateY(-15px)' },
        }
      }}>
        <Typography variant="caption" sx={{ lineHeight: 1, fontWeight: 800 }}>HOT</Typography>
        <Typography variant="body2" sx={{ lineHeight: 1, fontWeight: 900 }}>SALE</Typography>
      </Box>
      <Box
        component="img"
        src={BurgerImg}
        alt="Смачний Бургер"
        sx={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))',
          animation: 'mainFloat 5s ease-in-out infinite',
          '@keyframes mainFloat': {
            '0%, 100%': { transform: 'translateY(0) scale(1)' },
            '50%': { transform: 'translateY(-15px) scale(1.02)' },
          }
        }}
      />

      <Box sx={{
        position: 'absolute',
        bottom: '5%',
        width: '60%',
        height: '20px',
        background: 'rgba(0,0,0,0.6)',
        filter: 'blur(15px)',
        borderRadius: '50%',
        zIndex: 0,
        animation: 'shadowResize 5s ease-in-out infinite',
        '@keyframes shadowResize': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
          '50%': { transform: 'scale(0.8)', opacity: 0.3 },
        }
      }} />
    </Box>
  );
};

export { BurgerHero };