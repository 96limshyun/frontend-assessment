import {
  SectionCard,
  ImageUploadCard,
  EmptyAdditionalImageView,
} from "@/libs/ui";

import { MAX_ADDITIONAL_IMAGES } from "@/app/constants";

interface AdditionalImagesUploadProps {
  additionalImages: File[];
  onChange: (images: File[]) => void;
}

export default function AdditionalImagesUpload({
  additionalImages,
  onChange,
}: AdditionalImagesUploadProps) {
  const remainingSlots = MAX_ADDITIONAL_IMAGES - additionalImages.length;

  const handleMultipleFiles = (newFiles: File[]) => {
    const combined = [...additionalImages, ...newFiles];
    const newImages = combined.slice(0, MAX_ADDITIONAL_IMAGES);
    onChange(newImages);
  };

  return (
    <SectionCard
      title="추가 이미지 (선택)"
      subtitle="최대 4장까지 등록할 수 있어요"
    >
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-x-visible">
        {additionalImages.length < MAX_ADDITIONAL_IMAGES && (
          <div className="shrink-0 w-[160px] md:w-auto">
            <ImageUploadCard
              file={null}
              size="small"
              setFile={(newFile) => {
                if (!newFile) {
                  return;
                }

                const nextImages = [...additionalImages, newFile].slice(
                  0,
                  MAX_ADDITIONAL_IMAGES
                );
                onChange(nextImages);
              }}
              setFiles={handleMultipleFiles}
              emptyFileView={<EmptyAdditionalImageView />}
              multiple={true}
              maxFiles={remainingSlots}
            />
          </div>
        )}
        {additionalImages.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="shrink-0 w-[160px] md:w-auto"
          >
            <ImageUploadCard
              file={file}
              size="small"
              setFile={(newFile) => {
                if (!newFile) {
                  onChange(additionalImages.filter((_, i) => i !== index));
                  return;
                }

                const updated = [...additionalImages];
                updated[index] = newFile;
                onChange(updated);
              }}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
