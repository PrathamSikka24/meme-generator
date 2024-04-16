// app/routes/templates/$templateId.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Template {
  id: string;
  name: string;
  blank: string;
  // Add other properties if needed
}

export const loader: LoaderFunction = async ({ params }) => {
  console.log('Loading details for template ID:', params.templateId); // Add this line to debug
  const response = await fetch(`https://api.memegen.link/templates/${params.templateId}`);

  if (!response.ok) {
    throw new Response("Failed to fetch meme details", { status: response.status });
  }

  const templateDetails = await response.json();
  console.log('Template details:', templateDetails); // Add this line to debug
  return json(templateDetails);

  
};


export default function TemplateDetail() {
  const template: Template = useLoaderData();
  const memeDetails = useLoaderData();
  console.log('Meme details received in component:', memeDetails);
  return (
    <div>
      <h1>{template.name}</h1>
      {/* ... additional template details ... */}
      <img src={template.blank} alt={template.name} />
    </div>
  );
}
