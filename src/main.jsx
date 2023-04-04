import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DetailView from './DetailView';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route index={true} path="/" element={<App />} />
        <Route index={false} path="/concertDetails/:id" element={<DetailView />} />
    </Routes>
  </BrowserRouter>
)
