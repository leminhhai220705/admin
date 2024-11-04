// upload image to Cloudinary

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "test-upload"); // Sử dụng upload preset đã tạo
    const url = `http://api.cloudinary.com/v1_1/dxuaa3vsy/image/upload`;

    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("something went wrong");
    }

    const data = await response.json();
    return data.secure_url;
};