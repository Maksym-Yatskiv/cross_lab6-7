import { TrainingFactory } from "../models/TrainingFactory";
import { ITrainingBase } from "../interfaces/ITraining";

export class TrainingService {
  private static API_URL = "https://api.jsonbin.io/v3/b/698322b7ae596e708f104fce";

  constructor() {}

  static async loadTrainings(): Promise<ITrainingBase[]> {
    const res = await fetch(this.API_URL).then((res) => res.json());
    const data = res.record;

    return data.map((item: any) => TrainingFactory.create(item));
  }

}
