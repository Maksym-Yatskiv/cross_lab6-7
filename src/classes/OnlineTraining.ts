import { IOnlineTraining } from "../interfaces/ITraining";

export class OnlineTraining implements IOnlineTraining {
    constructor(
        public id: string,
        public title: string,
        public price: number,
        public durationMinutes: number,
        public level: "beginner" | "intermediate" | "advanced",
        public schedule: string,
        public platform: string
    ) {}

    getDescription(): string {
        return `Онлайн-тренування через ${this.platform}`;
    }
}
