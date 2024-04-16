// // app/routes/images/$.tsx
// import {  useLoaderData } from "@remix-run/react";
// import { json, LoaderFunction } from "@remix-run/node";

// // Interface for the meme data
// interface MemeData {
//   id: string;
//   name: string;
//   blank: string;
// }

// // Loader function to fetch meme data
// export const loader: LoaderFunction = async ({ params }) => {
//   // Extract the templateId from the URL
//   const { "*": templateId } = params;

//   // Fetch the meme data from the API
//   const response = await fetch(`https://api.memegen.link/templates/${templateId}`);
//   if (!response.ok) {
//     throw new Response("Not Found", { status: 404 });
//   }
//   const memeData: MemeData = await response.json();
//   return json(memeData);
// };

// export default function MemeTemplate() {
//   const memeData = useLoaderData<MemeData>();
//   return (
//     <div>
//       <h1>{memeData.name}</h1>
//       <img src={memeData.blank} alt={`Meme template for ${memeData.name}`} />
//       {/* You can add more here, like a form to input text */}
//     </div>
//   );
// }
