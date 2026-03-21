import { useEffect, useState } from "react";

export type AppRoute = "/" | "/auth" | "/app";

const NAVIGATION_EVENT = "jobmind:navigate";

export function parseRoute(pathname: string): AppRoute {
  if (pathname.startsWith("/auth")) {
    return "/auth";
  }
  if (pathname.startsWith("/app")) {
    return "/app";
  }
  return "/";
}

export function buildUrl(pathname: string, search?: URLSearchParams | string): string {
  if (!search) {
    return pathname;
  }
  const query = typeof search === "string" ? search : search.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function navigate(to: string, options?: { replace?: boolean }) {
  const method = options?.replace ? "replaceState" : "pushState";
  window.history[method]({}, "", to);
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}

export function useAppRoute() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [search, setSearch] = useState(() => window.location.search);

  useEffect(() => {
    const sync = () => {
      setPathname(window.location.pathname);
      setSearch(window.location.search);
    };

    window.addEventListener("popstate", sync);
    window.addEventListener(NAVIGATION_EVENT, sync as EventListener);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(NAVIGATION_EVENT, sync as EventListener);
    };
  }, []);

  return {
    route: parseRoute(pathname),
    pathname,
    searchParams: new URLSearchParams(search),
    navigate,
  };
}

