import { ChargerProvider } from './components/ChargerProvider'
import { ChargerView } from './components/ChargerView'

function App() {
  return (
    <ChargerProvider>
      <ChargerView />
    </ChargerProvider>
  )
}

export default App
