import React, { useEffect, useState, Fragment } from "react";
import { useMutation, gql } from "@apollo/client";

const MUTATION = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const UploadFile2 = () => {
  const [uploadFileMutation, { data, loading, error }] = useMutation(MUTATION);

  function onChange({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) uploadFileMutation({ variables: { file } });
  }

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <Fragment>
      <input type="file" required onChange={onChange} />
      {/* <br />
      {Object.keys(lastUploaded).length !== 0 && (
        <div>
          {" "}
          Last uploaded details {JSON.stringify(lastUploaded, null, 2)}{" "}
        </div>
      )} */}
    </Fragment>
  );
};
