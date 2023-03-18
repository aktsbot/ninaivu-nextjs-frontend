import { useState, createContext, FC, ReactNode } from "react";

import { AlertColor } from "@mui/material";
import { makeAlertObj } from "@/utils";

interface IAlertNoId {
  type: AlertColor;
  message: string;
}

type IAlert = {
  id: string;
} & IAlertNoId;

interface IAppContextProps {
  alerts: IAlert[];
  addAlert: (alert: IAlertNoId) => void;
  removeAlert: (id: string) => void;
}

export const AppContext = createContext<IAppContextProps>({
  alerts: [],
  addAlert: () => {},
  removeAlert: () => {},
});

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  const addAlert = (alert: IAlertNoId) => {
    setAlerts((prev) => [
      ...prev,
      {
        ...makeAlertObj({ type: alert.type, message: alert.message }),
      },
    ]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      return filtered;
    });
  };

  return (
    <AppContext.Provider
      value={{
        alerts,
        addAlert,
        removeAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
