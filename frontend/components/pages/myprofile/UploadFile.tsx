import React, { useEffect, useState, Fragment } from "react";
import { useMutation, gql } from "@apollo/client";
import Image from "next/image";

const SINGLE_UPLOAD = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

interface IFileResponse {
  file: string;
  mimetype: string;
  encoding: string;
  url: string;
}

export const UploadFile = () => {
  const [lastUploaded, setLastUploaded] = useState<IFileResponse>();
  const [mutate, { loading, error, data }] = useMutation(SINGLE_UPLOAD);
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => validity.valid && mutate({ variables: { file } });

  useEffect(() => {
    if (data) setLastUploaded(data.singleUpload);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  console.log(lastUploaded);

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
        <Image src={lastUploaded.url} width={500} height={500} />
      )}
    </Fragment>
  );
};
