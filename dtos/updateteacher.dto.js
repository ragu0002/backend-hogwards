import * as z from "zod";

const UpdateTeacherDto = z.object({
  name: z.string(),
  house_id: z.int(),
  employment_start: z.iso.date(),
  currently_active: z.boolean(),
  deceased: z.boolean(),
});
export default UpdateTeacherDto;
