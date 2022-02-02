import React, { useEffect, useState } from "react";
// import { GET_PROFILE_IMAGE } from "@/operations-queries/getLoggedInProfile";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import button from "@/styles-modules/Button.module.scss";
import {
  LoggedInProfileDetailsDocument,
  LoggedInUserDocument,
  LoggedInUserQuery,
  ProfileImageDocument,
  ProfileImageQuery,
  useSingleUploadMutation,
} from "generated/graphql";

export const UploadFile = () => {
  const [error, setError] = useState("");
  const [singleUpload, { data }] = useSingleUploadMutation({
    update(cache, { data }) {
      const user = cache.readQuery<LoggedInUserQuery>({
        query: LoggedInUserDocument,
      });

      if (data?.singleUpload && user) {
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

  useEffect(() => {
    if (data) {
      toastState.addToast("Image uploaded successfully", ErrorStatus.success);
    }
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [data, error]);

  return (
    <button className={`${button.lightGreen} update-image-btn`}>
      <input className="hide" type="file" required onChange={onChange} />
      Upload Image
    </button>
  );
};
