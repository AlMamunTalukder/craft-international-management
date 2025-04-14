/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { joditConfig } from '@/config';
// import type { Jodit } from 'jodit-react';
import { Jodit } from 'jodit/esm';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface EditorProps {
  name: string;
  label?: string;
}

const GarageEditor: React.FC<EditorProps> = ({ name, label }) => {
  const { control } = useFormContext();
  const editorRef = useRef<Jodit | null>(null); 

  const config = {
    ...joditConfig,
    uploader: {
      ...joditConfig.uploader,
      defaultHandlerSuccess: function (this: Jodit, response: any) {
        if (response.files && response.files.length) {
          const imageUrl = response.files[0];
          this.selection.insertImage(imageUrl, null, 250); // Access `selection` directly
        }
      },
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <div>
          {label && <label>{label}</label>}
          <JoditEditor
            ref={editorRef}
            value={value}
            config={config}
            onBlur={(newContent) => {
              onBlur();
              onChange(newContent);
            }}
            onChange={(newContent) => {}}
          />
        </div>
      )}
    />
  );
};

export default GarageEditor;