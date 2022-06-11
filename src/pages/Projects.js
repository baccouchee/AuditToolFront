import {
  Button,
  Grid,
  Chip,
  Box,
  Breadcrumbs,
  Typography,
  Link,
  CardContent,
  Card,
  Divider,
  CardHeader,
  IconButton,
  CardActions,
  Avatar,
} from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DrawerPerm from '../Components/Drawer/DrawerPerm'

const Projects = () => {
  const btnstyle = { margin: '30px', width: '25vh', height: '6vh', backgroundColor: '#FFE600', color: '#1A1A24' }
  const btnstyle1 = { backgroundColor: '#1A1A24', color: 'white', margin: '3%' }

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <DrawerPerm>
      <Box
        sx={{
          padding: 1,
          margin: 1,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#">
            MUI
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
        <Box>
          <Grid container>
            <Grid item sm={4}>
              <Box display="flex" justifyContent="flex-start">
                <h1>La liste des projets </h1>
              </Box>
            </Grid>
            <Grid item sm={8}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  type="submit"
                  style={btnstyle}
                  startIcon={<AddIcon />}
                  onClick={handleClickOpen}
                >
                  Ajouter un client
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            padding: 2,
            margin: 2,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <Card sx={{ maxWidth: 345, borderRadius: '2px' }}>
            <CardHeader
              avatar={
                <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                  N
                </Avatar>
              }
              title="Card Header"
              subheader={<Chip label="Statut" color="primary" size="small" sx={{ marginTop: '3%' }} />}
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
            <Divider />

            <CardActions>
              <Box sx={{ flexGrow: 1 }} />
              <Button size="small" variant="contained" type="submit" style={btnstyle1}>
                Voir
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </DrawerPerm>
  )
}

export default Projects
