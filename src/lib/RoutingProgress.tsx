import { styled } from "@linaria/react";
import { useRouter } from "next/router";
import { CSSProperties, useEffect, useReducer } from "react";

export function RoutingProgress() {
  const [{ progress }, dispatch] = useReducer(progressReducer, { progress: undefined });
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      dispatch("start");
    };
    const handleStop = () => {
      dispatch("done");
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  useEffect(() => {
    if (progress == null) return;

    const timeoutID = setTimeout(() => {
      if (progress === 1) {
        dispatch("reset");
      } else {
        dispatch("increment");
      }
    }, 200);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [progress]);

  return (
    <Progress
      style={
        {
          "--progress": `${(-1 + (progress ?? 0)) * 100}%`,
          "--opacity": progress != null ? 1 : 0,
        } as CSSProperties
      }
    />
  );
}

function progressReducer(state: { progress: number | undefined }, action: "start" | "increment" | "done" | "reset") {
  switch (action) {
    case "start": {
      return { ...state, progress: 0 };
    }
    case "increment": {
      const n = state.progress ?? 0;
      let inc: number;

      if (n >= 0 && n < 0.2) inc = 0.1;
      else if (n >= 0.2 && n < 0.5) inc = 0.04;
      else if (n >= 0.5 && n < 0.8) inc = 0.02;
      else if (n >= 0.8 && n < 0.99) inc = 0.005;
      else inc = 0;

      return { ...state, progress: n + Math.min(inc, 0.994) };
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
  transition: all 200ms linear;

  &::after {
    display: block;
    content: " ";
    height: 100%;
    width: 100%;
    transform: translate3d(var(--progress), 0, 0);
    background-color: var(--textLink);
    transition: all 200ms linear;
  }
`;
