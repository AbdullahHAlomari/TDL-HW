import { TypeOf, z } from "zod";

export const RegisterTypes = z.object({
    body: z.object({
        email: z.string({
            required_error: "Wrong email",
            invalid_type_error: "Invalid type error"
                
        }),
        password: z.string({
            required_error: "Wrong password",
            invalid_type_error: "Invalid type error"
        }).min(6, "Your password should be more than 6 char ").max(80, "Maximum password char is 80"),
    }),
    // username: z.string({
    //     required_error: "Wrong username",
    //     invalid_type_error: "Invalid type error"
    // }),
})

export type RegisterTypesSchema = TypeOf<typeof RegisterTypes>["body"]