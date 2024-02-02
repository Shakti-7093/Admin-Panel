import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './Store/Store.tsx'
import { UserProvider } from './Context/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </Provider>,
);