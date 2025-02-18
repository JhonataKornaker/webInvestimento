import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ListaInvestimentos from './screens/ListaInvestimentos'
import CadastroInvestimento from './screens/CadastroInvestimento'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ListaInvestimentos />} />
        <Route path='/cadastro' element={<CadastroInvestimento />} />
      </Routes>
    </Router>
  );
}

export default App
