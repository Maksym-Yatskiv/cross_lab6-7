import React, { useState } from "react";
import { IonInput, IonItem, IonNote } from "@ionic/react";
import { IonInputCustomEvent, InputInputEventDetail } from "@ionic/core";

type Props = {
  label: string;
  value: string | number;
  type?: "text" | "number" | "email" | "password" | "tel";
  onChange: (v: string) => void;
  validators: ((value: any) => boolean)[]; // Changed to any to handle both string/number inputs
  errorText: string;
};

const ValidatedInput: React.FC<Props> = ({
  label,
  value,
  type = "text",
  onChange,
  validators,
  errorText,
}) => {
  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState<boolean | undefined>(undefined);

  const handleInput = (e: IonInputCustomEvent<InputInputEventDetail>) => {
    const val = e.detail.value ?? "";
    onChange(val.toString());

    const isValid = validators.every((v) => v(val));
    setValid(isValid);
  };

  const markTouched = () => {
    setTouched(true);
  };

  return (
    <IonItem 
      lines="none" 
      className={`${valid === true ? "ion-valid" : ""} ${
        valid === false ? "ion-invalid" : ""
      } ${touched ? "ion-touched" : ""}`}
    >
      <IonInput
        label={label}
        labelPlacement="floating"
        type={type}
        value={value}
        onIonInput={handleInput}
        onIonBlur={markTouched}
        errorText={errorText}
      />
      {valid === false && touched && (
        <IonNote slot="error">{errorText}</IonNote>
      )}
    </IonItem>
  );
};

export default ValidatedInput;