import { Route, Routes } from 'react-router-dom'
import { Homepage, Login, Register } from './pages/indexpages';
import { Container } from './context/context';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className='min-vw-100 min-vh-100'>
      <Container>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Toaster/>
    </Container>
    </div>
  )
}

export default App
