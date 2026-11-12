import * as z from "zod";

const UpdateTeacherDto = z.object({
  name: z.string(),
  house_id: z.int(),
});
export default UpdateTeacherDto;
