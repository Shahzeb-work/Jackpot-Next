"use client";

import { useEffect } from "react";
import { bootIntercom } from "@/lib/intercom";
import { useAppState } from "./providers/app-state";

export default function IntercomWidget() {
  const { user } = useAppState();

  useEffect(() => {
    bootIntercom(user);
  }, [user]);

  return null;
}
