/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { Add, Delete, Search, Folder } from "@mui/icons-material";
import GarageForm from "@/components/Forms/Form";
import { useTheme } from "@mui/material/styles"; // Updated import
import CreateFolderModal from "./_components/CreateFolderModal";

const Page = () => {
  const theme = useTheme(); // Now this will include palette and other MUI theme properties
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [folders, setFolders] = React.useState<
    { id: number; name: string; iconColor: string }[]
  >([
    { id: 1, name: "Documents", iconColor: "#FFD700" },
    { id: 2, name: "Pictures", iconColor: "#87CEEB" },
    { id: 3, name: "Music", iconColor: "#98FB98" },
    { id: 4, name: "Videos", iconColor: "#FFA07A" },
    { id: 5, name: "Downloads", iconColor: "#DDA0DD" },
  ]);

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleDeleteFolder = (id: number) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Box padding="0px 0px">
        <Card
          sx={{
            marginBottom: 4,
            padding: 2,
            borderRadius: "8px",
            boxShadow: 0.5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1 className=" text-3xl">Folder</h1>
          <GarageForm onSubmit={handleSubmit}>
            <FormControl sx={{}} variant="outlined">
              <InputLabel htmlFor="search" size="small">
                Search Here
              </InputLabel>
              <OutlinedInput
                endAdornment={<Search />}
                label="Search"
                className="w-[260px] lg:w-[250px] h-10"
              />
            </FormControl>
          </GarageForm>

          <Button sx={{ color: "" }} variant="contained" onClick={handleOpen}>
            <Add className="h-5 w-5 mr-2" /> Create Folder
          </Button>
        </Card>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "10px",
          }}
        >
          {filteredFolders.map((folder) => (
            <Box
              key={folder.id}
              sx={{
                position: "relative",
                width: "100%",
                height: "150px",
                overflow: "hidden",
                boxShadow: 3,
                background:
                  theme.palette.mode === "dark" ? "#202020" : "#ffffff",
                borderRadius: "8px",
                "&:hover .delete-button": {
                  opacity: 1,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
              >
                <Folder sx={{ fontSize: 60, color: folder.iconColor }} />
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                  }}
                >
                  {folder.name}
                </Typography>
              </Box>

              <IconButton
                className="delete-button"
                sx={{
                  position: "absolute",
                  top: "4px",
                  right: "3px",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                onClick={() => handleDeleteFolder(folder.id)}
              >
                <Delete sx={{ color: "red" }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
      {open && <CreateFolderModal open={open} setOpen={handleClose} />}
    </>
  );
};

export default Page;