"use server"

import { cookies } from "next/headers"
import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { parseStringify } from "../utils"

const APPWRITE_SESSION ="appwrite-session"

export const signIn = async ( { email, password } : SignUpParams  ) => { 
    try {
        const { account } = await createAdminClient();

        const response = await account.createEmailPasswordSession(email, password)

        return parseStringify(response)
    } catch (error) {
        console.error("Error", error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData;

    try {
        const { account } = await createAdminClient();

        const newAccountUser = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set(APPWRITE_SESSION, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        })
        console.log(newAccountUser, "newAccountUser")
        return parseStringify(newAccountUser)
    } catch (error) {
        console.error("Error", error)
    }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
        console.error("Error", error)
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete(APPWRITE_SESSION);
        await account.deleteSession("current");

        return true
    } catch (error) {
        console.error("Error", error)
    }
}