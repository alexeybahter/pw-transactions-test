import React, { useState} from "react";
import {useDispatch} from "react-redux";
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';

import {useStyles} from './styles';

export const Form = ({ addItem, showAlert }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState('');

  const dispatch = useDispatch();

  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(addItem({ name, description, action}));

    setName('');
    setDescription('');
    setAction('');

    showAlert({type: 'success', message: 'Item created!'})
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              fullWidth
              value={name}
              onInput={e=>setName(e.target.value)}
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="action"
              name="action"
              label="Action"
              value={action}
              onChange={e=>setAction(e.target.value)}
              fullWidth
              autoComplete="action"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              value={description}
              onInput={e=>setDescription(e.target.value)}
              fullWidth
              autoComplete="description"
            />
          </Grid>
          <Grid container item justify="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}>
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
};
