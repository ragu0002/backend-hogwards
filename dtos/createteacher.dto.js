import * as z from "zod";

const CreateTeacherDto = z.object({
  name: z.string(),
  house_id: z.int(),
});
export default CreateTeacherDto;
