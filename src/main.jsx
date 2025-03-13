import  React , { StrictMode} from 'react'
import * as Sentry            from "@sentry/react"
import { createRoot }         from 'react-dom/client'
import App                    from './App.jsx'
import './index.css'

Sentry.init({
  dsn: "https://your-correct-dsn@sentry.io/your-project-id",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
    }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0, 
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, 
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
