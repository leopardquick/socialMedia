import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'


hydrate(<App suppressHydrationWarning={true}/>,document.getElementById("root"))