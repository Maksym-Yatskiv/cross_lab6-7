import { ITrainingBase } from "../interfaces/ITraining";
import { Membership } from "./Membership";
import { PersonalTraining } from "./PersonalTraining";
import { GroupTraining } from "./GroupTraining";
import { OnlineTraining } from "./OnlineTraining";

export class TrainingFactory {
    static create(raw: any): ITrainingBase {
        switch (raw.type) {
            case "membership":
                return new Membership(
                    raw.id,
                    raw.title,
                    raw.price,
                    raw.durationMinutes,
                    raw.level,
                    raw.schedule,
                    raw.durationMonths
                );

            case "personal":
                return new PersonalTraining(
                    raw.id,
                    raw.title,
                    raw.price,
                    raw.durationMinutes,
                    raw.level,
                    raw.schedule,
                    raw.trainerName
                );

            case "group":
                return new GroupTraining(
                    raw.id,
                    raw.title,
                    raw.price,
                    raw.durationMinutes,
                    raw.level,
                    raw.schedule,
                    raw.groupSize
                );

            case "online":
                return new OnlineTraining(
                    raw.id,
                    raw.title,
                    raw.price,
                    raw.durationMinutes,
                    raw.level,
                    raw.schedule,
                    raw.platform
                );

            default:
                throw new Error("Unknown training type");
        }
    }
}
