import { z } from "zod";

export const registerFormSchema = z.object({
    firstName: z.string().nonempty("* Trường này không được thiếu!"),
    lastName: z.string().nonempty("* Trường này không được thiếu!"),
    dateOfBirth: z.date(),
    email: z.string().nonempty("* Trường này không được thiếu!").email("* Định dạng email không hợp lệ"),
    password: z.string().nonempty("* Trường này không được thiếu!")
        .min(6, "*Password phải có ít nhất 6 ký tự!")
        .max(20, "*Password không vượt quá 20 ký tự!"),
    confirmPassword: z.string().nonempty("* Trường này không được thiếu!")
        .min(6, "* Password phải có ít nhất 6 ký tự!")
        .max(20, "* Password không vượt quá 20 ký tự!")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});