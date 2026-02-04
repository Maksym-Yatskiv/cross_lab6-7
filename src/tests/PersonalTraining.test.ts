import { PersonalTraining } from "../classes/PersonalTraining";

describe("PersonalTraining", () => {
  it("should create a valid PersonalTraining instance", () => {
    const pt = new PersonalTraining(
      "1",
      "Персональне тренування",
      500,
      60,
      "beginner",
      "Пн, Ср 18:00",
      "Іван Петренко"
    );

    expect(pt.id).toBe("1");
    expect(pt.title).toBe("Персональне тренування");
    expect(pt.price).toBe(500);
    expect(pt.durationMinutes).toBe(60);
    expect(pt.level).toBe("beginner");
    expect(pt.schedule).toBe("Пн, Ср 18:00");
    expect(pt.getDescription()).toBe("Персональне тренування з тренером Іван Петренко");
  });
});
