import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonList,
} from "@ionic/react";
import { fitnessOutline, saveOutline } from "ionicons/icons";
import { ITrainingBase, IPersonalTraining, IGroupTraining, IMembership, IOnlineTraining } from "../interfaces/ITraining";
import { TrainingFactory } from "../models/TrainingFactory";
//import { TrainingService } from "../services/TrainingService";
import { FieldValidator } from "../services/FieldValidator";
import ValidatedInput from "./ValidatedInput";

type TrainingType = "personal" | "group" | "online" | "membership";

type Props = {
  training?: ITrainingBase | null;
  onSuccess: (savedTraining: ITrainingBase, isEdit: boolean) => void;
  onCancel: () => void;
};

const TrainingForm: React.FC<Props> = ({ training, onSuccess, onCancel }) => {
  const isEdit = Boolean(training);

  const [type, setType] = useState<TrainingType>("personal");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [schedule, setSchedule] = useState<string>("");

  // Type-specific Fields
  const [trainerName, setTrainerName] = useState<string>("");
  const [groupSize, setGroupSize] = useState<number>(0);
  const [platform, setPlatform] = useState<string>("");
  const [durationMonths, setDurationMonths] = useState<number>(0);

  useEffect(() => {
    if (!training) return;

    setTitle(training.title);
    setPrice(training.price);
    setDurationMinutes(training.durationMinutes);
    setLevel(training.level);
    setSchedule(training.schedule);

    if ("trainerName" in training) {
      setTrainerName((training as IPersonalTraining).trainerName);
      setType("personal");
    } else if ("groupSize" in training) {
      setGroupSize((training as IGroupTraining).groupSize);
      setType("group");
    } else if ("platform" in training) {
      setPlatform((training as IOnlineTraining).platform);
      setType("online");
    } else if ("durationMonths" in training) {
      setDurationMonths((training as IMembership).durationMonths);
      setType("membership");
    }
  }, [training]);

  const handleSubmit = async () => {
    const base = {
      id: training?.id ?? crypto.randomUUID(),
      type,
      title,
      price,
      durationMinutes,
      level,
      schedule,
    };

    const payload = TrainingFactory.create(base) as ITrainingBase;

    switch (type) {
      case "personal":
        (payload as IPersonalTraining).trainerName = trainerName;
        break;
      case "group":
        (payload as IGroupTraining).groupSize = groupSize;
        break;
      case "online":
        (payload as IOnlineTraining).platform = platform;
        break;
      case "membership":
        (payload as IMembership).durationMonths = durationMonths;
        break;
    }

    onSuccess(payload, isEdit);
  };

  const isFormValid = (() => {
    const baseValid =
      FieldValidator.required(title) &&
      FieldValidator.positiveNumber(price) &&
      FieldValidator.required(schedule);

    if (!baseValid) return false;

    switch (type) {
      case "personal":
        return FieldValidator.required(trainerName);
      case "group":
        return FieldValidator.positiveNumber(groupSize);
      case "online":
        return FieldValidator.required(platform);
      case "membership":
        return FieldValidator.positiveNumber(durationMonths);
      default:
        return true;
    }
  })();

  return (
    <IonCard
      className="training-card big-card"
      style={{ maxHeight: "90vh", overflowY: "auto" }}
    >
      <IonCardHeader>
        <IonCardTitle>
          <IonIcon icon={fitnessOutline} />{" "}
          {isEdit ? "Редагування" : "Нове тренування"}
        </IonCardTitle>
        <IonCardSubtitle>Заповніть дані тренування</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonList>
          <IonSelect
            label="Тип тренування"
            labelPlacement="floating"
            fill="outline"
            value={type}
            onIonChange={(e) => setType(e.detail.value as TrainingType)}
            className="ion-margin-bottom"
          >
            <IonSelectOption value="personal">Персональне</IonSelectOption>
            <IonSelectOption value="group">Групове</IonSelectOption>
            <IonSelectOption value="online">Онлайн</IonSelectOption>
            <IonSelectOption value="membership">Абонемент</IonSelectOption>
          </IonSelect>

          <ValidatedInput
            label="Назва"
            value={title}
            onChange={setTitle}
            errorText="Назва обов'язкова (мін. 3 символи)"
            validators={[FieldValidator.required, FieldValidator.minLength(3)]}
          />

          <ValidatedInput
            label="Ціна (грн)"
            type="number"
            value={price}
            onChange={(v) => setPrice(Number(v))}
            errorText="Вкажіть коректну ціну"
            validators={[FieldValidator.positiveNumber]}
          />

          <ValidatedInput
            label="Тривалість (хв)"
            type="number"
            value={durationMinutes}
            onChange={(v) => setDurationMinutes(Number(v))}
            errorText="Вкажіть тривалість"
            validators={[FieldValidator.positiveNumber]}
          />

          <IonSelect
            label="Рівень"
            labelPlacement="floating"
            fill="outline"
            value={level}
            onIonChange={(e) => setLevel(e.detail.value)}
            className="ion-margin-bottom"
          >
            <IonSelectOption value="beginner">Beginner</IonSelectOption>
            <IonSelectOption value="intermediate">Intermediate</IonSelectOption>
            <IonSelectOption value="advanced">Advanced</IonSelectOption>
          </IonSelect>

          <ValidatedInput
            label="Розклад (ПН, СР 10:00)"
            value={schedule}
            onChange={setSchedule}
            errorText="Формат: ДНІ ЧАС (напр. ПН, СР 18:00)"
            validators={[FieldValidator.required]}
          />

          {/* Conditional Fields */}
          {type === "personal" && (
            <ValidatedInput
              label="Імʼя тренера"
              value={trainerName}
              onChange={setTrainerName}
              errorText="Вкажіть ім'я"
              validators={[FieldValidator.required]}
            />
          )}

          {type === "group" && (
            <ValidatedInput
              label="Розмір групи"
              type="number"
              value={groupSize}
              onChange={(v) => setGroupSize(Number(v))}
              errorText="Мінімум 1 людина"
              validators={[FieldValidator.positiveNumber]}
            />
          )}

          {type === "online" && (
            <ValidatedInput
              label="Платформа (Zoom, Skype)"
              value={platform}
              onChange={setPlatform}
              errorText="Вкажіть платформу"
              validators={[FieldValidator.required]}
            />
          )}

          {type === "membership" && (
            <ValidatedInput
              label="Кількість місяців"
              type="number"
              value={durationMonths}
              onChange={(v) => setDurationMonths(Number(v))}
              errorText="Мінімум 1 місяць"
              validators={[FieldValidator.positiveNumber]}
            />
          )}
        </IonList>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          <IonIcon icon={saveOutline} slot="start" />
          {isEdit ? "Зберегти зміни" : "Створити"}
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          color="medium"
          onClick={onCancel}
        >
          Скасувати
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TrainingForm;