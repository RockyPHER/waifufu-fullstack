export type ThemeMode = "dark" | "light";

export const DESIGN_TOKENS = {
  background: "#060A16",
  surface: "#0C1224",
  surfaceElevated: "#121A30",
  border: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#F6F7FB",
  textSecondary: "rgba(246, 247, 251, 0.62)",
  accent: "#8B5CF6",
  cyan: "#2DD4BF",
  danger: "#EF6464",
  success: "#52D273",
  radius: {
    card: "8px",
    panel: "12px",
    pill: "999px",
  },
  shadow: {
    soft: "0 18px 60px rgba(0, 0, 0, 0.28)",
    elevated: "0 28px 90px rgba(0, 0, 0, 0.42)",
  },
  blur: "18px",
  spacing: {
    shell: "clamp(1rem, 3vw, 2.5rem)",
  },
  transition: "180ms ease",
} as const;

export interface ColorScheme {
  primary: string;
  primarySoft: string;
  background: string;
  backgroundHover: string;
  backgroundActive: string;
  surface: string;
  surfaceSoft: string;
  surfaceStrong: string;
  accent: string;
  accentSoft: string;
  accentAlt: string;
  panel: string;
  panelStrong: string;
  border: string;
  shadow: string;
}

export const COLOR_SCHEMES: Record<ThemeMode, ColorScheme> = {
  dark: {
    primary: DESIGN_TOKENS.textPrimary,
    primarySoft: DESIGN_TOKENS.textSecondary,
    background: DESIGN_TOKENS.background,
    backgroundHover: "rgba(139, 92, 246, 0.16)",
    backgroundActive: "rgba(45, 212, 191, 0.14)",
    surface: "rgba(12, 18, 36, 0.72)",
    surfaceSoft: "rgba(255, 255, 255, 0.05)",
    surfaceStrong: "rgba(18, 26, 48, 0.86)",
    accent: DESIGN_TOKENS.accent,
    accentSoft: "rgba(45, 212, 191, 0.20)",
    accentAlt: "rgba(139, 92, 246, 0.28)",
    panel: "rgba(12, 18, 36, 0.58)",
    panelStrong: "rgba(8, 13, 28, 0.84)",
    border: DESIGN_TOKENS.border,
    shadow: "rgba(0, 0, 0, 0.42)",
  },
  light: {
    primary: "#FCFBFF",
    primarySoft: "rgba(252, 251, 255, 0.68)",
    background: "#08101F",
    backgroundHover: "rgba(45, 212, 191, 0.14)",
    backgroundActive: "rgba(139, 92, 246, 0.18)",
    surface: "rgba(16, 28, 50, 0.74)",
    surfaceSoft: "rgba(255, 255, 255, 0.06)",
    surfaceStrong: "rgba(20, 34, 60, 0.9)",
    accent: "#2DD4BF",
    accentSoft: "rgba(139, 92, 246, 0.22)",
    accentAlt: "rgba(45, 212, 191, 0.24)",
    panel: "rgba(12, 22, 42, 0.62)",
    panelStrong: "rgba(10, 19, 36, 0.86)",
    border: "rgba(255, 255, 255, 0.10)",
    shadow: "rgba(0, 0, 0, 0.36)",
  },
};

export function applyColorScheme(root: HTMLElement, colorScheme: ColorScheme) {
  root.style.setProperty("--ds-background", DESIGN_TOKENS.background);
  root.style.setProperty("--ds-surface", DESIGN_TOKENS.surface);
  root.style.setProperty(
    "--ds-surface-elevated",
    DESIGN_TOKENS.surfaceElevated,
  );
  root.style.setProperty("--ds-border", DESIGN_TOKENS.border);
  root.style.setProperty("--ds-text-primary", DESIGN_TOKENS.textPrimary);
  root.style.setProperty("--ds-text-secondary", DESIGN_TOKENS.textSecondary);
  root.style.setProperty("--ds-accent", DESIGN_TOKENS.accent);
  root.style.setProperty("--ds-cyan", DESIGN_TOKENS.cyan);
  root.style.setProperty("--ds-danger", DESIGN_TOKENS.danger);
  root.style.setProperty("--ds-success", DESIGN_TOKENS.success);
  root.style.setProperty("--ds-radius-card", DESIGN_TOKENS.radius.card);
  root.style.setProperty("--ds-radius-panel", DESIGN_TOKENS.radius.panel);
  root.style.setProperty("--ds-radius-pill", DESIGN_TOKENS.radius.pill);
  root.style.setProperty("--ds-shadow-soft", DESIGN_TOKENS.shadow.soft);
  root.style.setProperty("--ds-shadow-elevated", DESIGN_TOKENS.shadow.elevated);
  root.style.setProperty("--ds-blur", DESIGN_TOKENS.blur);
  root.style.setProperty("--ds-shell-spacing", DESIGN_TOKENS.spacing.shell);
  root.style.setProperty("--ds-transition", DESIGN_TOKENS.transition);
  root.style.setProperty("--primary-color", colorScheme.primary);
  root.style.setProperty("--primary-color-1", colorScheme.primarySoft);
  root.style.setProperty("--surface-color", colorScheme.surface);
  root.style.setProperty("--surface-color-1", colorScheme.surfaceSoft);
  root.style.setProperty("--surface-color-2", colorScheme.surfaceStrong);
  root.style.setProperty(
    "--background-color-hover",
    colorScheme.backgroundHover,
  );
  root.style.setProperty(
    "--background-color-active",
    colorScheme.backgroundActive,
  );
  root.style.setProperty("--background-color", colorScheme.background);
  root.style.setProperty("--accent-color", colorScheme.accent);
  root.style.setProperty("--accent-color-soft", colorScheme.accentSoft);
  root.style.setProperty("--accent-color-alt", colorScheme.accentAlt);
  root.style.setProperty("--panel-color", colorScheme.panel);
  root.style.setProperty("--panel-strong-color", colorScheme.panelStrong);
  root.style.setProperty("--border-color", colorScheme.border);
  root.style.setProperty("--shadow-color", colorScheme.shadow);
}
