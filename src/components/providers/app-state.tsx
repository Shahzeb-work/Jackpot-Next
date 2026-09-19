"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { SafeUser } from "@/lib/auth/current-user";

type AuthTab = "signin" | "signup";

export type CoinPackage = {
  coins: string;
  price: string;
  bonus: string;
};

type ModalState =
  | { type: "auth"; tab: AuthTab }
  | { type: "rewards" }
  | { type: "packages-list" }
  | { type: "packages-checkout"; pkg: CoinPackage }
  | { type: "spin" }
  | null;

type AppStateContextValue = {
  user: SafeUser | null;
  setUser: (user: SafeUser | null) => void;
  modal: ModalState;
  openSignIn: () => void;
  openSignUp: () => void;
  openRewards: () => void;
  openPackagesList: () => void;
  openPackagesCheckout: (pkg: CoinPackage) => void;
  openSpin: () => void;
  closeModal: () => void;
  setAuthTab: (tab: AuthTab) => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: SafeUser | null;
}) {
  const [user, setUser] = useState<SafeUser | null>(initialUser);
  const [modal, setModal] = useState<ModalState>(null);

  const openSignIn = useCallback(() => setModal({ type: "auth", tab: "signin" }), []);
  const openSignUp = useCallback(() => setModal({ type: "auth", tab: "signup" }), []);
  const openRewards = useCallback(() => setModal({ type: "rewards" }), []);
  const openPackagesList = useCallback(() => setModal({ type: "packages-list" }), []);
  const openPackagesCheckout = useCallback(
    (pkg: CoinPackage) => setModal({ type: "packages-checkout", pkg }),
    []
  );
  const openSpin = useCallback(() => setModal({ type: "spin" }), []);
  const closeModal = useCallback(() => setModal(null), []);
  const setAuthTab = useCallback((tab: AuthTab) => setModal({ type: "auth", tab }), []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      modal,
      openSignIn,
      openSignUp,
      openRewards,
      openPackagesList,
      openPackagesCheckout,
      openSpin,
      closeModal,
      setAuthTab,
    }),
    [
      user,
      modal,
      openSignIn,
      openSignUp,
      openRewards,
      openPackagesList,
      openPackagesCheckout,
      openSpin,
      closeModal,
      setAuthTab,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
