import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonModal,
} from "@ionic/react";
import { addOutline, createOutline, trashOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { ITrainingBase } from "../interfaces/ITraining";
import { TrainingService } from "../services/TrainingService";
import TrainingForm from "../components/TrainingForm";

const Home: React.FC = () => {
  const [trainings, setTrainings] = useState<ITrainingBase[]>([]);
  const [selected, setSelected] = useState<ITrainingBase | null>(null);
  const [open, setOpen] = useState(false);

  const loadTrainings = async () => {
    const data = await TrainingService.loadTrainings();
    setTrainings(data);
  };

  useEffect(() => {
    loadTrainings();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (t: ITrainingBase) => {
    setSelected(t);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setTrainings(prev => prev.filter(t => t.id !== id));
  };

  const handleSuccess = (savedTraining: ITrainingBase, isEdit: boolean) => {
    setOpen(false);

    if (isEdit) {
      setTrainings(prev =>
        prev.map(t => (t.id === savedTraining.id ? savedTraining : t))
      );
    } else {
      setTrainings(prev => [...prev, savedTraining]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Спортзал</IonTitle>
          <IonButton slot="end" onClick={handleAdd}>
            Додати <IonIcon icon={addOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {trainings.map(t => (
          <IonCard key={t.id}>
            <IonCardHeader>
              <IonCardTitle>{t.title}</IonCardTitle>
              <IonCardSubtitle>{t.getDescription()}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p>💰 {t.price} грн</p>
              <p>🕒 {t.schedule}</p>

              <IonButton size="small" onClick={() => handleEdit(t)}>
                <IonIcon icon={createOutline} /> Редагувати
              </IonButton>

              <IonButton
                size="small"
                color="danger"
                onClick={() => handleDelete(t.id)}
              >
                <IonIcon icon={trashOutline} /> Видалити
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}

        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)}>
          <TrainingForm training={selected} onSuccess={handleSuccess} onCancel={() => setOpen(false)} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
