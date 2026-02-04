import { GroupTraining } from "../classes/GroupTraining";

describe("GroupTraining", () => {
  it("should correctly describe group training", () => {
    const gt = new GroupTraining(
      "2",
      "Функціональний тренінг",
      350,
      60,
      "intermediate",
      "Вт, Чт 19:00",
      12
    );

    expect(gt.id).toBe("2");
    expect(gt.title).toBe("Функціональний тренінг");
    expect(gt.price).toBe(350);
    expect(gt.durationMinutes).toBe(60);
    expect(gt.level).toBe("intermediate");
    expect(gt.schedule).toBe("Вт, Чт 19:00");
    expect(gt.getDescription()).toBe("Групове заняття (до 12 осіб)");
  });
});
