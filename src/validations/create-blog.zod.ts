import { z } from "zod";

export const createBlogSchema = z.object({
    address: z.string().nonempty("* Trường này không thể trống!"),
    content: z.string().nonempty("* Trường này không thể trống!"),
});