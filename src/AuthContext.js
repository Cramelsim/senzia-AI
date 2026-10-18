import { createContext, useContext } from 'react';

// Shared auth state so every page's AppShell can show the signed-in user and log out
// without each route having to thread `user` / `onLogout` props through.
export const AuthContext = createContext({ user: null, onLogout: null });

export const useAuth = () => useContext(AuthContext);
