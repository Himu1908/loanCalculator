import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from './context/ThemeContext';

function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton color="inherit" onClick={toggleTheme} sx={{ position: 'absolute', top: 16, right: 16 }}>
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
