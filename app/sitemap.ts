export default function sitemap() {
  const baseUrl = "https://investidoratento.com", ;

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}