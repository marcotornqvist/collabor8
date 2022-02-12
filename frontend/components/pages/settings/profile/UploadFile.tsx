import React, { useState } from "react";
import button from "@/styles-modules/Button.module.scss";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  SingleUploadMutation,
  useSingleUploadMutation,
} from "generated/graphql";
import useToast from "@/hooks/useToast";

export const UploadFile = () => {
  const [error, setError] = useState("");
  const [singleUpload, { data }] = useSingleUploadMutation({
    update(cache, { data }) {
      const user = cache.readQuery<LoggedInUserQuery>({
        query: LoggedInUserDocument,
      });

      if (data?.singleUpload && user?.loggedInUser.profile) {
        cache.writeQuery<LoggedInUserQuery>({
          query: LoggedInUserDocument,
          data: {
            loggedInUser: {
              ...user.loggedInUser,
              profile: {
                ...user.loggedInUser.profile,
                profileImage: data.singleUpload.url,
              },
            },
          },
        });
      }
    },
    onError: (error) => setError(error.message),
  });

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => validity.valid && singleUpload({ variables: { file } });

  useToast<SingleUploadMutation>({
    data,
    successMessage: "Image uploaded successfully",
    error,
  });

  return (
    <button className={`${button.lightGreen} update-image-btn`}>
      <input className="hide" type="file" required onChange={onChange} />
      Upload Image
    </button>
  );
};
