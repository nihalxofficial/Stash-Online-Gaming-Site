"use client";

import React, { useState, useRef } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  Button,
  Select,
  ListBox,
  DatePicker,
  DateField,
  Calendar,
} from "@heroui/react";
import {
  FiPlus,
  FiLayers,
  FiImage,
  FiInfo,
  FiDollarSign,
  FiFolder,
  FiFileText,
  FiLoader,
  FiUploadCloud,
  FiCheckCircle,
  FiCalendar,
} from "react-icons/fi";
import { DateValue } from "@internationalized/date";
import { uploadToImgBB } from "@/lib/upload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addGame } from "@/lib/action/games";

interface AddGameFormProps {
  userId: string;
}

export default function AddGameForm({ userId }: AddGameFormProps) {
  const [isUploading, setIsUploading] = useState(false);

  // File state managers
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [gameBinaryFile, setGameBinaryFile] = useState<File | null>(null);

  // HeroUI v3 Date Picker State
  const [releaseDate, setReleaseDate] = useState<DateValue | null>(null);

  // Native input refs
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const binaryRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryFiles(Array.from(e.target.files));
    }
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGameBinaryFile(e.target.files[0]);
    }
  };

  const handleAddGameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!thumbnailFile) {
      toast.error("Please upload a primary thumbnail image.");
      return;
    }
    if (!gameBinaryFile) {
      toast.error("Please upload the core game distribution binary file.");
      return;
    }
    if (!releaseDate) {
      toast.error("Please select a valid release date.");
      return;
    }

    setIsUploading(true);

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);

      // 1. Upload assets via ImgBB
      const thumbnailUrl = await uploadToImgBB(thumbnailFile);

      const galleryUrls: string[] = [];
      for (let i = 0; i < galleryFiles.length; i++) {
        const uploadedUrl = await uploadToImgBB(galleryFiles[i]);
        galleryUrls.push(uploadedUrl);
      }

      // 2. Format inputs cleanly into Mongoose-schema matching properties
      const titleValue = formData.get("title") as string;
      const genresArray = (formData.get("genre") as string)
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      const platformsArray = (formData.get("platform") as string)
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      const calculatedSize =
        (gameBinaryFile.size / (1024 * 1024 * 1024)).toFixed(2) + " GB";

      const formPayloadObject = {
        title: titleValue,
        slug: titleValue
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
        thumbnail: thumbnailUrl,
        images: galleryUrls,
        description: formData.get("description") as string,
        genre: genresArray,
        rating: Number(formData.get("rating") || 0),
        releaseDate: releaseDate.toString(),
        platform: platformsArray,
        status: (formData.get("status") as string) || "Live",
        price: Number(formData.get("price") || 0),
        size: calculatedSize,
      };

      // 3. Construct clean FormData payload matching the Express controller
      const backendPayload = new FormData();
      backendPayload.append("file", gameBinaryFile);
      backendPayload.append("title", formPayloadObject.title);
      backendPayload.append("slug", formPayloadObject.slug);
      backendPayload.append("description", formPayloadObject.description);
      backendPayload.append("releaseDate", formPayloadObject.releaseDate);
      backendPayload.append("status", formPayloadObject.status);
      backendPayload.append("size", formPayloadObject.size);
      backendPayload.append("thumbnail", formPayloadObject.thumbnail);
      backendPayload.append("owner", userId);

      backendPayload.append("rating", String(formPayloadObject.rating));
      backendPayload.append("price", String(formPayloadObject.price));

      formPayloadObject.genre.forEach((g) => backendPayload.append("genre", g));
      formPayloadObject.platform.forEach((p) =>
        backendPayload.append("platform", p),
      );
      formPayloadObject.images.forEach((img) =>
        backendPayload.append("images", img),
      );

      const result: any = await addGame(backendPayload);
      if (result.success === "false") {
        toast.error("Game deployment failed!");
      }
      if (result.title) {
        toast.success("Game deployment successful!");
      }

      // Reset State Controls
      formElement.reset();
      setThumbnailFile(null);
      setGalleryFiles([]);
      setGameBinaryFile(null);
      setReleaseDate(null);
    } catch (error: any) {
      console.error("Asset pipeline failure:", error);

      // 5. Fire clean, transient error toast
      toast.error(`Ingestion Pipeline Failure: ${error.message || error}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Toast Notification Mount Target */}

      <Form
        onSubmit={handleAddGameSubmit}
        className="space-y-6 w-full text-gray-200"
      >
        {/* ROW 1: GAME TITLES & THUMBNAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <TextField name="title" isRequired fullWidth>
            <Label className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1">
              <FiLayers className="text-blue-400" /> Game Title
            </Label>
            <Input
              placeholder="e.g. Valorant"
              aria-label="Game Title Input"
              className="rounded bg-[#0d0f1a] border border-white/5 text-xs h-10 px-3"
            />
          </TextField>

          <div className="flex flex-col gap-1.5">
            <span
              id="thumbnail-label"
              className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1"
            >
              <FiImage className="text-purple-400" /> Thumbnail Asset
            </span>
            <div
              onClick={() => thumbnailRef.current?.click()}
              role="button"
              aria-labelledby="thumbnail-label"
              className="w-full h-10 border border-dashed border-white/10 hover:border-purple-500/40 bg-[#0d0f1a] rounded flex items-center justify-between px-3 cursor-pointer transition-all"
            >
              <span className="text-xs text-gray-400 truncate max-w-[80%]">
                {thumbnailFile ? thumbnailFile.name : "Select Game Image..."}
              </span>
              {thumbnailFile ? (
                <FiCheckCircle className="text-green-500" />
              ) : (
                <FiUploadCloud className="text-gray-500" />
              )}
            </div>
            <input
              ref={thumbnailRef}
              type="file"
              accept="image/*"
              aria-label="Upload Thumbnail Image"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </div>
        </div>

        {/* ROW 2: GENRE & PLATFORMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <TextField name="genre" isRequired fullWidth>
            <Label className="text-xs font-bold text-gray-400 tracking-wider uppercase">
              Genre Matrix
            </Label>
            <Input
              placeholder="FPS, Tactical, Action"
              aria-label="Game Genres"
              className="rounded bg-[#0d0f1a] border border-white/5 text-xs h-10 px-3"
            />
            <Description className="text-[10px] text-gray-600">
              Separate items with commas
            </Description>
          </TextField>

          <TextField name="platform" isRequired fullWidth>
            <Label className="text-xs font-bold text-gray-400 tracking-wider uppercase">
              Supported Platforms
            </Label>
            <Input
              placeholder="PC, PS5, Xbox"
              aria-label="Supported Platforms"
              className="rounded bg-[#0d0f1a] border border-white/5 text-xs h-10 px-3"
            />
            <Description className="text-[10px] text-gray-600">
              Separate items with commas
            </Description>
          </TextField>
        </div>

        {/* ROW 3: METRICS, DATE PICKER & STATUS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          <TextField name="rating" isRequired>
            <Label className="text-xs font-bold text-gray-400 tracking-wider uppercase">
              Rating
            </Label>
            <Input
              type="number"
              step="0.1"
              max="5"
              min="0"
              placeholder="4.5"
              aria-label="Game Rating"
              className="rounded bg-[#0d0f1a] border border-white/5 text-xs h-10 px-3"
            />
          </TextField>

          {/* DatePicker Component */}
          <DatePicker
            value={releaseDate}
            onChange={setReleaseDate}
            className="flex flex-col gap-1.5"
            aria-label="Game Release Date Picker"
          >
            <Label
              id="release-date-label"
              className="text-xs font-bold text-gray-400 tracking-wider uppercase"
            >
              Release Date
            </Label>
            <DateField.Group
              aria-labelledby="release-date-label"
              className="h-10 bg-[#0d0f1a] border border-white/5 rounded px-3 flex items-center justify-between"
            >
              <DateField.Input
                className="text-xs text-gray-200"
                aria-label="Release Date Input Segments"
              >
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
              <DateField.Suffix>
                <DatePicker.Trigger
                  className="text-gray-400 hover:text-gray-200"
                  aria-label="Open Calendar Dialog"
                >
                  <DatePicker.TriggerIndicator>
                    <FiCalendar className="w-4 h-4" />
                  </DatePicker.TriggerIndicator>
                </DatePicker.Trigger>
              </DateField.Suffix>
            </DateField.Group>

            <DatePicker.Popover className="bg-[#0c0d16] border border-white/10 rounded-lg p-2 shadow-2xl">
              <Calendar aria-label="Game Release Date Selection Calendar">
                <Calendar.Header className="flex justify-between items-center pb-2 border-b border-white/5 mb-2">
                  <Calendar.Heading className="text-xs font-black text-gray-300 uppercase tracking-widest" />
                  <div className="flex gap-1">
                    <Calendar.NavButton
                      slot="previous"
                      aria-label="Previous Month"
                      className="p-1 text-xs text-gray-400 hover:text-white"
                    />
                    <Calendar.NavButton
                      slot="next"
                      aria-label="Next Month"
                      className="p-1 text-xs text-gray-400 hover:text-white"
                    />
                  </div>
                </Calendar.Header>
                <Calendar.Grid className="w-full text-xs text-gray-300">
                  <Calendar.GridHeader>
                    {(day) => (
                      <Calendar.HeaderCell className="text-gray-500 font-bold p-1">
                        {day}
                      </Calendar.HeaderCell>
                    )}
                  </Calendar.GridHeader>
                  <Calendar.GridBody>
                    {(date) => (
                      <Calendar.Cell
                        date={date}
                        className="p-1 hover:bg-blue-600/20 rounded cursor-pointer text-center focus:bg-blue-600 focus:text-white"
                      />
                    )}
                  </Calendar.GridBody>
                </Calendar.Grid>
              </Calendar>
            </DatePicker.Popover>
          </DatePicker>

          {/* Select Status Dropdown */}
          <div className="flex flex-col gap-1.5">
            <Label
              id="status-label"
              className="text-xs font-bold text-gray-400 tracking-wider uppercase"
            >
              Status
            </Label>
            <Select
              name="status"
              placeholder="Select"
              aria-labelledby="status-label"
              className="w-full"
            >
              <Select.Trigger
                aria-label="Select Game Status"
                className="h-10 bg-[#0d0f1a] border border-white/5 text-xs text-gray-300 rounded px-3 flex justify-between items-center"
              >
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-[#0d0f1a] border border-white/5 rounded mt-1">
                <ListBox className="p-1" aria-label="Status Choices">
                  <ListBox.Item
                    id="Live"
                    textValue="Live"
                    className="text-xs text-gray-300 hover:bg-white/5 p-2 rounded cursor-pointer"
                  >
                    <Label>Live</Label>
                  </ListBox.Item>
                  <ListBox.Item
                    id="Beta"
                    textValue="Beta Stage"
                    className="text-xs text-gray-300 hover:bg-white/5 p-2 rounded cursor-pointer"
                  >
                    <Label>Beta Stage</Label>
                  </ListBox.Item>
                  <ListBox.Item
                    id="Maintenance"
                    textValue="Maintenance"
                    className="text-xs text-gray-300 hover:bg-white/5 p-2 rounded cursor-pointer"
                  >
                    <Label>Maintenance</Label>
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <TextField name="price" isRequired>
            <Label className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1">
              <FiDollarSign className="text-green-400" /> Price
            </Label>
            <Input
              type="number"
              placeholder="0 (Free)"
              aria-label="Game Price"
              className="rounded bg-[#0d0f1a] border border-white/5 text-xs h-10 px-3"
            />
          </TextField>
        </div>

        {/* ROW 4: CORE GAME BINARY FILE DELIVERY NODE */}
        <div className="w-full bg-[#0d0f1a]/40 p-4 border border-white/5 rounded space-y-3">
          <span
            id="binary-label"
            className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1"
          >
            <FiFolder className="text-cyan-400" /> Game File
          </span>
          <div
            onClick={() => binaryRef.current?.click()}
            role="button"
            aria-labelledby="binary-label"
            className="w-full h-16 border border-dashed border-cyan-500/20 hover:border-cyan-500/50 bg-[#05060c] rounded flex flex-col items-center justify-center cursor-pointer transition-all gap-1"
          >
            {gameBinaryFile ? (
              <>
                <span className="text-xs text-cyan-400 font-bold truncate max-w-[90%] flex items-center gap-1.5">
                  <FiFileText /> {gameBinaryFile.name}
                </span>
                <span className="text-[10px] text-gray-500">
                  {(gameBinaryFile.size / (1024 * 1024)).toFixed(2)} MB • Ready
                  for validation
                </span>
              </>
            ) : (
              <>
                <span className="text-xs text-gray-400 flex items-center gap-1.5 font-bold">
                  <FiUploadCloud className="text-cyan-400 animate-pulse" />{" "}
                  Upload Distribution Installer
                </span>
                <span className="text-[10px] text-gray-600">
                  Supports .exe, .zip, .rar, .dmg archives
                </span>
              </>
            )}
          </div>
          <input
            ref={binaryRef}
            type="file"
            accept=".exe,.zip,.rar,.tar,.dmg"
            aria-label="Upload Game Binary File"
            onChange={handleBinaryChange}
            className="hidden"
          />
        </div>

        {/* ROW 5: MULTIPLE GALLERY IMAGES CONTAINER */}
        <div className="p-4 border border-white/5 bg-[#0d0f1a]/20 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <Label
              id="gallery-label"
              className="text-[10px] font-black text-gray-400 tracking-wider uppercase flex items-center gap-1.5"
            >
              <FiImage className="text-blue-400" /> Gallery Images
            </Label>
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              aria-label="Select Gallery Images"
              className="text-[9px] bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer transition-all uppercase"
            >
              <FiPlus /> Select Images
            </button>
          </div>

          {galleryFiles.length > 0 ? (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {galleryFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs bg-[#05060c] p-2 rounded border border-white/5"
                >
                  <span className="text-gray-400 truncate max-w-[80%] flex items-center gap-2">
                    <span className="text-[10px] text-blue-500 font-bold">
                      #{idx + 1}
                    </span>{" "}
                    {file.name}
                  </span>
                  <span className="text-[10px] text-gray-600">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed border-white/5 rounded text-xs text-gray-600">
              No gallery files selected yet. Click "Select Images" to load
              multiple assets.
            </div>
          )}

          <input
            ref={galleryRef}
            type="file"
            multiple
            accept="image/*"
            aria-label="Upload multiple gallery files"
            onChange={handleGalleryChange}
            className="hidden"
          />
        </div>

        {/* DESCRIPTION TEXTAREA */}
        <TextField name="description" isRequired fullWidth>
          <Label className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1">
            <FiInfo className="text-purple-400" /> Game Description
          </Label>
          <TextArea
            rows={4}
            name="description"
            aria-label="Enter game description"
            placeholder="Provide explicit game overview notes here..."
            className="rounded bg-[#0d0f1a] border border-white/5 text-xs p-3"
          />
        </TextField>

        {/* SUBMIT BUTTON WITH LOADING STATE */}
        {/* SUBMIT BUTTON WITH LOADING STATE */}
        <Button
          type="submit"
          isDisabled={isUploading} // 👈 Changed from disabled to isDisabled
          aria-label={
            isUploading
              ? "Transferring Binary Assets"
              : "Deploy Game Node Protocol"
          }
          className="w-full h-11 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 font-black text-xs text-white uppercase tracking-widest shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          {isUploading ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin" aria-hidden="true" />{" "}
              Stream Deploying Assets...
            </>
          ) : (
            <>
              <FiPlus className="w-4 h-4" aria-hidden="true" /> Deploy Game Node
              Protocol
            </>
          )}
        </Button>
      </Form>
    </>
  );
}
