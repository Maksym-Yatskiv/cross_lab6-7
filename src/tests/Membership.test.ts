import { Membership } from "../classes/Membership";

describe("Membership", () => {
  it("should correctly describe membership", () => {
    const mem = new Membership(
      "3",
      "Абонемент Стандарт",
      1200,
      90,
      "beginner",
      "Щоденно 08:00–22:00",
      1
    );
    expect(mem.id).toBe("3");
    expect(mem.title).toBe("Абонемент Стандарт");
    expect(mem.price).toBe(1200);
    expect(mem.durationMinutes).toBe(90);
    expect(mem.level).toBe("beginner");
    expect(mem.schedule).toBe("Щоденно 08:00–22:00");
    expect(mem.getDescription()).toBe("Кількість місяців: 1");
  });
});
