import { OnlineTraining } from "../classes/OnlineTraining";

describe("OnlineTraining", () => {
  it("should correctly describe online training", () => {
    const ot = new OnlineTraining(
      "4",
      "Онлайн HIIT",
      300,
      45,
      "advanced",
      "Нд 11:00",
      "Zoom"
    );

    expect(ot.id).toBe("4");
    expect(ot.title).toBe("Онлайн HIIT");
    expect(ot.price).toBe(300);
    expect(ot.durationMinutes).toBe(45);
    expect(ot.level).toBe("advanced");
    expect(ot.schedule).toBe("Нд 11:00");
    expect(ot.getDescription()).toBe("Онлайн-тренування через Zoom");
  });
});
