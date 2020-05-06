import React, { useState } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Paper,
  Typography
} from '@material-ui/core';

import { Autocomplete, InputNumber } from '../../ui';

import { useStyles } from './styles';

export const Form = ({ handleSubmitRequest, showAlert, userList }) => {
  const [clientName, setClientName] = useState(null);
  const [quantity, setQuantity] = useState({number: '',});

  const classes = useStyles();

  const onSubmit = async (event) => {
    event.preventDefault();

    const {data: { transaction, errors }} = await handleSubmitRequest({recipient_id: clientName.id, quantity: Number(quantity.number)})

    if (transaction) {
      setClientName({name: ''});
      setQuantity({number: ''});

      showAlert( (alert) => ({...alert, type: 'success', message: "Transaction created!", open: true}));
    }

    errors && showAlert( (alert) => ({...alert, type: 'error', message: errors[0].msg, open: true}));
  };

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} component="h1" variant="h4" align="center">
            Create Transaction
          </Typography>
          {userList === null ?
            <CircularProgress className={classes.center}/>
            :
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    value={clientName}
                    setValue={setClientName}
                    options={userList.users}
                    keyName="name"
                    label={"Client Name"}
                    id="client-name-options"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputNumber
                    label="Quantity"
                    value={quantity}
                    setValue={setQuantity}
                    name="number"
                    variant="outlined"
                    id="formatted-quantity-input"
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
          }
        </Paper>
      </main>
    </>
  )
};
