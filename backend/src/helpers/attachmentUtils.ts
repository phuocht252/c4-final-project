import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic

const defaultTodoId = '20af1b66-c96b-4da4-b01f-49b4947990c5'
const s3Bucket = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration = 300

export class AttachmentUtils{
    constructor(
        private readonly s3 = new XAWS.S3({signatureVersion:'v4'}),
        private readonly bucketname = s3Bucket
    ){}

    getAttachmentUrl(todoId:string){
        return `https://${this.bucketname}.s3.amazonaws.com/${todoId}`
    }

    getDefaultAttachmentUrl() {
        return `https://${this.bucketname}.s3.amazonaws.com/${defaultTodoId}`
    }

    getUploadUrl(todoId:string){
        return this.s3.getSignedUrl('putObject',{
            Bucket:this.bucketname,
            Key:todoId,
            Expires:urlExpiration
        }) as string
    }
}