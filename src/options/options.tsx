import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import 'fontsource-roboto'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Switch,
} from '@mui/material'

import './options.css'
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from '../utils/storage'

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>('ready')

  const isFieldDisabled = formState === 'saving'

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    })
  }

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    })
  }

  const handleSaveButtonClick = () => {
    setFormState('saving')
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('ready')
      }, 1000)
    })
  }

  if (!options) {
    return null
  }

  return (
    <Box mx={'15%'} my={'5%'}>
      <Card>
        <CardContent>
          <Grid container display={'flex'} flexDirection={'column'} spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city name"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                variant="standard"
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Overlay widget on a web page
              </Typography>
              <Switch
                color="primary"
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleAutoOverlayChange(checked)}
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldDisabled}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
