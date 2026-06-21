import { Check, ImageIcon, Save, X } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createWaifus, getWaifus, updateWaifus } from "../api/waifus/fetch";
import type { WaifuData } from "../api/waifus/model";
import { schema } from "../api/waifus/schema";
import {
  buildWaifuPayload,
  getAvailableDays,
  getInitialWaifuFormValues,
  getNextWaifuId,
  MONTHS,
  type WaifuFormValues,
  UNKNOWN_DAY,
  UNKNOWN_MONTH,
} from "../features/waifus/form";
import { getWaifuVisualStyle } from "../features/waifus/visual";

interface WaifuFormProps {
  mode: "create" | "edit";
  onClose: () => void;
  onSaved?: (waifu: WaifuData) => void;
  waifu?: WaifuData;
}

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function WaifuForm({
  mode,
  onClose,
  onSaved,
  waifu,
}: WaifuFormProps) {
  const isEditMode = mode === "edit";
  const [formValues, setFormValues] = useState<WaifuFormValues>(() =>
    getInitialWaifuFormValues(waifu),
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const closeTimeoutRef = useRef<number | undefined>(undefined);
  const maxDays = getAvailableDays(formValues.birthdayMonth);
  const previewWaifu = buildPreviewWaifu(formValues, waifu);
  const accentColorValue = isValidHexColor(formValues.accentColor)
    ? formValues.accentColor
    : "#39C5BB";

  useEffect(() => {
    setFormValues(getInitialWaifuFormValues(waifu));
    setValidationMessage("");
    setSaveStatus("idle");
  }, [waifu]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (formValues.birthdayMonth === UNKNOWN_MONTH) {
      if (formValues.birthdayDay !== UNKNOWN_DAY) {
        setFormValues((currentValues) => ({
          ...currentValues,
          birthdayDay: UNKNOWN_DAY,
        }));
      }
      return;
    }

    if (Number(formValues.birthdayDay) > maxDays) {
      setFormValues((currentValues) => ({
        ...currentValues,
        birthdayDay: String(maxDays),
      }));
    }
  }, [formValues.birthdayDay, formValues.birthdayMonth, maxDays]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveStatus("saving");
    setValidationMessage("");

    if (isEditMode && !waifu) {
      setSaveStatus("error");
      setValidationMessage("Waifu ID not found.");
      return;
    }

    const waifuPayload = buildWaifuPayload(formValues, {
      id: isEditMode && waifu ? waifu.id : getNextWaifuId(getWaifus()),
      favorite: waifu?.favorite,
    });
    const { error } = schema.validate(waifuPayload, {
      abortEarly: false,
      convert: false,
    });

    if (error) {
      setSaveStatus("error");
      setValidationMessage(
        error.details[0]?.message ?? "Please check your input.",
      );
      return;
    }

    try {
      if (isEditMode) {
        updateWaifus([waifuPayload]);
      } else {
        createWaifus([waifuPayload]);
      }

      setSaveStatus("success");
      onSaved?.(waifuPayload);
      closeTimeoutRef.current = window.setTimeout(onClose, 520);
    } catch {
      setSaveStatus("error");
      setValidationMessage("The profile could not be saved.");
    }
  }

  function handleBirthdayOption(event: ChangeEvent<HTMLSelectElement>) {
    const month = event.target.value;

    setFormValues((currentValues) => ({
      ...currentValues,
      birthdayMonth: month,
      birthdayDay:
        month === UNKNOWN_MONTH
          ? UNKNOWN_DAY
          : currentValues.birthdayDay === UNKNOWN_DAY
            ? "1"
            : currentValues.birthdayDay,
    }));
  }

  function handleFieldChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  return (
    <aside className="form-drawer" style={getWaifuVisualStyle(previewWaifu)}>
      <div className="form-drawer__preview">
        {formValues.backgroundUrl ? (
          <img
            alt={`${formValues.name || "Waifu"} preview`}
            className="form-drawer__background"
            decoding="async"
            loading="eager"
            src={formValues.backgroundUrl}
          />
        ) : (
          <div className="form-drawer__empty-preview">
            <ImageIcon aria-hidden="true" />
            <span>Background preview</span>
          </div>
        )}
        <div className="form-drawer__preview-shade" />
        <div className="form-drawer__preview-copy">
          <span className="eyebrow">
            <span aria-hidden="true" />
            {formValues.origin || "Origin"}
          </span>
          <h2>{formValues.name || "New profile"}</h2>
        </div>
      </div>

      <div className="form-drawer__body">
        <div className="form-drawer__header">
          <div>
            <span className="eyebrow">
              <span aria-hidden="true" />
              {isEditMode ? "Edit entry" : "New entry"}
            </span>
            <h1 id="waifu-form-title">
              {isEditMode ? "Edit Waifu" : "Add Waifu"}
            </h1>
          </div>
          <button
            aria-label="Close form"
            className="icon-button"
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <form className="character-form" onSubmit={handleSubmit}>
          <Fieldset title="Identity">
            <Field label="Name" htmlFor="name" required>
              <input
                id="name"
                name="name"
                required
                type="text"
                value={formValues.name}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Origin" htmlFor="origin">
              <input
                id="origin"
                name="origin"
                type="text"
                value={formValues.origin}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Origin URL" htmlFor="origin-url">
              <input
                id="origin-url"
                name="originUrl"
                type="url"
                value={formValues.originUrl}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Description" htmlFor="description" wide>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formValues.description}
                onChange={handleFieldChange}
              />
            </Field>
          </Fieldset>

          <Fieldset title="Characteristics">
            <Field label="Age" htmlFor="age">
              <input
                id="age"
                min={0}
                name="age"
                type="number"
                value={formValues.age}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Birthday" htmlFor="birth-month">
              <div className="birthday-grid">
                <select
                  id="birth-month"
                  name="birthdayMonth"
                  value={formValues.birthdayMonth}
                  onChange={handleBirthdayOption}
                >
                  <option value={UNKNOWN_MONTH}>{UNKNOWN_MONTH}</option>
                  {MONTHS.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  id="birth-day"
                  name="birthdayDay"
                  value={formValues.birthdayDay}
                  onChange={handleFieldChange}
                >
                  <option value={UNKNOWN_DAY}>{UNKNOWN_DAY}</option>
                  {Array.from({ length: maxDays }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </Field>
            <Field label="Height" htmlFor="height">
              <input
                id="height"
                min={0}
                name="height"
                type="number"
                value={formValues.height}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Weight" htmlFor="weight">
              <input
                id="weight"
                min={0}
                name="weight"
                type="number"
                value={formValues.weight}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Hair color" htmlFor="hairColor">
              <input
                id="hairColor"
                name="hairColor"
                type="text"
                value={formValues.hairColor}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Eye color" htmlFor="eyeColor">
              <input
                id="eyeColor"
                name="eyeColor"
                type="text"
                value={formValues.eyeColor}
                onChange={handleFieldChange}
              />
            </Field>
          </Fieldset>

          <Fieldset title="Images and presentation">
            <Field label="Wallpaper path or URL" htmlFor="backgroundUrl" wide>
              <input
                id="backgroundUrl"
                name="backgroundUrl"
                placeholder="/Hatsune Miku.png"
                type="text"
                value={formValues.backgroundUrl}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Accent color" htmlFor="accentColor">
              <div className="color-field">
                <input
                  aria-label="Accent color swatch"
                  name="accentColor"
                  type="color"
                  value={accentColorValue}
                  onChange={handleFieldChange}
                />
                <input
                  id="accentColor"
                  name="accentColor"
                  type="text"
                  value={formValues.accentColor}
                  onChange={handleFieldChange}
                />
              </div>
            </Field>
            <Field label="Focal point" htmlFor="focalPoint">
              <input
                id="focalPoint"
                name="focalPoint"
                type="text"
                value={formValues.focalPoint}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Zoom" htmlFor="zoom">
              <input
                id="zoom"
                max={1.8}
                min={0.8}
                name="zoom"
                step={0.01}
                type="number"
                value={formValues.zoom}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Overlay" htmlFor="overlayStrength">
              <input
                id="overlayStrength"
                max={0.85}
                min={0.25}
                name="overlayStrength"
                step={0.01}
                type="number"
                value={formValues.overlayStrength}
                onChange={handleFieldChange}
              />
            </Field>
          </Fieldset>

          {validationMessage ? (
            <p className="form-message form-message--error" role="alert">
              {validationMessage}
            </p>
          ) : null}
          {saveStatus === "success" ? (
            <p className="form-message form-message--success" role="status">
              <Check aria-hidden="true" />
              Profile saved.
            </p>
          ) : null}

          <div className="form-drawer__footer">
            <button
              className="btn btn--secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn--primary"
              disabled={saveStatus === "saving"}
              type="submit"
            >
              <Save aria-hidden="true" />
              {saveStatus === "saving" ? "Saving" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
}

interface FieldsetProps {
  title: string;
  children: ReactNode;
}

function Fieldset({ title, children }: FieldsetProps) {
  return (
    <fieldset className="form-section">
      <legend>{title}</legend>
      <div className="form-section__grid">{children}</div>
    </fieldset>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  wide?: boolean;
}

function Field({ label, htmlFor, children, required, wide }: FieldProps) {
  return (
    <div className={wide ? "form-field form-field--wide" : "form-field"}>
      <label htmlFor={htmlFor}>
        {label}
        {required ? <span aria-label="required">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function isValidHexColor(value: string) {
  return /^#([0-9A-Fa-f]{6})$/.test(value);
}

function buildPreviewWaifu(
  formValues: WaifuFormValues,
  fallbackWaifu?: WaifuData,
): WaifuData {
  return {
    id: fallbackWaifu?.id ?? 0,
    name: formValues.name || "New profile",
    origin: formValues.origin,
    backgroundUrl: formValues.backgroundUrl,
    visual: {
      accentColor: formValues.accentColor,
      focalPoint: formValues.focalPoint,
      zoom: Number(formValues.zoom) || 1,
      overlayStrength: Number(formValues.overlayStrength) || 0.55,
    },
  };
}
