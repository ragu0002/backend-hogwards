import * as z from "zod";

const UpdateStudentDto = z.object({
  name: z.string(),
  house_id: z.int(),
  birthday: z.iso.date(),
  school_year: z.int(),
});
export default UpdateStudentDto;
