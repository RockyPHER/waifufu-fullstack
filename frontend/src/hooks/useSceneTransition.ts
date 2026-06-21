import { startTransition, useEffect, useRef, useState } from "react";
import { SCENE_TRANSITION_MS, type Scene } from "../features/app/scene";

export function useSceneTransition(initialScene: Scene) {
  const [activeScene, setActiveScene] = useState<Scene>(initialScene);
  const [renderedScenes, setRenderedScenes] = useState<Scene[]>([initialScene]);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const openScene = (nextScene: Scene) => {
    if (nextScene === activeScene) {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    const previousScene = activeScene;

    setRenderedScenes((currentScenes) =>
      currentScenes.includes(nextScene)
        ? currentScenes
        : [...currentScenes, nextScene],
    );

    startTransition(() => {
      setActiveScene(nextScene);
    });

    timeoutRef.current = window.setTimeout(() => {
      setRenderedScenes((currentScenes) =>
        currentScenes.filter((scene) => scene !== previousScene),
      );
    }, SCENE_TRANSITION_MS);
  };

  return {
    activeScene,
    renderedScenes,
    openScene,
  };
}
