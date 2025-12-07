export default function ServiceContent({ service }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Artwork & Description */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={service.artwork}
          className="w-40 h-40 md:w-56 md:h-56 rounded-lg object-cover bg-neutral-900"
          alt={service.name}
        />

        <p className="text-neutral-400 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Embeds */}
      {service.embeds?.map((embed, i) => (
        <div key={i} className="w-full">
          {embed.type === "youtube" && (
            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${embed.id}`}
            />
          )}

          {embed.type === "soundcloud" && (
            <iframe
              className="w-full h-28 rounded-lg"
              scrolling="no"
              frameBorder="no"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                embed.url
              )}`}
            />
          )}
        </div>
      ))}

      {/* Links */}
      <div className="flex flex-col gap-2">
        {service.links?.map((l) => (
          <a
            key={l}
            href={l}
            target="_blank"
            className="underline text-neutral-400 hover:text-white"
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}
