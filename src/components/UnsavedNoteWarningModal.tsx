export default function UnsavedWarningModal({
  onSave,
  onDiscard,
  onCancel,
}: {
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="modal-background">
      <div className="absolute left-0 right-0 flex justify-center">
        <div className="rounded-2xl border-2 border-white bg-neutral-800 p-4 text-white">
          <p className="mb-4">Do you want to save your note before exiting?</p>
          <div className="flex justify-end gap-4">
            <button
              className="button bg-white text-neutral-800"
              onClick={onSave}
            >
              Save
            </button>
            <button
              className="button text-white! border-white border-2"
              onClick={onDiscard}
            >
              Discard Changes
            </button>
            <button
              className={"button text-white! border-white border-2"}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
