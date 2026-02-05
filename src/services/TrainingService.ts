import { TrainingFactory } from "../models/TrainingFactory";
import { ITrainingBase } from "../interfaces/ITraining";

export class TrainingService {
  private static API_URL =
    "https://api.jsonbin.io/v3/b/698322b7ae596e708f104fce";
  private static trainings: ITrainingBase[] = [];

  constructor() {}

  static async loadTrainings(): Promise<ITrainingBase[]> {
    const res = await fetch(this.API_URL).then((res) => res.json());
    const data = res.record;

    this.trainings = data.map((item: any) => TrainingFactory.create(item));
    return this.trainings;
  }

  static addTraining(newTraining: ITrainingBase) {
    this.trainings = [...this.trainings, newTraining];
  }

  static updateTraining(training: ITrainingBase) {
    this.trainings = this.trainings.map(t => (t.id === training.id) ? training : t);
  }

  static deleteTraining(id: string) {
    this.trainings = this.trainings.filter(t => (t.id !== id));
  }

  static getTrainings() {
    return [...this.trainings];
  }
}
