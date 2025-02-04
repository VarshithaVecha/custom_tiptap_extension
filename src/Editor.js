import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ImageUploaderExtension } from './ImageUploaderExtension';
import './editorStyles.css';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('YOUR_IMAGE_UPLOAD_ENDPOINT', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data.url;
};

const Editor = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("Choose File");
  const [selectButtonVisible, setSelectButtonVisible] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, ImageUploaderExtension],
    content: '',
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const tempUrl = URL.createObjectURL(file);
      setPreviewImage(tempUrl);
      setSelectButtonVisible(true);

      const imageUrl = await uploadImage(file);
      setPreviewImage(imageUrl);
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFileName("Choose File");
    setSelectButtonVisible(false);
  };

  const handleSelectClick = () => {
    alert("Your image is selected");
    setPreviewImage(null);
    setFileName("Choose File");
    setSelectButtonVisible(false);
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <h1 className="editor-title">Image Uploader</h1>
        <div className="upload-section">
          <label className="file-label">
            <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
            <span className="file-name">{fileName}</span>
          </label>
          <button onClick={handleRemoveImage} className="remove-button">Remove</button>
        </div>
        {previewImage && (
          <>
            <img src={previewImage} alt="Preview" className="preview-image" style={{ cursor: 'pointer' }} />
            {selectButtonVisible && <button className="select-button" onClick={handleSelectClick}>Select</button>}
          </>
        )}
        <EditorContent editor={editor} className="editor-content" />
      </div>
    </div>
  );
};

export default Editor;
