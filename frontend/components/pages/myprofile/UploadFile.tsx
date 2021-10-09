import React, { useEffect, useState, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { FileResponse } from "types";
import Image from "next/image";
import { SINGLE_UPLOAD } from "@operations-mutations/uploadFile";
import { singleUpload, singleUploadVariables } from "generated/singleUpload";

export const UploadFile = () => {
  const [lastUploaded, setLastUploaded] = useState<any>();
  const [singleUpload, { data, loading, error }] = useMutation<
    singleUpload,
    singleUploadVariables
  >(SINGLE_UPLOAD);
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => validity.valid && singleUpload({ variables: { file } });

  useEffect(() => {
    if (data) setLastUploaded(data.singleUpload);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <Fragment>
      <input type="file" required onChange={onChange} />
      <br />
      {/* {Object.keys(lastUploaded).length !== 0 && (
        <div>
          {" "}
          Last uploaded details {JSON.stringify(lastUploaded, null, 2)}{" "}
        </div>
      )} */}
      {lastUploaded && !loading && (
        <Image src={lastUploaded.url} width={64} height={64} />
      )}
      {/* <Image
        src={
          "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/d251e475-f956-4ad8-9173-101872da28c3.jpg"
        }
        width={48}
        height={48}
        quality={100}
      /> */}
    </Fragment>
  );
};