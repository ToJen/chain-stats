import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import AssignmentIcon from '@material-ui/icons/Assignment'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemText primary="Speed" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Gas Prices" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Success/Fail Rate" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Function Ranks" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
)

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
)
