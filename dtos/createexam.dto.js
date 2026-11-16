import * as z from "zod";

const CreateExamDto = z.object({
  course: z.int(),
  student: z.int(),
  grade: z.int(),
});
export default CreateExamDto;
