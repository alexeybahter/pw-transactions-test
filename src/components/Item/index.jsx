import React from "react";
import {useDispatch} from "react-redux";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';

import {useStyles} from './styles';

export const Item = ({item: {action, name, description}, index, deleteItem}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {action}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" onClick={() => dispatch(deleteItem(index))}>Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  )
};
