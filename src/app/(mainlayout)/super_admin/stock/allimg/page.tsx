/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
 
} from "@mui/material";
import Image, { StaticImageData } from "next/image"; 
import { Add, Delete } from "@mui/icons-material"; 

// Import your images
import img1 from "../../../../../assets/img/products/products1.png";
import img2 from "../../../../../assets/img/about/bg-03.jpg";
import img3 from "../../../../../assets/img/about/blog-01.jpg";
import img4 from "../../../../../assets/img/about/blog-02.jpg";
import img5 from "../../../../../assets/img/products/products2.png";

import { Search } from "@mui/icons-material";
import CraftForm from "@/components/Forms/Form";

const ImageGalleryPage = () => {
  const [images, setImages] = useState<StaticImageData[]>([
    img1,
    img2,
    img3,
    img4,
    img5,
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle adding new images (mock function)
  const handleAddImage = () => {
    const newImage = `https://picsum.photos/200/200?random=${images.length + 1}`;

    setImages((prev) => [
      ...prev,
      {
        src: newImage,
        height: 200,
        width: 200,
      } as StaticImageData,
    ]);
  };

  // Handle deleting an image
  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter images based on search query
  const filteredImages = images.filter((img) =>
    img.src.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Top Bar */}

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
        <h1 className=" text-3xl"> Image Gallery</h1>
        <CraftForm onSubmit={handleSubmit}>
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
        </CraftForm>

        <Button sx={{ color: "" }} variant="contained">
          <Add className="h-5 w-5 mr-2" /> Add Image
        </Button>
      </Card>
      

      {/* Image Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)", // 8 images per row
          gap: "10px",
        }}
      >
        {filteredImages.map((img, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: "100%",
              height: "150px", // Fixed height
              overflow: "hidden",
              borderRadius: "8px",
              "&:hover .delete-button": {
                opacity: 1, // Show delete button on hover
              },
            }}
          >
            {/* Image */}
            <Image
              src={img}
              alt={`Image ${index + 1}`}
              width={150} // Fixed width
              height={150} // Fixed height
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensure image covers the box
              }}
            />

            {/* Delete Button (Visible on Hover) */}
            <IconButton
              className="delete-button"
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                opacity: 0, // Hidden by default
                transition: "opacity 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
              onClick={() => handleDeleteImage(index)}
            >
              <Delete sx={{ color: "red" }} /> {/* Red delete icon */}
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageGalleryPage;
