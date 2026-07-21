import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReducerProvider } from './context/reducer.context/ReducerContext.jsx'
import { StateProvider } from './context/state.context/StateContext.jsx'
import App from './App.jsx'
import './assets/global/GlobalStyle.css'
import { ScrollProvider } from './context/scroll.context/Scroll.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReducerProvider>
        <StateProvider>
          <ScrollProvider>
            <App />
          </ScrollProvider>
        </StateProvider>
      </ReducerProvider>
    </BrowserRouter>
  </StrictMode>
)
