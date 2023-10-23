import { Subscription, UserDetails } from "@/types";
import { User, useSessionContext } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser as useSupaUser } from "@supabase/auth-helpers-react";
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  //*Get the user's session information and details.
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  //*Get the user object.
  const user = useSupaUser();

  //*Get the user's access token.
  const accessToken = session?.access_token ?? null;

  //*Define state variables to store user details and subscription status.
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  //*Define functions to fetch user details and subscription status from the database.
  const getUserDetails = () => supabase.from("user").select("*").single();
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*,prices(*,products(*))")
      .in("status", ["trailing", "active"])
      .single();

  //*Define an effect that runs when the component mounts.
  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled")
            setUserDetails(userDetailsPromise.value.data as UserDetails);

          if (subscriptionPromise.status === "fulfilled")
            setSubscription(subscriptionPromise.value.data as Subscription);

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingData && !isLoadingUser) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  //*The following object contains all the user context data.
  //*This object is returned by the component and can be used in other parts of the application to provide user context to other components.
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }

  return context;
};
