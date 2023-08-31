import { personSchema } from "../src/schemas";

test("Validating a valid person object", () => {
  const validPerson = {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
  };

  const validationResult = personSchema.safeParse(validPerson);

  expect(validationResult.success).toBe(true);
});
