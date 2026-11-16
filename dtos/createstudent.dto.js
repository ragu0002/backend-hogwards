import * as z from "zod";

const CreateStudentDto = z.object({
  name: z.string(),
  house_id: z.int(),
  birthday: z.iso.date(),
  school_year: z.int(),
});
export default CreateStudentDto;
