/*!
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Amazon Software License (the "License"). You may not use this file except in compliance with the License. A copy of 
 * the License is located at
 *     http://aws.amazon.com/asl/
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY 
 * KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
import * as S3 from 'aws-sdk/clients/s3';

export default (fileField, { credentials, s3Config }) => {
    const {
        bucket: Bucket,
        key: Key,
        region,
        mimeType: ContentType,
        localUri: Body,
    } = fileField;

    const s3 = new S3({
        credentials,
        region,
    });

    let params: S3.PutObjectRequest = {
        Bucket,
        Key,
        Body,
        ContentType,
    };

    if(s3Config.modifyPutObjectRequest != null){
        params = s3Config.modifyPutObjectRequest(params);
    }

    return s3.upload(params).promise();

};
