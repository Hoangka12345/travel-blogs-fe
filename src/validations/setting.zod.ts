import { z } from "zod";

export const settingSchema = z.object({
    oldPassword: z.string().nonempty("* Trường này không được thiếu!")
        .min(6, "*Password phải có ít nhất 6 ký tự!")
        .max(20, "*Password không vượt quá 20 ký tự!"),
    newPassword: z.string().nonempty("* Trường này không được thiếu!")
        .min(6, "*Password phải có ít nhất 6 ký tự!")
        .max(20, "*Password không vượt quá 20 ký tự!"),
    confirmPassword: z.string().nonempty("* Trường này không được thiếu!")
        .min(6, "* Password phải có ít nhất 6 ký tự!")
        .max(20, "* Password không vượt quá 20 ký tự!")

}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "password không khớp!",
    path: ["confirmPassword"]
});