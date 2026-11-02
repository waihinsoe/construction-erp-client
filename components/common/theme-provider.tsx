"use client";

import { useSyncExternalStore, type ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeProvider(
  { scriptProps, ...props }: ComponentProps<typeof NextThemesProvider>,
) {
  const isClientRender = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return (
    <NextThemesProvider
      {...props}
      scriptProps={{
        ...scriptProps,
        // Run the no-flash script in server HTML only. On client mounts,
        // next-themes applies the theme through its effects instead.
        type: isClientRender ? "application/json" : scriptProps?.type,
      }}
    />
  );
}
