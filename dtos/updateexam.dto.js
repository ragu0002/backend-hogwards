import * as z from "zod";

const UpdateExamDto = z.object({
  course: z.int(),
  student: z.int(),
  grade: z.int(),
});
export default UpdateExamDto;
