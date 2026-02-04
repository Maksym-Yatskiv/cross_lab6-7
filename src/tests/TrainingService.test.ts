import { TrainingFactory } from "../classes/TrainingFactory";
import { PersonalTraining } from "../classes/PersonalTraining";

describe("TrainingFactory", () => {
  it("should create PersonalTraining instance", () => {
    const raw = {
      type: "personal",
      id: "1",
      title: "Персональне тренування",
      price: 500,
      durationMinutes: 60,
      level: "beginner",
      schedule: "Пн, Ср 18:00",
      trainerName: "Іван Петренко"
    };

    const training = TrainingFactory.create(raw);
    expect(training).toBeInstanceOf(PersonalTraining);
    expect(training.getDescription()).toBe("Персональне тренування з тренером Іван Петренко");
  });

});
