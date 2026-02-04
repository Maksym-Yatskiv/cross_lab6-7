import { TrainingFactory } from "../classes/TrainingFactory";
import { ITrainingBase } from "../interfaces/ITraining";

export class TrainingService {
    private apiUrl = "https://api.jsonbin.io/v3/b/698322b7ae596e708f104fce";

    constructor() {}

    async loadTrainings(): Promise<ITrainingBase[]> {
      const res = await fetch(this.apiUrl).then((res) => res.json());
      const data = res.record;

      return data.map((item: any) => TrainingFactory.create(item));
    }
}
