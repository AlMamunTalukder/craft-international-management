/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import GarageModal from "@/components/Shared/Modal";

import CraftForm from "@/components/Forms/Form";
import GarageInput from "@/components/Forms/Input";

export type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateFolderModal = ({ open, setOpen }: TProps) => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <GarageModal
      sx={{ width: "400px", margin: " auto" }}
      open={open}
      setOpen={setOpen}
      title="Create Folder"
    >
      <Box sx={{ width: "100%" }}>
        <CraftForm onSubmit={handleSubmit}>
          
          <div className="space-y-0">
            {/* <h1>Create Folder</h1> */}
            <GarageInput name="name" label="Folder Name" fullWidth/>
          </div>

          <div className="mt-4 flex justify-end ">
            <Button type="submit" variant="contained">
             + Create
            </Button>
          </div>
        </CraftForm>
      </Box>
    </GarageModal>
  );
};

export default CreateFolderModal;
