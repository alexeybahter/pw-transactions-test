import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "./useRouter";

export function useRequireAuth(redirectUrl = '/sign-in'){
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem('access_token')

    if (localStorage.getItem('access_token')) {
      if(router.pathname === '/sign-in' || router.pathname === '/sign-up') {
        router.push('/');
      }
    }
    if (
      !localStorage.getItem('access_token') &&
      !(router.pathname === '/sign-in' ||
        router.pathname === '/sign-up')
    ) {
      router.push(redirectUrl);
    }
  }, [auth, router]);

  return auth;
}