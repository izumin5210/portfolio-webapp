import { styled } from "@linaria/react";
import { useRouter } from "next/router";
import { CSSProperties, useCallback, useEffect, useReducer } from "react";

export function RoutingProgress({ speed = 200 }: { speed?: number }) {
  const { progress, start, done } = useProgress({ speed });
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [done, router, start]);

  return (
    <Progress
      style={
        {
          "--translateX": `${(-1 + (progress ?? 0)) * 100}%`,
          "--opacity": progress != null ? 1 : 0,
          "--transitionSpeed": `${speed}ms`,
          "--trackTransition": progress === 0 ? "none" : `all var(--transitionSpeed) linear`,
        } as CSSProperties
      }
    />
  );
}

function useProgress({ speed }: { speed: number }) {
  const [{ progress }, dispatch] = useReducer(progressReducer, { progress: undefined });

  useEffect(() => {
    if (progress == null) return;

    const timeoutID = setTimeout(() => {
      if (progress === 1) {
        dispatch("reset");
      } else {
        dispatch("increment");
      }
    }, speed);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [progress, speed]);

  const start = useCallback(() => {
    dispatch("start");
  }, [dispatch]);
  const done = useCallback(() => {
    dispatch("done");
  }, [dispatch]);

  return {
    progress,
    start,
    done,
  };
}

function progressReducer(state: { progress: number | undefined }, action: "start" | "increment" | "done" | "reset") {
  switch (action) {
    case "start": {
      return { ...state, progress: 0 };
    }
    case "increment": {
      const n = state.progress ?? 0;
      let inc: number;

      // Parameters are copied from nprogresss@v1.0.0-1
      // https://github.com/rstacruz/nprogress/blob/v1.0.0-1/src/nprogress.js#L158-L168
      if (n >= 0 && n < 0.2) inc = 0.1;
      else if (n >= 0.2 && n < 0.5) inc = 0.04;
      else if (n >= 0.5 && n < 0.8) inc = 0.02;
      else if (n >= 0.8 && n < 0.99) inc = 0.005;
      else inc = 0;

      return { ...state, progress: Math.min(n + inc, 0.994) };
    }
    case "done": {
      return { ...state, progress: 1 };
    }
    case "reset": {
      return { ...state, progress: undefined };
    }
    default: {
      const _exhaustiveCheck: never = action;
      throw new Error("unreachable");
    }
  }
}

const Progress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--primary);
  opacity: var(--opacity);
  transition: var(--trackTransition);

  &::after {
    display: block;
    content: " ";
    height: 100%;
    width: 100%;
    transform: translate3d(var(--translateX), 0, 0);
    background-color: var(--textLink);
    transition: all var(--transitionSpeed) linear;
  }
`;
