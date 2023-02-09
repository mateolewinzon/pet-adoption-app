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
      <i className="bi bi-plus-lg flex h-[70px] w-[70px] flex items-center justify-center text-4xl text-neutral-400 w-full"></i>
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
    <Field name="images" labelId="pet.images">
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
