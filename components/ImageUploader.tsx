import { validateYupSchema, yupToFormErrors } from "formik";
import { Field, Spinner, ImageThumbnail } from "components";
import { confirmDangerousAction, displayErrorAlert } from "utils/alerts";
import { validateFilesToUpload } from "utils/formValidation";
import type { ChangeEvent } from "react";

export type Upload = { url: string } | null;
type SetUploads = (values: Upload[]) => void;

type Props = {
  uploads: Upload[];
  setUploads: SetUploads;
  limit: number;
  uploadImages: (files: FileList) => Promise<any>;
};

const id = "filesToUpload";

const AddImageButton = () => (
  <label htmlFor={id}>
    <div className="border border-2 w-max cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        className="text-neutral-400"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
    </div>
  </label>
);

export function ImageUploader({
  uploads,
  setUploads,
  limit,
  uploadImages,
}: Props) {
  async function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (!selectedFiles) {
      return;
    }

    if (uploads.length + selectedFiles!.length > limit) {
      return displayErrorAlert(
        "Invalid Image Selection",
        `The max of images uploaded in total is ${limit}. `
      );
    }

    try {
      await validateYupSchema({ selectedFiles }, validateFilesToUpload);
    } catch (e) {
      const errors = await yupToFormErrors<{ selectedFiles: string }>(e);
      return displayErrorAlert("Invalid Image Selection", errors.selectedFiles);
    }
    setUploads([...uploads, ...Array(selectedFiles!.length).fill(null)]);
    const { data, error } = await uploadImages(selectedFiles!);

    if (error) {
      setUploads([]);
      return displayErrorAlert(
        "Server error",
        "An error occurred when uploading the images provided."
      );
    }

    setUploads([...uploads.filter((u) => u !== null), ...data]);
  }

  function handleRemoveImage(key: number) {
    confirmDangerousAction(
      {
        title: "Remove image",
        text: "Are you sure you want to delete this image from the post? Changes will only be applied when saving.",
      },
      () => {
        const newImages = [...uploads];
        newImages.splice(key, 1);
        setUploads(newImages);
      }
    );
  }

  return (
    <Field name={id} label="Images">
      <div className="overflow-x-auto py-2">
        <div className="flex gap-2">
          {uploads.map((upload, key) =>
            !upload ? (
              <Spinner key={key} />
            ) : (
              <ImageThumbnail
                src={upload.url}
                key={key}
                onClick={() => handleRemoveImage(key)}
              />
            )
          )}
          <AddImageButton />
        </div>
        <input
          hidden
          multiple={limit > 1 && true}
          type="file"
          onChange={handleFileSelect}
          className="w-full bg-gray-50 rounded p-2 mb-2"
          id={id}
          name={id}
        />
      </div>
    </Field>
  );
}
