import * as z from "zod";

const CreateStudentDto = z.object({
  name: z.string(),
  year: z.number(),
  house_id: z.int(),
});
export default CreateStudentDto;
