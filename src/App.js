import { CssBaseline, useTheme } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { Navbar, Movies } from './components'
import { Actors, MovieInformation, Profile } from './pages'

function App() {
  const theme = useTheme()
  return (
    <div className='root'>
      <CssBaseline />
      <Navbar theme={theme} />
      <main className='content'>
        <div className='toolbar' />
        <Routes>
          <Route path="/" element={<Movies theme={theme} />} />
          <Route path="movie/:id" element={<MovieInformation theme={theme} />} />
          <Route path="actors/:id" element={<Actors theme={theme} />} />
          <Route path="profile" element={<Profile theme={theme} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
