import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SINGLE_UPLOAD } from "@operations-mutations/uploadFile";
import { singleUpload, singleUploadVariables } from "generated/singleUpload";
import { GET_PROFILE_IMAGE } from "@operations-queries/getLoggedInProfile";
import { loggedInProfileImage } from "generated/loggedInProfileImage";
import { toastState } from "store";
import { ErrorStatus } from "@types-enums/enums";
import button from "@styles-modules/Button.module.scss";

export const UploadFile = () => {
  const [error, setError] = useState("");
  const [singleUpload, { data }] = useMutation<
    singleUpload,
    singleUploadVariables
  >(SINGLE_UPLOAD, {
    update(cache, { data }) {
      cache.writeQuery<loggedInProfileImage>({
        query: GET_PROFILE_IMAGE,
        data: {
          loggedInProfile: {
            __typename: "Profile",
            profileImage: data?.singleUpload.url || null,
          },
        },
      });
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

// return (
//   <Fragment>
//     <button className={`${styles.default} ${styles.lightGreen}`}>
//       <input type="file" required onChange={onChange} />
//       Update Picture
//     </button>
//     {/* {Object.keys(lastUploaded).length !== 0 && (
//         <div>
//           {" "}
//           Last uploaded details {JSON.stringify(lastUploaded, null, 2)}{" "}
//         </div>
//       )} */}
//     {lastUploaded && !loading && (
//       <Image src={lastUploaded.url} width={64} height={64} />
//     )}
//   </Fragment>
// );
