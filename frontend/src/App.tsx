import { ThemeProvider, CssBaseline, Box } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import Home from './pages/Home';
import Calculation from './pages/Calculation';
// import TestPage from './pages/TestPage';
import FullSteps from './pages/FullSteps';
function App() {
  return (
    <>
      <div className="background-blobs">
        <div className="blob blob-blue" />
        <div className="blob blob-mauve" />
        <div className="blob blob-green" />
      </div>
      <div className="background-glow">
        <div className="glow glow-tl" />
        <div className="glow glow-br" />
      </div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            background: theme.palette.background.default,
            backgroundImage: 'none',
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculation" element={<Calculation />} />
              <Route path="/full-steps" element={<FullSteps />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
