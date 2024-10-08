import conf from "../conf/conf.js"

import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)


        // console.log(conf.appwriteUrl)
        // console.log(conf.appwriteProjectId)
        // console.log(conf.appwriteDatabaseId)
        // console.log(conf.appwriteCollectionId)
        // console.log(conf.appwriteBuckteId)


    }

    async createAccount({ email, password, name }) {

        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }

        } catch (error) {
            console.log("Appwrite serice :: createAccount :: error", error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite serice :: login :: error", error)
            return error.message;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serice :: getCurrentUser :: error", error)
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite serice :: logout :: error", error)

        }
    }
}

const authService = new AuthService()

export default authService
