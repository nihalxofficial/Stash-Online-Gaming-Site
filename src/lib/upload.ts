// lib/upload.ts
export const uploadToImgBB = async (file: File): Promise<string> => {
  // Prefixing with NEXT_PUBLIC_ allows the browser sandbox to read this variable
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
  if (!IMGBB_API_KEY) {
    throw new Error("ImgBB upload protocol failure: API key is undefined. Check your environment variables.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    // Parsing the error body helps track down exact validation issues (e.g., file too large)
    const errData = await response.json().catch(() => ({}));
    throw new Error(`ImgBB upload protocol failure: ${errData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.data.url;
};