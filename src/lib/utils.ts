export async function generateBio(prompt: string) {
  const response = await fetch("/api/v1/generate", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const choises = await response.json();
  return choises;
}
