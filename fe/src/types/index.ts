import { z } from "zod";

export type UserType = {
    username: string,
    email: string,
    password: string,
}

export type NewPasswordType = {
    confirmPassword: string,
    newPassword: string
}

const bankCardSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    country: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    card_number: z.string().length(12, {
        message: "Card number must be exactly 12 characters long"
    }),
    expiry_month: z.string(),
    expiry_year: z.string(),
    cvv: z.string().length(3, {
        message: "CVV must be exactly 3 characters long"
    }),
});

export type BankCard = z.infer<typeof bankCardSchema>;

const bankCardUpdateSchema = bankCardSchema.pick({
    id: true,
    user_id: true,
    country: true,
    first_name: true,
    last_name: true,
    card_number: true,
    expiry_month: true,
    expiry_year: true,
    cvv: true,
})

export type BankCardUpdate = z.infer<typeof bankCardUpdateSchema>;

export type CardType = {
    country: string,
    first_name: string,
    last_name: string,
    card_number: string,
    expiry_month: string,
    expiry_year: string,
    cvv: string,
}