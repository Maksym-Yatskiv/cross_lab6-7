import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonButton,
} from "@ionic/react";
import "./Home.css";
import { cashOutline, timeOutline, fitnessOutline } from "ionicons/icons";

import { useEffect, useState } from "react";
import { ITrainingBase } from "../interfaces/ITraining";
import { TrainingService } from "../services/TrainingService";

const Home: React.FC = () => {
  const [trainings, setTrainings] = useState<ITrainingBase[]>([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      const service = new TrainingService();
      const data = await service.loadTrainings();

      setTrainings(data);
    };
    fetchTrainings();
  }, []);

  const handleBuy = (training: ITrainingBase) => {
    alert(`Ви придбали: ${training.title} за ${training.price} грн`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Спортзал</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {trainings.map((t) => (
          <IonCard key={t.id} className="training-card big-card">
            {/* Header */}
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">
                <IonIcon icon={fitnessOutline} className="card-icon" />
                {t.title}
              </IonCardTitle>

              <IonCardSubtitle className="card-subtitle">
                {t.getDescription()}
              </IonCardSubtitle>
            </IonCardHeader>

            {/* Body */}
            <IonCardContent className="card-content">
              <div className="card-info">
                <IonIcon icon={timeOutline} />
                <span>{t.schedule}</span>
              </div>

              <div className="card-info price">
                <IonIcon icon={cashOutline} />
                <strong>{t.price} грн</strong>
              </div>
              <br />
              <IonButton
                expand="block"
                color="primary"
                className="buy-button"
                onClick={() => {handleBuy(t)}}
              >
                Придбати
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
