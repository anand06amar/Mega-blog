import config from "../config/config";
import { Client, Databases, Query, ID , Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) 
        .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,slug,content,featureImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite service :: createPost :: error",error);
        }
    }


    async updatePost(slug,{title,content,featureImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite service::updatePost::error",error)
        }
    }

    async deletePost(slug){
    try {
        return await this.databases.deleteDocument(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            slug,
        )
        return true;
    } catch (error) {
        console.log("appwrite service::updatePost::error",error);
        return false;
    }
   
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            
        } catch (error) {
            console.log("appwrite service::getPost::error",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries,
            )
            
        } catch (error) {
            console.log("appwrite service::getPosts::error",error);
        }

    }

    //file upload service 
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error", error);
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketID,
                fileID
            )
            return true
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error", error);
        }
    }

     getFilepreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucketID,
            fileId
        )


    }
}

const service = new Service();

export default service;