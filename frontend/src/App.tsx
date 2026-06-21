import { useEffect, useMemo, useState } from "react";
import {
  deleteWaifus,
  getWaifus,
  resetWaifus,
  updateWaifus,
} from "./api/waifus/fetch";
import type { WaifuData } from "./api/waifus/model";
import AppHeader from "./components/app/AppHeader";
import Backdrop from "./components/backdrop";
import ConfirmDialog from "./components/ui/ConfirmDialog";
import WaifuForm from "./components/waifuForm";
import type { Scene } from "./features/app/scene";
import {
  applyColorScheme,
  COLOR_SCHEMES,
} from "./features/theme/colors";
import { useSceneTransition } from "./hooks/useSceneTransition";
import Home from "./pages/home";
import WaifuList from "./pages/waifuList";

type FormState =
  | {
      mode: "create";
      waifu?: undefined;
    }
  | {
      mode: "edit";
      waifu: WaifuData;
    };

export default function App() {
  const [waifus, setWaifus] = useState<WaifuData[]>(() => getWaifus());
  const [activeWaifuId, setActiveWaifuId] = useState<number | undefined>(
    () => waifus[0]?.id,
  );
  const [formState, setFormState] = useState<FormState | null>(null);
  const [waifuPendingDelete, setWaifuPendingDelete] =
    useState<WaifuData | null>(null);
  const { activeScene, renderedScenes, openScene } =
    useSceneTransition(getInitialScene());
  const colorScheme = COLOR_SCHEMES["dark"];

  const activeIndex = useMemo(() => {
    const index = waifus.findIndex((waifu) => waifu.id === activeWaifuId);
    return index >= 0 ? index : 0;
  }, [activeWaifuId, waifus]);
  const activeWaifu = waifus[activeIndex];

  useEffect(() => {
    applyColorScheme(document.documentElement, colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    window.history.replaceState(
      null,
      "",
      activeScene === "list" ? "#waifulist" : "#home",
    );
  }, [activeScene]);

  useEffect(() => {
    if (!activeWaifu && waifus[0]) {
      setActiveWaifuId(waifus[0].id);
    }
  }, [activeWaifu, waifus]);

  function refreshWaifus(preferredWaifuId?: number) {
    const nextWaifus = getWaifus();
    const preferredWaifu = nextWaifus.find(
      (waifu) => waifu.id === preferredWaifuId,
    );
    const currentWaifu = nextWaifus.find((waifu) => waifu.id === activeWaifuId);

    setWaifus(nextWaifus);
    setActiveWaifuId(
      preferredWaifu?.id ?? currentWaifu?.id ?? nextWaifus[0]?.id,
    );
  }

  function navigateToScene(scene: Scene) {
    openScene(scene);
  }

  function handleSelectWaifu(waifu: WaifuData) {
    setActiveWaifuId(waifu.id);
    openScene("home");
  }

  function handlePrevious() {
    if (waifus.length <= 1) {
      return;
    }

    const previousIndex = (activeIndex - 1 + waifus.length) % waifus.length;
    setActiveWaifuId(waifus[previousIndex].id);
  }

  function handleNext() {
    if (waifus.length <= 1) {
      return;
    }

    const nextIndex = (activeIndex + 1) % waifus.length;
    setActiveWaifuId(waifus[nextIndex].id);
  }

  function handleToggleFavorite(waifu: WaifuData) {
    updateWaifus([{ ...waifu, favorite: !waifu.favorite }]);
    refreshWaifus(waifu.id);
  }

  function handleDeleteConfirmed() {
    if (!waifuPendingDelete) {
      return;
    }

    deleteWaifus([waifuPendingDelete.id]);
    setWaifuPendingDelete(null);
    refreshWaifus();
  }

  function handleResetWaifus() {
    const nextWaifus = resetWaifus();
    setWaifus(nextWaifus);
    setActiveWaifuId(nextWaifus[0]?.id);
  }

  return (
    <main className="app-shell">
      <AppHeader
        activeScene={activeScene}
        onNavigate={navigateToScene}
      />

      <div className="scene-stack">
        {renderedScenes.includes("home") ? (
          <div
            className="scene-layer"
            aria-hidden={activeScene !== "home"}
            data-active={activeScene === "home"}
          >
            <Home
              waifus={waifus}
              activeWaifu={activeWaifu}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSelectWaifu={handleSelectWaifu}
              onAddWaifu={() => setFormState({ mode: "create" })}
              onEditWaifu={(waifu) => setFormState({ mode: "edit", waifu })}
              onDeleteWaifu={setWaifuPendingDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        ) : null}

        {renderedScenes.includes("list") ? (
          <div
            className="scene-layer scene-layer--scroll"
            aria-hidden={activeScene !== "list"}
            data-active={activeScene === "list"}
          >
            <WaifuList
              waifus={waifus}
              onOpenWaifu={handleSelectWaifu}
              onAddWaifu={() => setFormState({ mode: "create" })}
              onEditWaifu={(waifu) => setFormState({ mode: "edit", waifu })}
              onDeleteWaifu={setWaifuPendingDelete}
              onToggleFavorite={handleToggleFavorite}
              onResetWaifus={handleResetWaifus}
            />
          </div>
        ) : null}
      </div>

      <Backdrop
        isOpen={formState !== null}
        onClose={() => setFormState(null)}
        placement="center"
        labelledBy="waifu-form-title"
      >
        {formState ? (
          <WaifuForm
            mode={formState.mode}
            waifu={formState.waifu}
            onClose={() => setFormState(null)}
            onSaved={(waifu) => refreshWaifus(waifu.id)}
          />
        ) : null}
      </Backdrop>

      <ConfirmDialog
        isOpen={waifuPendingDelete !== null}
        title={`Delete ${waifuPendingDelete?.name ?? "waifu"}?`}
        description="This removes the profile from local storage. You can restore the default archive from WaifuList if needed."
        confirmLabel="Delete profile"
        onCancel={() => setWaifuPendingDelete(null)}
        onConfirm={handleDeleteConfirmed}
      />
    </main>
  );
}

function getInitialScene(): Scene {
  return window.location.hash === "#waifulist" ||
    window.location.hash === "#list"
    ? "list"
    : "home";
}
