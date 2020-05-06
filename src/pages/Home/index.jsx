import React, { useEffect, useState } from 'react';
import {
  Grid,
} from '@material-ui/core';

import { useAuth, useAsync } from "../../hooks";
import { getTransactions, createTransaction } from '../../api/transaction';
import { getUserNames } from '../../api/user';
import { Alert } from "../../ui";
import { Form, UserInfo, EnhancedTable } from "../../components";

import { useStyles } from './styles';

const tableHeadCells = [
  { id: 'sender', align: 'left', disablePadding: false, label: 'Sender' },
  { id: 'recipient', align: 'left', disablePadding: false, label: 'Recipient' },
  { id: 'count', align: 'center', disablePadding: false, label: 'Count' },
  { id: 'pw_count_resulted', align: 'center', disablePadding: false, label: 'Resulted Count' },
  { id: 'date', align: 'right', disablePadding: false, label: 'Date' },
];

export const Home = () => {
  const [alert, setAlert] = useState({open: false, type: '', message: ''});
  const [pwCount, setPwCount] = useState("");

  const { value: getTransactionsResponse, execute: getTransactionsAsync } = useAsync(getTransactions, true);
  const { value: userNames } = useAsync(getUserNames, true);
  const { value: createdTransactionData, execute: createTransactionAsync } = useAsync(createTransaction, false);

  const classes = useStyles();

  const auth = useAuth();

  useEffect( () => {
    const checkAuth = async () => {
      await auth.checkAuth();
    };
    const isNotSignOut = (auth.user !== false);

    (!auth.user && isNotSignOut) && checkAuth();

    auth.user && setPwCount(auth.user.pw_count);
  }, [auth.user]);

  useEffect( () => {
    if (createdTransactionData) {
      const { transaction: {pw_count_resulted} } = createdTransactionData

      setPwCount(pw_count_resulted);
      getTransactionsAsync({page: 1, perPage: 5})
    }
  },[createdTransactionData]);

  return (
    <>
      <Grid
        className={classes.container}
        container
        spacing={2}
        direction="row"
        justify="space-evenly">
        <Grid item xs={12} sm={6} md={6}>
          <UserInfo auth={auth} pwCount={pwCount} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Form
            handleSubmitRequest={createTransactionAsync}
            showAlert={setAlert}
            userList={userNames}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <EnhancedTable
            headCells={tableHeadCells}
            getDataRequest={(params) => getTransactionsAsync(params)}
            data={getTransactionsResponse}
          />
        </Grid>
      </Grid>
      <Alert alert={alert} setAlert={setAlert}/>
    </>
  );
};