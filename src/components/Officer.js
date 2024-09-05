import { directus } from "@/lib";
import { assetUrl } from "@/lib/asset";
import { Loader } from "lucide-react";
import React from "react";
import { focusManager, useMutation } from "react-query";
import { toast } from "sonner";
function slugify(text) {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove special characters except hyphens and spaces
    .trim() // Remove whitespace from both ends
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove multiple hyphens
}

const Officer = ({ person }) => {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const fileRes = await directus.files.createOne(payload);
      const res = await directus.items("officers").updateOne(person.id, { image: fileRes.id });
      console.log(res);
      return res;
    },
    onError: (err) => {
      alert(err.message);
    },
    onSuccess: (data) => {
      //   alert(`it worked`);
      toast.success(`Officer Image uploaded`, { position: "top-center" });
      focusManager.setFocused(true);
    },
  });
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      //   console.log(slugify(person.name));
      const title = `${slugify(person.name)}.${file.type.split("/")[1]}`;
      //   console.log(file.type.split("/")[1]);
      //   console.log(title);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      mutation.mutate(formData);

      //   directus.files
      //     .createOne(formData)
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     });
    }
  };
  return (
    <li key={person.name}>
      <div className="space-y-6">
        <img
          className="mx-auto h-40 w-40 object-cover rounded-xl xl:w-56 xl:h-56"
          src={assetUrl(person.image)}
          alt=""
        />
        <div className="space-y-2">
          <div className="text-lg leading-6 font-medium space-y-1">
            <h3>{person.name}</h3>
            <p className="text-indigo-600">{person.role}</p>
          </div>
        </div>
        <div className="mx-auto">
          {mutation.isLoading ? (
            <Loader className="text-dark animate-spin" />
          ) : (
            <label className="bg-black text-white px-4 py-2 rounded-lg text-xs" htmlFor={person.id}>
              Upload Image
            </label>
          )}
          <br />
          <input type="file" onChange={handleUpload} accept="image/jpeg, image/png" id={person.id} className="hidden" />
        </div>
      </div>
    </li>
  );
};

export default Officer;
