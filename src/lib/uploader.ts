import fs from "fs/promises";
import path from "path";

// Allowed file types & size limit
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function saveFiles(files: File | File[], folder: string = "uploads") {
    // Ensure files is always an array
    const filesArray = Array.isArray(files) ? files : [files];

    const uploadDir = path.join(process.cwd(), "public", folder);
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles: string[] = [];

    for (const file of filesArray) {
        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error(`Invalid file type: ${file.type}`);
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File too large: ${file.name}`);
        }

        // Convert file to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        // Save file
        await fs.writeFile(filePath, buffer);

        // Store relative path for frontend access
        uploadedFiles.push(`/${folder}/${fileName}`);
    }

    return uploadedFiles;
}
