import { Directus } from "@directus/sdk";

export const directus = new Directus(process.env.NEXT_PUBLIC_API_URL, {
  auth: {
    mode: "json",
  },
});

export const handleError = (errorObj) => {
  //   console.log(errorObj);
  let { errors } = errorObj;

  if (errors.length > 0) {
    let message = errors[0].message;

    return message;
  } else {
    return "error connecting to server, try again";
  }
};
