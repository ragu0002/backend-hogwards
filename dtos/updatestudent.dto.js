import * as z from "zod";

const UpdateStudentDto = z.object({
  name: z.string(),
  year: z.number(),
  house_id: z.int(),
});
export default UpdateStudentDto;
