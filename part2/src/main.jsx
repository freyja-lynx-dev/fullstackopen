import App from './App.jsx'
import ReactDOM from 'react-dom/client'

const notes = [
  {
    id: 1,
    content: 'html is easy peasy',
    important: true
  },
  {
    id: 2,
    content: 'browser can only execute javascript (and wasm)',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important http protocol methods!!',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)
