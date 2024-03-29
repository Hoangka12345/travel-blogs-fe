import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email({ message: "* Định dạng email không hợp lệ!" })
        .nonempty("* Trường này không thể trống!"),
    password: z.string().nonempty("* Trường này không thể trống!"),

});