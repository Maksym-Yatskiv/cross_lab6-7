import { IMembership } from "../interfaces/ITraining";

export class Membership implements IMembership {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    public durationMinutes: number,
    public level: "beginner" | "intermediate" | "advanced",
    public schedule: string,
    public durationMonths: number
  ) {}

  getDescription(): string {
    return `Кількість місяців: ${this.durationMonths}`;
  }
}
