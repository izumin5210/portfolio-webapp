import { styled } from "@linaria/react";
import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";

export function RoutingProgress() {
  const [progress, setProgress] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setProgress(0);
    };
    const handleStop = () => {
      setProgress(1);
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
        setProgress(undefined);
      } else {
        let inc: number;

        if (progress >= 0 && progress < 0.2) inc = 0.1;
        else if (progress >= 0.2 && progress < 0.5) inc = 0.04;
        else if (progress >= 0.5 && progress < 0.8) inc = 0.02;
        else if (progress >= 0.8 && progress < 0.99) inc = 0.005;
        else inc = 0;

        setProgress(progress + Math.min(inc, 0.994));
      }
    }, 200);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [progress]);

  return (
    <Progress
      style={
        { "--progress": `${(-1 + (progress ?? 0)) * 100}%`, "--opacity": progress != null ? 1 : 0 } as CSSProperties
      }
    />
  );
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
