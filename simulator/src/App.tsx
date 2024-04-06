import { ChargerProvider } from '@charger/common'
import { ChargerView } from './components/ChargerView'

function App() {
  return (
    <ChargerProvider>
      <ChargerView />
    </ChargerProvider>
  )
}

export default App
