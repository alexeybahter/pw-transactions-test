import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// //
import config from '../config';
// // import store from '../store';
// // import { updateSpinnerStatus } from './../store/global/actions';
// // import {useDispatch} from "react-redux";
// //
// // const getDefaultHeaders = () => ({
// // //   // set token for JWT here. Example: Authorization: `Bearer ${localStorage.getItem('accessToken')}`
// // });
// //
// // // const dispatch = useDispatch();
// //
// // export default async ({
// //                         method = 'GET',
// //                         baseUrl = config.serverAddress,
// //                         url = '',
// //                         params = {},
// //                         headers = {},
// //                         data = {},
// //                         spinner = false
// //                       }) => {
// //   try {
// //     if (spinner) {
// //       store.dispatch(updateSpinnerStatus(true));
// //     }
// //     console.log(config.serverAddress, {spinner})
// //     console.log(`${baseUrl}${url}`)
// //     const { data: res } = await axios({
// //       method,
// //       url: `${baseUrl}${url}`,
// //       params,
// //       headers: {
// //         ...getDefaultHeaders(),
// //         ...headers
// //       },
// //       data
// //     });
// //     console.log('res', res)
// //     return res;
// //   } catch (err) {
// //     throw (err);
// //   } finally {
// //     if (spinner) {
// //       store.dispatch(updateSpinnerStatus(false));
// //     }
// //   }
// // };
// //
// // // export const useApi = (
// // //   // {
// // //                       initialRequest,
// // //                      //  initialRequestInfo: {
// // //                      //    method,
// // //                      //    url,
// // //                      //    headers
// // //                      //  }
// // //                      // },
// // //   // ,
// // //                     initialData) => {
// // //   console.log('initialRequest', initialRequest)
// // //   const [url, setUrl] = useState(initialRequest);
// // //   const [data, setData] = useState(initialData);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [isError, setIsError] = useState(false);
// // //
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       setIsError(false);
// // //       setIsLoading(true);
// // //       try {
// // //         console.log('-- -- -- -- -- -- -- -- -- -- -- -- --REQUEST--')
// // //         const result = await axios(`${config.serverAddress}${url}`);
// // //
// // //         setData(result.data);
// // //       } catch (error) {
// // //         setIsError(true);
// // //       }
// // //       setIsLoading(false);
// // //     };
// // //     fetchData();
// // //   }, [url]);
// // //   return [{ data, isLoading, isError }, setUrl];
// // // };

export const useAsync = (asyncFunction, immediate = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    // console.log('asyncFunction', asyncFunction())
    return asyncFunction()
      .then(response => setValue(response.data))
      .catch(error => setError(error))
      .finally(() => setPending(false));
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, value, error };
};